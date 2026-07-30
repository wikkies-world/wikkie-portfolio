#!/usr/bin/env node
/**
 * Upload all local portfolio videos to Cloudinary using signed REST API.
 * (Bypasses a v2 SDK bug where chunked uploads ignore signed mode.)
 *
 * Prerequisites: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env
 * Run:  bun run upload-videos
 */
import crypto from 'crypto'
import fs from 'fs'
import { videoSources } from '../src/lib/video-sources'
import { resolve, join } from 'path'

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!
const API_KEY = process.env.CLOUDINARY_API_KEY!
const API_SECRET = process.env.CLOUDINARY_API_SECRET!

const PUBLIC_DIR = resolve(process.cwd(), 'public')
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`

/** Check if a video already exists on Cloudinary (idempotent skip). */
async function exists(publicId: string): Promise<boolean> {
  // Cloudinary doesn't have a simple GET-by-public-id without the resource API,
  // so we try a HEAD on the delivery URL.
  const url = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${publicId}.mp4`
  try {
    const res = await fetch(url, { method: 'HEAD' })
    return res.ok
  } catch {
    return false
  }
}

/** Upload a single video via signed REST API. */
async function uploadVideo(localPath: string, publicId: string): Promise<number> {
  const timestamp = Math.floor(Date.now() / 1000)
  // Only body params are signed (not resource_type which is in the URL)
  const paramsToSign: Record<string, string> = {
    public_id: publicId,
    timestamp: String(timestamp),
    overwrite: 'false',
  }
  const paramString =
    Object.keys(paramsToSign)
      .sort()
      .map((k) => `${k}=${paramsToSign[k]}`)
      .join('&') + API_SECRET
  const signature = crypto.createHash('sha1').update(paramString).digest('hex')

  const fileBuffer = fs.readFileSync(localPath)
  const formData = new FormData()
  formData.append('file', new Blob([fileBuffer]), 'video.mp4')
  formData.append('public_id', publicId)
  formData.append('timestamp', String(timestamp))
  formData.append('api_key', API_KEY)
  formData.append('signature', signature)
  formData.append('overwrite', 'false')

  const res = await fetch(UPLOAD_URL, { method: 'POST', body: formData })
  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error?.message || `HTTP ${res.status}`)
  }
  return data.bytes
}

async function main() {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    console.error('\n❌ Cloudinary credentials not found in .env')
    process.exit(1)
  }

  console.log(`\n🎥 Uploading ${videoSources.length} videos to Cloudinary (cloud: ${CLOUD_NAME})\n`)

  const manifest: Record<string, { publicId: string; cloudName: string }> = {}
  let uploaded = 0
  let skipped = 0
  let failed = 0

  for (const video of videoSources) {
    const localPath = join(PUBLIC_DIR, video.localSrc)
    const pid = video.cloudinaryPublicId

    if (!fs.existsSync(localPath)) {
      console.log(`  ⚠ local file missing, skipping: ${video.localSrc}`)
      manifest[video.id] = { publicId: pid, cloudName: CLOUD_NAME }
      continue
    }

    // Skip if already uploaded
    if (await exists(pid)) {
      console.log(`  ✓ exists, skipping: ${pid}`)
      manifest[video.id] = { publicId: pid, cloudName: CLOUD_NAME }
      skipped++
      continue
    }

    const sizeMB = (fs.statSync(localPath).size / 1e6).toFixed(1)
    process.stdout.write(`  ↑ ${pid} (${sizeMB}MB)... `)
    const start = Date.now()

    try {
      const bytes = await uploadVideo(localPath, pid)
      const elapsed = ((Date.now() - start) / 1000).toFixed(1)
      console.log(`✓ ${elapsed}s (${(bytes / 1e6).toFixed(1)}MB)`)
      manifest[video.id] = { publicId: pid, cloudName: CLOUD_NAME }
      uploaded++
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      console.log(`✗ ${msg}`)
      // Still record so the app uses the Cloudinary URL
      manifest[video.id] = { publicId: pid, cloudName: CLOUD_NAME }
      failed++
    }
  }

  const manifestPath = join(PUBLIC_DIR, 'works', 'cloudinary-manifest.json')
  fs.writeFileSync(
    manifestPath,
    JSON.stringify(
      { cloudName: CLOUD_NAME, generatedAt: new Date().toISOString(), videos: manifest },
      null,
      2,
    ),
  )

  console.log(`\n✅ Done! Uploaded: ${uploaded}, Skipped: ${skipped}, Failed: ${failed}`)
  console.log(`   Manifest: ${manifestPath}`)
  if (failed > 0) console.log(`   Re-run to retry failed uploads (idempotent).`)
  console.log(`\n💡 To slim deployment: rm -rf public/works (or remove .mp4 files)\n`)
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})

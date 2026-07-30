/**
 * Video sources configuration.
 *
 * By default, videos are served from Cloudinary's CDN (external hosting) so
 * the project stays lightweight and deployable. Cloudinary applies:
 *   - f_auto: serves WebM to Chrome/Firefox, MP4 to Safari (smaller, faster)
 *   - q_auto: adaptive quality optimization (high clarity, minimal size)
 *   - Global CDN: fast worldwide delivery
 *
 * If Cloudinary is not yet configured (CLOUDINARY_CLOUD_NAME missing), the
 * app falls back to local files in /public/works/.
 *
 * --- SETUP (one-time) ---
 * 1. Create a free Cloudinary account: https://cloudinary.com
 * 2. Copy your cloud name + API key + API secret into .env:
 *      CLOUDINARY_CLOUD_NAME=your-cloud-name
 *      CLOUDINARY_API_KEY=your-api-key
 *      CLOUDINARY_API_SECRET=your-api-secret
 * 3. Run:  bun run upload-videos
 *    This uploads all 15 videos to Cloudinary and writes
 *    public/works/cloudinary-manifest.json.
 * 4. (Optional) Delete local videos to slim the deployment:
 *    rm -rf public/works  (or delete the .mp4 files within)
 */

export type VideoSource = {
  id: string
  category: string
  categorySlug: string
  /** Local path (fallback) */
  localSrc: string
  localPoster: string
  /** Cloudinary public ID (used to build CDN URLs once configured) */
  cloudinaryPublicId: string
  duration: number
  width: number
  height: number
  orientation: 'portrait' | 'landscape'
}

export const videoSources: VideoSource[] = [
  { id: '50k-family', category: 'Motion Graphics', categorySlug: 'motion-graphics', localSrc: '/works/motion-graphics/50k-family.mp4', localPoster: '/works/motion-graphics/50k-family-poster.jpg', cloudinaryPublicId: 'wikkie-works/motion-graphics/50k-family', duration: 25.4, width: 1080, height: 1920, orientation: 'portrait' },
  { id: 'nirmal-city-royality-35k', category: 'Motion Graphics', categorySlug: 'motion-graphics', localSrc: '/works/motion-graphics/nirmal-city-royality-35k.mp4', localPoster: '/works/motion-graphics/nirmal-city-royality-35k-poster.jpg', cloudinaryPublicId: 'wikkie-works/motion-graphics/nirmal-city-royality-35k', duration: 30.6, width: 1080, height: 1920, orientation: 'portrait' },
  { id: 'nirmal-firestorm', category: 'Motion Graphics', categorySlug: 'motion-graphics', localSrc: '/works/motion-graphics/nirmal-firestorm.mp4', localPoster: '/works/motion-graphics/nirmal-firestorm-poster.jpg', cloudinaryPublicId: 'wikkie-works/motion-graphics/nirmal-firestorm', duration: 33.9, width: 1920, height: 1080, orientation: 'landscape' },
  { id: 'vdc-powerhouse', category: 'Motion Graphics', categorySlug: 'motion-graphics', localSrc: '/works/motion-graphics/vdc-powerhouse.mp4', localPoster: '/works/motion-graphics/vdc-powerhouse-poster.jpg', cloudinaryPublicId: 'wikkie-works/motion-graphics/vdc-powerhouse', duration: 110.6, width: 1920, height: 818, orientation: 'landscape' },
  { id: 'vdc-friends-trip', category: 'Other', categorySlug: 'other', localSrc: '/works/other/vdc-friends-trip.mp4', localPoster: '/works/other/vdc-friends-trip-poster.jpg', cloudinaryPublicId: 'wikkie-works/other/vdc-friends-trip', duration: 52.8, width: 1080, height: 1920, orientation: 'portrait' },
  { id: 'narayana-high-school', category: 'Promotional Edit', categorySlug: 'promotional-edit', localSrc: '/works/promotional-edit/narayana-high-school.mp4', localPoster: '/works/promotional-edit/narayana-high-school-poster.jpg', cloudinaryPublicId: 'wikkie-works/promotional-edit/narayana-high-school', duration: 95.0, width: 1920, height: 976, orientation: 'landscape' },
  { id: 'nirmal-wonderland', category: 'Promotional Edit', categorySlug: 'promotional-edit', localSrc: '/works/promotional-edit/nirmal-wonderland.mp4', localPoster: '/works/promotional-edit/nirmal-wonderland-poster.jpg', cloudinaryPublicId: 'wikkie-works/promotional-edit/nirmal-wonderland', duration: 25.0, width: 1080, height: 1920, orientation: 'portrait' },
  { id: 'sreekalpa-real-estate', category: 'Real Estate Drone Edits', categorySlug: 'real-estate-drone-edits', localSrc: '/works/real-estate-drone-edits/sreekalpa-real-estate.mp4', localPoster: '/works/real-estate-drone-edits/sreekalpa-real-estate-poster.jpg', cloudinaryPublicId: 'wikkie-works/real-estate-drone-edits/sreekalpa-real-estate', duration: 91.8, width: 720, height: 406, orientation: 'landscape' },
  { id: 'sri-brindavan-colony', category: 'Real Estate Drone Edits', categorySlug: 'real-estate-drone-edits', localSrc: '/works/real-estate-drone-edits/sri-brindavan-colony.mp4', localPoster: '/works/real-estate-drone-edits/sri-brindavan-colony-poster.jpg', cloudinaryPublicId: 'wikkie-works/real-estate-drone-edits/sri-brindavan-colony', duration: 25.6, width: 1920, height: 1080, orientation: 'landscape' },
  { id: 'devender-reddy-hospital', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/devender-reddy-hospital.mp4', localPoster: '/works/talking-head/devender-reddy-hospital-poster.jpg', cloudinaryPublicId: 'wikkie-works/talking-head/devender-reddy-hospital', duration: 77.7, width: 608, height: 1080, orientation: 'portrait' },
  { id: 'fanston-ep2', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/fanston-ep2.mp4', localPoster: '/works/talking-head/fanston-ep2-poster.jpg', cloudinaryPublicId: 'wikkie-works/talking-head/fanston-ep2', duration: 52.7, width: 1080, height: 1920, orientation: 'portrait' },
  { id: 'helmet-awareness', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/helmet-awareness.mp4', localPoster: '/works/talking-head/helmet-awareness-poster.jpg', cloudinaryPublicId: 'wikkie-works/talking-head/helmet-awareness', duration: 46.3, width: 2160, height: 3840, orientation: 'portrait' },
  { id: 'sukhadha', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/sukhadha.mp4', localPoster: '/works/talking-head/sukhadha-poster.jpg', cloudinaryPublicId: 'wikkie-works/talking-head/sukhadha', duration: 42.8, width: 608, height: 1080, orientation: 'portrait' },
  { id: 'vinay-dental-ai-checkup', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/vinay-dental-ai-checkup.mp4', localPoster: '/works/talking-head/vinay-dental-ai-checkup-poster.jpg', cloudinaryPublicId: 'wikkie-works/talking-head/vinay-dental-ai-checkup', duration: 44.6, width: 1080, height: 1920, orientation: 'portrait' },
  { id: 'vinay-dental-dr-vinay', category: 'Talking Head', categorySlug: 'talking-head', localSrc: '/works/talking-head/vinay-dental-dr-vinay.mp4', localPoster: '/works/talking-head/vinay-dental-dr-vinay-poster.jpg', cloudinaryPublicId: 'wikkie-works/talking-head/vinay-dental-dr-vinay', duration: 62.6, width: 608, height: 1080, orientation: 'portrait' },
]

/** Cloudinary cloud name from env (server-side or build-time). */
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || ''

/**
 * Build a Cloudinary CDN video URL with adaptive format + quality.
 * Format: https://res.cloudinary.com/<cloud>/video/upload/f_auto,q_auto/<public_id>.mp4
 * - f_auto: serves WebM to Chrome/Firefox (smaller), MP4 to Safari
 * - q_auto: optimal quality/size balance (high clarity)
 */
export function cloudinaryVideoUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/f_auto,q_auto/${publicId}.mp4`
}

/**
 * Build a Cloudinary CDN poster image URL.
 * - f_auto,q_auto: optimized format + quality
 * - so_1: seek to 1 second for the frame
 */
export function cloudinaryPosterUrl(publicId: string): string {
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/so_1,f_jpg,q_auto,w_540/${publicId}.jpg`
}

/** Whether Cloudinary is configured (cloud name present). */
export const isCloudinaryConfigured = CLOUDINARY_CLOUD_NAME.length > 0

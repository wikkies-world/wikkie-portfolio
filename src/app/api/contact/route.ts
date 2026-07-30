import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'

const ContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(80, { message: 'Name is too long' }),
  email: z
    .string()
    .trim()
    .min(3, { message: 'Email is required' })
    .max(120, { message: 'Email is too long' })
    .email({ message: 'Please enter a valid email address' }),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(2000, { message: 'Message is too long' }),
})

export async function POST(request: Request) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body' },
      { status: 400 },
    )
  }

  const parsed = ContactSchema.safeParse(json)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Invalid input'
    return NextResponse.json(
      { ok: false, error: firstError },
      { status: 422 },
    )
  }

  try {
    const saved = await db.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        message: parsed.data.message,
      },
    })
    return NextResponse.json(
      { ok: true, id: saved.id, message: 'Message received' },
      { status: 201 },
    )
  } catch (err) {
    console.error('[api/contact] failed to persist message:', err)
    return NextResponse.json(
      { ok: false, error: 'Failed to send message. Please try again later.' },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    const items = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: { id: true, name: true, email: true, createdAt: true },
    })
    return NextResponse.json({ ok: true, items })
  } catch (err) {
    console.error('[api/contact] GET failed:', err)
    return NextResponse.json(
      { ok: false, error: 'Failed to load messages' },
      { status: 500 },
    )
  }
}

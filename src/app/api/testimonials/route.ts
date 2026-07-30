import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

const seedTestimonials = [
  {
    name: 'Dr. Vinay Raj',
    role: 'Vinay Dental',
    content:
      'Wikkie edited our patient testimonial, awareness, and informational videos with great attention to detail. His edits were clean, engaging, and professional, helping us communicate better with our audience. Reliable, creative, and easy to work with.',
    rating: 5,
  },
  {
    name: 'House of Chaos',
    role: 'Brand',
    content:
      "Wikkie has been an important part of our team as a full-time Graphic Designer and Video Editor. His minimal yet impactful editing style perfectly matched our brand, and his consistency, creativity, and quality made him a valuable addition to our startup.",
    rating: 5,
  },
  {
    name: 'Dr. Akhilesh Kumar Singh',
    role: 'Principal, Vashista Degree College',
    content:
      "Wikkie created a memorable video for our Silver Jubilee celebration, beautifully capturing 25 years of our college's journey. His storytelling, attention to detail, and creative editing made the video meaningful and well appreciated by everyone at the event.",
    rating: 5,
  },
]

export async function GET() {
  try {
    let items = await db.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    })

    // Self-seed on first request so the section is never empty
    if (items.length === 0) {
      await db.testimonial.createMany({ data: seedTestimonials })
      items = await db.testimonial.findMany({
        orderBy: { createdAt: 'desc' },
      })
    }

    return NextResponse.json({ ok: true, items })
  } catch (err) {
    console.error('[api/testimonials] GET failed:', err)
    return NextResponse.json(
      { ok: false, error: 'Failed to load testimonials' },
      { status: 500 },
    )
  }
}

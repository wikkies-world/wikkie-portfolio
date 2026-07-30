'use client'

const skills = [
  'Adobe Premiere Pro',
  'After Effects',
  'DaVinci Resolve',
  'CapCut',
  'Color Grading',
  'Sound Design',
  'Motion Graphics',
  'Cinematic Edits',
  'Talking Head',
  'Event Highlights',
  'Social Media',
  'Gen AI Tools',
]

export default function Marquee() {
  // duplicate the list for a seamless loop
  const items = [...skills, ...skills]
  return (
    <div
      className="relative py-6 bg-background border-y border-border overflow-hidden"
      aria-hidden
    >
      {/* edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((skill, i) => (
          <span key={i} className="flex items-center mx-6">
            <span className="text-lg font-semibold text-muted-foreground/80 tracking-wide">
              {skill}
            </span>
            <span className="ml-12 w-2 h-2 rounded-full bg-brand shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}

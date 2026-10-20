import { Star } from 'lucide-react'
import { Marquee } from '@/components/ui/marquee'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export interface Testimonial {
  name: string
  meta: string
  rating: number
  avatar: string
  quote: string
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${rating} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`size-3.5 ${i <= rating ? 'star' : 'star--empty'}`} strokeWidth={2} aria-hidden />
      ))}
    </span>
  )
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="card card--hover m-0 flex w-[320px] shrink-0 flex-col gap-4 p-5 sm:w-[360px]">
      <div className="flex items-center justify-between">
        <Stars rating={t.rating} />
      </div>
      <blockquote className="m-0 text-[0.95rem] leading-relaxed" style={{ color: 'var(--t2)' }}>{t.quote}</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-3" style={{ borderTop: '1px solid var(--line)' }}>
        <Avatar className="size-10" style={{ border: '1px solid var(--line-strong)', background: 'var(--surface-2)' }}>
          <AvatarImage src={`/avatars/${t.avatar}.svg`} alt="" />
          <AvatarFallback>{t.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
        <span className="flex min-w-0 flex-col">
          <span className="text-sm font-semibold" style={{ color: 'var(--t1)' }}>{t.name}</span>
          <span className="truncate text-xs" style={{ color: 'var(--t4)' }}>{t.meta}</span>
        </span>
      </figcaption>
    </figure>
  )
}

export default function Testimonials({ items }: { items: Testimonial[] }) {
  const half = Math.ceil(items.length / 2)
  return (
    <div className="relative flex flex-col gap-3 py-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <Marquee pauseOnHover className="[--duration:50s] [--gap:1rem] p-0">
        {items.slice(0, half).map((t) => <Card key={t.name} t={t} />)}
      </Marquee>
      <Marquee pauseOnHover reverse className="[--duration:56s] [--gap:1rem] p-0">
        {items.slice(half).map((t) => <Card key={t.name} t={t} />)}
      </Marquee>
    </div>
  )
}

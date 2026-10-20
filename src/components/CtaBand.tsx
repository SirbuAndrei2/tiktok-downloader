import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface Props { title: string; subtitle: string; button: string; href: string }

export default function CtaBand({ title, subtitle, button, href }: Props) {
  return (
    <section className="w-full max-w-6xl px-5 pb-24" aria-labelledby="cta-h">
      <div className="band">
        <span aria-hidden className="blob blob--peach -right-16 -top-24 h-72 w-72" />
        <span aria-hidden className="blob blob--sky -bottom-28 left-[20%] h-64 w-64" />
        <div className="relative flex flex-col items-start gap-8 px-8 py-14 md:flex-row md:items-center md:justify-between md:px-14">
          <div className="max-w-2xl">
            <h2 id="cta-h" className="text-4xl sm:text-5xl lg:text-6xl">{title}</h2>
            <p className="mt-4 text-base sm:text-lg" style={{ color: 'var(--t3)' }}>{subtitle}</p>
          </div>
          <Link href={href} className="btn-brand inline-flex h-13 shrink-0 items-center gap-2 rounded-full px-7 text-base no-underline">
            {button}
            <ArrowUpRight className="size-5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}

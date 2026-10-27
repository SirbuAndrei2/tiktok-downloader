/**
 * Visible FAQ block for the guide pages, styled like their step lists. Every
 * Q&A passed to faqPage() JSON-LD must also be rendered here: Google requires
 * structured-data content to be visible on the page.
 */
export default function GuideFaq({ title, faq }: { title: string; faq: { q: string; a: string }[] }) {
  return (
    <section className="w-full max-w-2xl mb-12" aria-labelledby="faq-h">
      <h2 id="faq-h" className="text-xl font-bold mb-6" style={{ color: 'var(--t1)' }}>{title}</h2>
      <div className="flex flex-col gap-3">
        {faq.map(({ q, a }) => (
          <div key={q} className="faq-item">
            <h3 className="text-sm font-bold mb-1.5" style={{ color: 'var(--t1)' }}>{q}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--t3)' }}>{a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

import MonetagTags from '@/components/ads/MonetagTags'

export default function GuideLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <MonetagTags />
    </>
  )
}

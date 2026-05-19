import AcademyHero from '@/components/academy/AcademyHero'
import AcademyProblem from '@/components/academy/AcademyProblem'
import AcademyFounder from '@/components/academy/AcademyFounder'
import AcademyCurriculum from '@/components/academy/AcademyCurriculum'
import AcademyPackages from '@/components/academy/AcademyPackages'
import AcademyApp from '@/components/academy/AcademyApp'
import AcademyCommunity from '@/components/academy/AcademyCommunity'
import AcademyFaq from '@/components/academy/AcademyFaq'
import AcademyCta from '@/components/academy/AcademyCta'

export default function AcademyPage() {
  return (
    <main className="bg-[#0b0b0f] text-white min-h-screen">
      <AcademyHero />
      <AcademyProblem />
      <AcademyFounder />
      <AcademyCurriculum />
      <AcademyPackages />
      <AcademyApp />
      <AcademyCommunity />
      <AcademyFaq />
      <AcademyCta />
    </main>
  )
}

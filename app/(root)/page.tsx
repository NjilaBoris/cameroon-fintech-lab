"use client"
import Dashboard from '@/components/Dashboard'
import Hero from '@/components/Hero'
import {motion} from 'framer-motion'
import { MarqueeDemo } from '@/components/MarqueeDemo'
import Quote from '@/components/Quote'
import Features from '@/components/Feautures'
import AboutSection from '@/components/About'
import LandscapeMarquee from '@/components/TextAnimation'
import TeamSection from '@/components/Team'



const Home = () => {
  return (
     <main className="relative overflow-hidden">
      <div className="hero-gradient grid-overlay relative pt-17">
        <Hero />
        <div className="pb-4"> 
        <motion.h2  
       initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.25, ease: "easeOut" }}
        className="text-3xl text-center font-bold">Our Partners</motion.h2>
          <MarqueeDemo />
        </div>
      </div>
      <Quote/>
      <div className="relative z-10  pt-7 px-6">
        <AboutSection/>
      </div>
      <Features/>
      <LandscapeMarquee/>
      <TeamSection/>
    </main>
  )
}

export default Home


import Dashboard from '@/components/Dashboard'
import Hero from '@/components/Hero'
import { MarqueeDemo } from '@/components/MarqueeDemo'
import Navbar from '@/components/Nav'
import React from 'react'

const Home = () => {
  return (
     <main className="relative overflow-hidden">
      <div className="hero-gradient grid-overlay relative pt-17  pb-56">
        <Hero />
        <div className="pb-8">
    <MarqueeDemo/>
        </div>
      </div>
      <div className="relative z-10 -mt-56 px-6 pb-20">
        <Dashboard />
      </div>
    </main>
  )
}

export default Home

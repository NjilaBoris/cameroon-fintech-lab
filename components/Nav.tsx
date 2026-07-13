"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Initiatives", path: "/initiatives" },
  { name: "Events", path: "/events" },
  { name: "Team", path: "/team" },
  { name: "Research & Policy", path: "/research-policy" }
];

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-3 sm:top-5 z-20 w-full px-3 sm:px-0 border-b border-white/10 backdrop-blur-sm">
      <header className="z-20 relative mx-auto flex w-full flex-col max-w-90 md:max-w-2xl justify-center rounded-2xl lg:rounded-full bg-[#1B1B1B] lg:max-w-6xl px-4 sm:px-6 py-3 sm:py-6">
        <div className="flex w-full items-center justify-between">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-[#C8F701] text-[10px] sm:text-xs font-bold text-[#1B1B1B] shadow-sm">
                CFL
              </span>
              <span className="text-[11px] hidden lg:block sm:text-[13px] font-semibold tracking-tight text-white uppercase whitespace-nowrap">
                Cameroon Fintech Lab
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur-sm lg:flex">
            {links.map((link, i) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`rounded-full ${isActive ? " text-brand-600 bg-white hover:text-brand-600/50" : "text-white/85 hover:text-white/50"}  px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium   whitespace-nowrap  transition-all duration-300 `}
                >
                  {link.name}
                </Link>
            )}
              // ) : (
              //   <Link
              //     key={link}
              //     href={`}
              //     className="rounded-full px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium text-white/85 transition hover:text-white whitespace-nowrap"
              //   >
              //     {link}
              //   </Link>
          )}
            
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <button className="rounded-full bg-[#C8F701] px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium text-[#1B1B1B] backdrop-blur-sm transition hover:bg-[#C8F701]/80 whitespace-nowrap">
              GET INVOLVED
            </button>
          </div>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="flex lg:hidden h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden lg:hidden"
            >
              <nav className="flex flex-col gap-1.5 pt-4 pb-1">
                {links.map((link, i) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                  >
                  <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-full ${isActive ? " text-brand-600 bg-white hover:text-brand-600/50" : "text-white/85 hover:text-white/50"}  px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-medium   whitespace-nowrap  transition-all duration-300 `}
                >
                  {link.name}
                </Link>
                  </motion.div>
                )})}

                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: links.length * 0.05 }}
                  onClick={() => setIsOpen(false)}
                  className="mt-2 rounded-xl bg-[#C8F701] px-4 py-2.5 text-sm font-medium text-[#1B1B1B] transition hover:bg-[#C8F701]/80"
                >
                  GET INVOLVED
                </motion.button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
"use client";

import { motion, type Variants } from "framer-motion";
import {
  Landmark,
  LayoutGrid,
  BarChart3,
  Bell as BellIcon,
  MessageSquare,
  Users,
  RefreshCcw,
  Search,
  HelpCircle,
  ChevronDown,
  Wallet,
  ShoppingBag,
  PiggyBank,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutGrid, active: true },
  { label: "Insights", icon: BarChart3 },
  { label: "Updates", icon: BellIcon },
  { label: "Message", icon: MessageSquare, badge: 20 },
  { label: "Customers", icon: Users },
];

const stats = [
  {
    label: "Earnings",
    value: "$5,567.00",
    last: "$4,545.00",
    icon: Wallet,
    bg: "bg-brand-500",
  },
  {
    label: "Spending",
    value: "$3,533.00",
    last: "$3,243.00",
    icon: ShoppingBag,
    bg: "bg-mint-500",
  },
  {
    label: "Savings",
    value: "$2,324.00",
    last: "$2,232.00",
    icon: PiggyBank,
    bg: "bg-[#ff7a45]",
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-black/5 bg-white shadow-2xl shadow-brand-900/20"
    >
      <div className="flex h-[440px] sm:h-[480px]">
        {/* Sidebar */}
        <aside className="hidden w-52 shrink-0 flex-col border-r border-black/5 px-4 py-5 sm:flex">
          <div className="mb-7 flex items-center gap-2 px-1">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white">
              <Landmark size={16} strokeWidth={2.2} />
            </span>
            <span className="text-[15px] font-semibold text-ink-900">CFL</span>
          </div>

          <p className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wide text-ink-700/40">
            Menu
          </p>
          <nav className="flex flex-col gap-1">
            {menuItems.map(({ label, icon: Icon, active, badge }) => (
              <a
                key={label}
                href="#"
                className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-[13px] font-medium transition ${
                  active
                    ? "bg-brand-50 text-brand-600"
                    : "text-ink-700/70 hover:bg-black/[0.03]"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon size={15} strokeWidth={2.2} />
                  {label}
                </span>
                {badge && (
                  <span className="rounded-md bg-black/5 px-1.5 py-0.5 text-[10px] font-semibold text-ink-700/60">
                    {badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          <p className="mb-2 mt-6 px-2 text-[11px] font-medium uppercase tracking-wide text-ink-700/40">
            Features
          </p>
          <a
            href="#"
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-ink-700/70 hover:bg-black/[0.03]"
          >
            <RefreshCcw size={15} strokeWidth={2.2} />
            Recurring
          </a>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}
          <div className="flex items-center justify-between border-b border-black/5 px-5 py-4">
            <h2 className="text-[15px] font-semibold text-ink-900">
              Dashboard
            </h2>
            <div className="hidden items-center gap-2 rounded-lg bg-black/[0.03] px-3 py-1.5 text-[12px] text-ink-700/50 sm:flex">
              <Search size={13} />
              Search anything...
              <span className="ml-6 rounded border border-black/10 bg-white px-1 text-[10px]">
                ⌘K
              </span>
            </div>
            <div className="flex items-center gap-3">
              <BellIcon size={16} className="text-ink-700/50" />
              <HelpCircle size={16} className="text-ink-700/50" />
              <div className="flex items-center gap-1.5 rounded-full bg-black/[0.03] py-1 pl-1 pr-2">
                <span className="h-5 w-5 rounded-full bg-gradient-to-br from-brand-400 to-brand-600" />
                <span className="hidden text-[11px] font-medium text-ink-700/70 sm:inline">
                  CFL Admin
                </span>
                <ChevronDown size={12} className="text-ink-700/40" />
              </div>
            </div>
          </div>

          {/* Body */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex-1 overflow-hidden px-5 py-4"
          >
            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map(({ label, value, last, icon: Icon, bg }) => (
                <motion.div
                  key={label}
                  variants={item}
                  className="rounded-xl border border-black/5 p-3.5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[12px] font-medium text-ink-700/60">
                      {label}
                    </span>
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${bg}`}
                    >
                      <Icon size={12} strokeWidth={2.4} />
                    </span>
                  </div>
                  <p className="text-[19px] font-semibold text-ink-900">
                    {value}
                  </p>
                  <p className="mt-1 text-[11px] text-ink-700/40">
                    Last month: {last}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Bottom row */}
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-[1.5fr_1fr]">
              <motion.div
                variants={item}
                className="rounded-xl border border-black/5 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-ink-700/60">
                    Transactions Overview
                  </span>
                  <span className="flex items-center gap-1 rounded-md border border-black/10 px-2 py-1 text-[11px] text-ink-700/60">
                    This Year <ChevronDown size={11} />
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-4">
                  <p className="text-[19px] font-semibold text-ink-900">
                    $4,235.00
                  </p>
                  <span className="flex items-center gap-1 text-[10px] text-ink-700/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                    Total Transaction
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-ink-700/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint-500" />
                    Earning
                  </span>
                </div>

                <div className="relative mt-3 h-24 w-full">
                  <span className="absolute left-[38%] top-0 -translate-x-1/2 -translate-y-1/2 rounded-md bg-ink-900 px-2 py-1 text-[10px] font-semibold text-white shadow">
                    $22,430
                  </span>
                  <svg
                    viewBox="0 0 320 90"
                    preserveAspectRatio="none"
                    className="h-full w-full"
                  >
                    <polyline
                      points="0,70 40,60 80,65 120,40 160,50 200,20 240,35 280,15 320,25"
                      fill="none"
                      stroke="var(--color-brand-500)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <polyline
                      points="0,80 40,78 80,72 120,74 160,60 200,62 240,45 280,50 320,40"
                      fill="none"
                      stroke="var(--color-mint-500)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="1 7"
                    />
                    <line
                      x1="122"
                      y1="0"
                      x2="122"
                      y2="90"
                      stroke="black"
                      strokeOpacity="0.08"
                      strokeDasharray="3 3"
                    />
                    <circle cx="122" cy="40" r="4" fill="var(--color-brand-500)" />
                  </svg>
                </div>
              </motion.div>

              <motion.div
                variants={item}
                className="flex flex-col rounded-xl border border-black/5 p-4"
              >
                <span className="text-[12px] font-medium text-ink-700/60">
                  Spending Overview
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <p className="text-[19px] font-semibold text-ink-900">
                    $24,678.20
                  </p>
                  <span className="text-[11px] font-semibold text-mint-500">
                    +4.9%
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-ink-700/40">
                  From $30,000.00
                </p>
                <div className="mt-auto flex h-2.5 w-full overflow-hidden rounded-full bg-black/[0.05]">
                  <span className="h-full w-[52%] bg-brand-500" />
                  <span className="h-full w-[30%] bg-mint-500" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

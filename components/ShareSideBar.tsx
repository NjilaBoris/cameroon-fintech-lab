// components/share-sidebar.tsx
"use client";

import { useState } from "react";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandTelegram,
  IconLink,
  IconCheck,
} from "@tabler/icons-react";

type ShareSidebarProps = {
  title: string;
  slug: string;
};

type ShareNetwork = {
  name: string;
  icon: React.ReactNode;
  color: string;
  getUrl: (articleUrl: string, title: string) => string;
};

const NETWORKS: ShareNetwork[] = [
  {
    name: "Facebook",
    icon: <IconBrandFacebook className="size-5" />,
    color:
      "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    getUrl: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "X (Twitter)",
    icon: <IconBrandTwitter className="size-5" />,
    color:
      "hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]",
    getUrl: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "LinkedIn",
    icon: <IconBrandLinkedin className="size-5" />,
    color:
      "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
    getUrl: (url, title) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    name: "WhatsApp",
    icon: <IconBrandWhatsapp className="size-5" />,
    color:
      "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
    getUrl: (url, title) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    name: "Telegram",
    icon: <IconBrandTelegram className="size-5" />,
    color:
      "hover:bg-[#229ED9] hover:text-white hover:border-[#229ED9]",
    getUrl: (url, title) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
];

export function ShareSidebar({ title, slug }: ShareSidebarProps) {
  const [copied, setCopied] = useState(false);
  function getArticleUrl() {
    return `${window.location.origin}/blog/${slug}`;
  }

  function handleShare(network: ShareNetwork) {
    const url = getArticleUrl();
    const shareUrl = network.getUrl(url, title);
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=500");
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(getArticleUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Could not copy link. Please copy it manually from the address bar.");
    }
  }

  return (
    <>
      <aside className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-40">
        <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest [writing-mode:vertical-lr] rotate-180 mb-2">
          Share
        </span>

        {NETWORKS.map((network) => (
          <button
            key={network.name}
            onClick={() => handleShare(network)}
            title={`Share on ${network.name}`}
            className={`flex items-center justify-center rounded-full border border-zinc-200 bg-white p-2.5 text-zinc-500 shadow-sm transition-all duration-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 ${network.color}`}
          >
            {network.icon}
          </button>
        ))}

        <button
          onClick={handleCopyLink}
          title="Copy link"
          className="flex items-center justify-center rounded-full border border-zinc-200 bg-white p-2.5 text-zinc-500 shadow-sm transition-all duration-200 hover:bg-zinc-800 hover:text-white hover:border-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
        >
          {copied ? (
            <IconCheck className="size-5 text-green-500" />
          ) : (
            <IconLink className="size-5" />
          )}
        </button>

       
        <div className="h-16 w-px bg-zinc-200 dark:bg-zinc-700 mt-1" />
      </aside>

      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-3 border-t border-zinc-200 bg-white/90 px-4 py-3 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
        <span className="text-xs font-medium text-zinc-400 mr-1">Share:</span>

        {NETWORKS.map((network) => (
          <button
            key={network.name}
            onClick={() => handleShare(network)}
            title={`Share on ${network.name}`}
            className={`flex items-center justify-center rounded-full border border-zinc-200 bg-white p-2 text-zinc-500 transition-all duration-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 ${network.color}`}
          >
            {network.icon}
          </button>
        ))}

        <button
          onClick={handleCopyLink}
          title="Copy link"
          className="flex items-center justify-center rounded-full border border-zinc-200 bg-white p-2 text-zinc-500 transition-all duration-200 hover:bg-zinc-800 hover:text-white hover:border-zinc-800 dark:border-zinc-700 dark:bg-zinc-900"
        >
          {copied ? (
            <IconCheck className="size-4 text-green-500" />
          ) : (
            <IconLink className="size-4" />
          )}
        </button>
      </div>
    </>
  );
}
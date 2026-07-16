"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, CheckCircle2 } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function resetAndClose() {
    setName("");
    setContact("");
    setEmail("");
    setStatus("idle");
    setErrorMessage("");
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          
          <motion.div
            className="absolute inset-0 bg-[#10131F]/60 backdrop-blur-sm"
            onClick={resetAndClose}
          />

        
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="relative w-full max-w-md rounded-2xl bg-[#F7F4EC] p-6 sm:p-8 shadow-2xl"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={resetAndClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-[#10131F]/50 transition-colors hover:bg-[#10131F]/5 hover:text-[#10131F]"
            >
              <X className="h-5 w-5" />
            </button>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <CheckCircle2 className="h-12 w-12 text-[#C89B3C]" />
                <h3 className="mt-4 text-lg font-medium text-[#10131F]">
                  Thanks, {name.split(" ")[0] || "there"}!
                </h3>
                <p className="mt-2 text-sm text-[#10131F]/60">
                  We&apos;ve received your interest and will reach out soon.
                </p>
                <button
                  onClick={resetAndClose}
                  className="mt-6 rounded-full bg-[#10131F] px-6 py-2.5 text-sm font-medium text-[#F7F4EC] transition-colors hover:bg-[#10131F]/90"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <>
                <span className="font-mono text-[10px] tracking-[0.2em] text-[#C89B3C]">
                  EXPRESS INTEREST
                </span>
                <h3
                  id="contact-modal-title"
                  className="mt-2 text-xl sm:text-2xl font-medium text-[#10131F]"
                >
                  Join the FinTech &amp; Data Chat
                </h3>
                <p className="mt-2 text-sm text-[#10131F]/60">
                  Leave your details and we&apos;ll follow up with the next session.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="font-mono text-[10px] tracking-[0.18em] text-[#10131F]/50"
                    >
                      NAME
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="mt-1.5 w-full rounded-lg border border-[#10131F]/15 bg-white px-4 py-2.5 text-sm text-[#10131F] outline-none transition-colors placeholder:text-[#10131F]/30 focus:border-[#C89B3C]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact"
                      className="font-mono text-[10px] tracking-[0.18em] text-[#10131F]/50"
                    >
                      PHONE / WHATSAPP
                    </label>
                    <input
                      id="contact"
                      type="tel"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="+237 6XX XXX XXX"
                      className="mt-1.5 w-full rounded-lg border border-[#10131F]/15 bg-white px-4 py-2.5 text-sm text-[#10131F] outline-none transition-colors placeholder:text-[#10131F]/30 focus:border-[#C89B3C]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="font-mono text-[10px] tracking-[0.18em] text-[#10131F]/50"
                    >
                      EMAIL
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1.5 w-full rounded-lg border border-[#10131F]/15 bg-white px-4 py-2.5 text-sm text-[#10131F] outline-none transition-colors placeholder:text-[#10131F]/30 focus:border-[#C89B3C]"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-600">{errorMessage}</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
                    whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#10131F] px-6 py-3 text-sm font-medium text-[#F7F4EC] transition-colors hover:bg-[#10131F]/90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
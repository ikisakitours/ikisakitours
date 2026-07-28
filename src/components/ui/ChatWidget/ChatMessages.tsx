import React from "react";
//Icons
import { Mail, Headset } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

interface ChatMessagesProps {
  onEmailClick: () => void;
  waLink: string;
}

export function ChatMessages({ onEmailClick, waLink }: ChatMessagesProps) {
  return (
    <div className="space-y-6 animate-fade-in-up min-h-90  flex flex-col justify-between">
      <div className="space-y-5">
        {/* Start a new chat section */}
        <div>
          <h3 className="text-xs font-medium text-slate-400 mb-3 px-1 tracking-wide uppercase">Start a new chat</h3>
          <div className="space-y-3">
            {/* WhatsApp Button */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-between rounded-xl bg-lanka-black border border-[#25D366]/30 p-3.5 hover:border-[#25D366] hover:bg-[#25D366]/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <SiWhatsapp className="h-5 w-5 text-[#25D366]" />
                <div className="text-left">
                  <p className="text-[13px] font-bold text-white group-hover:text-[#25D366] transition-colors">
                    WhatsApp Chat
                  </p>
                  <p className="text-[10px] text-slate-500">Fastest response</p>
                </div>
              </div>
            </a>

            {/* Email Button */}
            <button
              onClick={onEmailClick}
              className="group flex w-full items-center justify-between rounded-xl bg-lanka-black border border-gold/30 p-3.5 hover:border-gold hover:bg-gold/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold" />
                <div className="text-left">
                  <p className="text-[13px] font-bold text-white group-hover:text-gold transition-colors">
                    Send an Email
                  </p>
                  <p className="text-[10px] text-slate-500">Detailed inquiries</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Chats */}
        <div>
          <h3 className="text-xs font-medium text-slate-400 mb-3 px-1 tracking-wide uppercase">Recent</h3>
          <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-default">
            <div className="flex items-center gap-3">
              <div className="bg-gold/20 p-2 rounded-full border border-gold/30">
                <Headset size={14} className="text-gold" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400">Customer Support</p>
                <p className="text-[13px] font-medium text-white mt-0.5">👋 Hi! How can we help?</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[10px] text-slate-500">now</span>
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

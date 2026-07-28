import React from "react";
//Icons
import { Send, Zap, ShieldCheck, Headset } from "lucide-react";

export function ChatHome({ onNewChat }: { onNewChat: () => void }) {
  return (
    <div className="animate-fade-in-up flex flex-col justify-between min-h-90 ">
      <div className="bg-linear-to-br from-gold-dark/40 via-surface to-lanka-black border border-gold/20 rounded-2xl p-5 relative overflow-hidden shadow-lg flex flex-col justify-between h-full">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div>
          <h2 className="text-2xl font-bold text-white mb-2 premium-serif">Hello there! 👋</h2>
          <p className="text-[13px] text-slate-300 mb-4 leading-relaxed">
            Need help? Start a new conversation and our travel assistants will guide you.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/5 border border-gold/20 text-[10px] font-bold uppercase tracking-wider text-gold">
              <Zap size={12} />
              <span>Quick Replies</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/5 border border-gold/20 text-[10px] font-bold uppercase tracking-wider text-gold">
              <ShieldCheck size={12} />
              <span>Safe & Secure</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/5 border border-gold/20 text-[10px] font-bold uppercase tracking-wider text-gold">
              <Headset size={12} />
              <span>Real Support</span>
            </div>
          </div>
        </div>

        <button
          onClick={onNewChat}
          className="w-full bg-white rounded-[14px] p-3.5 flex items-center justify-between hover:bg-slate-100 hover:scale-[1.02] transition-all duration-300 shadow-xl group mt-2"
        >
          <div className="text-left">
            <p className="font-bold text-lanka-black text-[13px]">New Conversation</p>
            <p className="text-[11px] text-slate-500 mt-0.5">We typically reply in a few minutes</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
            <Send size={14} className="text-gold-dark" />
          </div>
        </button>
      </div>
    </div>
  );
}

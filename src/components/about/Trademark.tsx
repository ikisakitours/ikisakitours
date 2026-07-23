import React from "react";

interface TrademarkProps {
  data: {
    paragraphs: string[];
  };
}

export default function Trademark({ data }: TrademarkProps) {
  return (
    <div className="rounded-3xl bg-lanka-black border border-white/5 p-8 text-xs text-slate-500 leading-relaxed text-center space-y-3">
      {data.paragraphs.map((text, index) => (
        <p
          key={index}
          dangerouslySetInnerHTML={{ __html: text }} // Enables bold tags and links from mock data
        />
      ))}
    </div>
  );
}

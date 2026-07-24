import Image from "next/image";
import { BlogPost } from "@/data/blog";

interface HeroProps {
  post: BlogPost;
}

export function Hero({ post }: HeroProps) {
  const titleWords = post.title.split(" ");
  const lastWord = titleWords.pop();
  const mainTitle = titleWords.join(" ");

  return (
    <header className="relative flex min-h-130 items-center justify-center bg-lanka-dark px-4 pb-32 pt-36 text-center md:min-h-155 md:pt-44">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image src={post.image} alt={post.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/80 to-lanka-dark" />
      </div>

      <div className="absolute -bottom-0.5 left-0 right-0 z-0 h-1 bg-lanka-dark pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="mb-6 inline-block rounded-full border border-gold/20 bg-gold/5 px-4 py-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{post.category}</span>
        </div>

        <h1 className="premium-serif mb-6 text-4xl leading-tight text-white md:text-6xl lg:text-7xl">
          {mainTitle} <span className="italic text-gold">{lastWord}</span>
        </h1>

        <div className="flex items-center justify-center gap-4 md:gap-5">
          <div className="hidden h-px w-8 bg-gold/40 sm:block" />
          <p className="mx-auto max-w-[90%] text-[11px] font-bold uppercase leading-relaxed tracking-[0.16em] text-gold md:text-[13px] md:tracking-[0.2em]">
            {post.excerpt}
          </p>
          <div className="hidden h-px w-8 bg-gold/40 sm:block" />
        </div>
      </div>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArticleActions } from "@/components/blog/ArticleActions";
//Icons
import { ArrowLeft, Images } from "lucide-react";

interface BlogArticleProps {
  post: {
    title: string;
    slug: string;
    published: string;
    readTime: string;
    likes: number;
    gallery: { id: string; src: string; alt: string }[];
  };
}

export function BlogArticle({ post }: BlogArticleProps) {
  return (
    <article className="relative z-20 mx-auto -mt-16 mb-16 max-w-4xl px-4 md:-mt-20">
      <div className="glass-card rounded-3xl p-6 shadow-2xl md:rounded-4xl md:p-12">
        <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <span className="mb-1 block text-[9px] uppercase tracking-[0.3em] text-gold/60">Published</span>
            <p className="text-xs font-bold uppercase text-white">{post.published}</p>
          </div>
          <div className="text-right">
            <span className="mb-1 block text-[9px] uppercase tracking-[0.3em] text-gold/60">Reading Time</span>
            <p className="text-xs font-bold uppercase text-white">{post.readTime.replace("read", "")}</p>
          </div>
        </div>

        <div className="space-y-8 text-sm font-light leading-relaxed text-slate-300 md:text-base">
          <p>
            Stepping into Polonnaruwa is like entering a time machine. The air is thick with history, and every stone
            tells a story of a kingdom that was once the pinnacle of Asian civilization.
          </p>

          <div className="my-12 flex flex-wrap justify-center gap-4">
            {post.gallery.slice(0, 4).map((image, index) => {
              const isGalleryLink = index === 3;

              const className = `group relative h-32 w-[calc(50%-0.5rem)] overflow-hidden rounded-2xl border border-gold/30 shadow-lg md:h-40 md:w-40 ${
                index % 2 === 0 ? "md:mt-4" : "md:-mt-4"
              }`;

              const content = (
                <>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {isGalleryLink ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 transition-colors duration-300 group-hover:bg-black/65">
                      <Images className="mb-2 text-white" size={28} />
                      <span className="px-2 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                        View Gallery
                      </span>
                    </div>
                  ) : null}
                </>
              );

              return isGalleryLink ? (
                <Link key={image.id} href={`/gallery/${post.slug}`} className={className}>
                  {content}
                </Link>
              ) : (
                <div key={image.id} className={className}>
                  {content}
                </div>
              );
            })}
          </div>

          <p>
            As your personal guide, I do not just show you ruins; I bring them to life. We explore the{" "}
            <b className="font-semibold text-gold">Royal Palace</b> and the{" "}
            <b className="font-semibold text-gold">Audience Hall</b>, where ancient kings made decisions that shaped the
            island&apos;s destiny.
          </p>

          <blockquote className="my-12 rounded-r-2xl border-l-2 border-gold/30 bg-white/5 px-6 py-8 text-center">
            <p className="premium-serif text-xl italic leading-snug text-white/90 md:text-2xl">
              &quot;The sunrise at Gal Vihara is an experience that stays with you forever. The way the light hits the
              stone Buddha is pure magic.&quot;
            </p>
          </blockquote>

          <p>
            For our visitors from Japan and France, we provide specialized insights into architectural parallels and
            historical links, ensuring your journey is as educational as it is breathtaking.
          </p>
        </div>

        <ArticleActions initialLikes={post.likes} postTitle={post.title} postSlug={post.slug} />

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold transition-all hover:tracking-[0.4em]"
          >
            <ArrowLeft size={14} />
            Back to journal
          </Link>
        </div>
      </div>
    </article>
  );
}

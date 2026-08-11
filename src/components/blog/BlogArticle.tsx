// "use client";
// import { LoadingImage } from "@/components/ui/LoadingImage";
// import { Link } from "@/i18nNavigation";
// import React, { Suspense } from "react";
// import { ArticleActions } from "@/components/blog/ArticleActions";
// import { useSearchParams } from "next/navigation"; 
// import { useRouter } from "@/i18nNavigation"; 
// import { EmptyState } from "@/components/ui/EmptyState";
// import { ArrowLeft, ArrowRight, Images } from "lucide-react";
// import { useTranslations } from "next-intl";

// interface BlogArticleProps {
//   post: {
//     title: string;
//     slug: string;
//     published: string;
//     readTime: string;
//     likes: number;
//     gallery: { id: string; src: string; alt: string }[];
//     content?: string[];
//   };
// }

// function BlogArticleInner({ post }: BlogArticleProps) {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const fromWhere = searchParams?.get("from");
//   const t = useTranslations("Blog.Article");

//   const backHref = fromWhere === "home" ? "/" : "/blog";
//   const backText = fromWhere === "home" ? t("backToHome") : t("backToJournal");

//   return (
//     <article className="relative z-20 mx-auto max-w-4xl px-4 pb-12 md:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-28">
//       {/* Main Glass Card */}
//       <div className="glass-card overflow-hidden rounded-4xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-xl md:rounded-[2.5rem]">
//         {/* --- 1. TOP EDITORIAL HEADER --- */}
//         <div className="flex flex-col px-6 pt-6 md:px-12 md:pt-10">
//           {/* Back Button - Top Left */}
//           <div className="mb-5">
//             <Link
//               href={backHref}
//               onClick={(e) => {
//                 if (!e.ctrlKey && !e.metaKey) {
//                   e.preventDefault();
//                   router.back();
//                 }
//               }}
//               className="group flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]! text-white/60 transition-colors hover:text-gold"
//             >
//               <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:-translate-x-1 group-hover:border-gold/50 group-hover:bg-gold/10">
//                 <ArrowLeft size={14} className="text-white group-hover:text-gold" />
//               </span>
//               {backText}
//             </Link>
//           </div>

//           <div className="flex w-full flex-row items-end justify-between border-b border-white/10 pb-6">
//             {/* Left: Published */}
//             <div className="flex flex-col gap-2">
//               <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold/70">{t("published")}</span>
//               <span className="text-sm font-extrabold uppercase tracking-wide text-white md:text-base">
//                 {post.published}
//               </span>
//             </div>

//             {/* Right: Reading Time */}
//             <div className="flex flex-col items-end gap-2 text-right">
//               <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold/70">{t("readingTime")}</span>
//               <span className="text-sm font-extrabold uppercase tracking-wide text-white md:text-base">
//                 {post.readTime.replace(/read/i, "").trim()}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* --- 2. ARTICLE CONTENT AREA --- */}
//         <div className="px-6 py-10 md:px-12 md:py-14">
//           <div className="prose prose-invert prose-lg max-w-none space-y-6 text-base font-light leading-relaxed text-slate-300 md:text-[17px]">
//             {post.content && post.content.length > 0 ? (
//               post.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)
//             ) : (
//               <EmptyState
//                 backgroundText={t("Pending.backgroundText")}
//                 title={t("Pending.title")}
//                 description={t("Pending.description")}
//                 onAction={() => {
//                   window.location.reload();
//                 }}
//               />
//             )}
//           </div>

//           {post.gallery && post.gallery.length > 0 && (
//             <div className="mt-16">
//               <div className="mb-10 flex items-center gap-4">
//                 <div className="h-px flex-1 bg-linear-to-r from-transparent via-gold/30 to-transparent"></div>
//                 <h3 className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-gold/80">
//                   {t("visualGlimpse")}
//                 </h3>
//                 <div className="h-px flex-1 bg-linear-to-r from-transparent via-gold/30 to-transparent"></div>
//               </div>

//               <div className="flex flex-wrap justify-center gap-4">
//                 {post.gallery.slice(0, 4).map((image, index) => {
//                   const isGalleryLink = index === 3;
//                   const className = `group relative h-32 w-[calc(50%-0.5rem)] overflow-hidden rounded-2xl border border-gold/30 shadow-lg md:h-40 md:w-40 ${
//                     index % 2 === 0 ? "md:mt-4" : "md:-mt-4"
//                   }`;

//                   const content = (
//                     <>
//                       <LoadingImage
//                         src={image.src}
//                         alt={image.alt}
//                         fill
//                         sizes="(max-width: 768px) 50vw, 160px"
//                         watermarkClassName="text-[17px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//                         wrapperClassName="w-full h-full"
//                         className="image-object-cover group-hover:scale-110"
//                       />
//                       {isGalleryLink ? (
//                         <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 transition-colors duration-300 group-hover:bg-black/70">
//                           <Images className="mb-2 text-white" size={24} />
//                           <span className="px-2 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-white">
//                             {t("viewGallery")}
//                           </span>
//                         </div>
//                       ) : null}
//                     </>
//                   );

//                   return isGalleryLink ? (
//                     <Link key={image.id} href={`/gallery/${post.slug}`} className={className}>
//                       {content}
//                     </Link>
//                   ) : (
//                     <div key={image.id} className={className}>
//                       {content}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* --- 4. BOTTOM ACTION AREA --- */}
//           <div className="mt-16 flex flex-row items-center justify-between gap-4 border-t border-white/10 pt-10">
//             {/* Left: Like & Share Buttons Only */}
//             <div className="flex items-center">
//               <ArticleActions initialLikes={post.likes} postTitle={post.title} postSlug={post.slug} />
//             </div>

//             {/* Right: Minimal More Articles Link */}
//             <Link href="/blog" className="group flex items-center gap-2.5 text-right whitespace-nowrap sm:gap-3">
//               <span className="text-[8px] lg:text-[12px] font-bold uppercase tracking-[0.15em] text-gold transition-colors group-hover:text-white sm:text-[9px] sm:tracking-[0.2em] md:text-[10px] md:tracking-[0.2em]">
//                 {t("moreArticles")}
//               </span>

//               <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-gold/50 group-hover:bg-gold/10 group-hover:translate-x-1 sm:h-11 sm:w-11">
//                 <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:text-gold" />
//               </span>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

// export function BlogArticle({ post }: BlogArticleProps) {
//   return (
//     <Suspense fallback={null}>
//       <BlogArticleInner post={post} />
//     </Suspense>
//   );
// }



"use client";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { Link } from "@/i18nNavigation";
import React, { Suspense } from "react";
import { ArticleActions } from "@/components/blog/ArticleActions";
import { useSearchParams } from "next/navigation"; 
import { useRouter } from "@/i18nNavigation"; 
import { EmptyState } from "@/components/ui/EmptyState";
import { ArrowLeft, ArrowRight, Images } from "lucide-react";
import { useTranslations } from "next-intl";

interface BlogArticleProps {
  post: {
    title: string;
    slug: string;
    published: string;
    readTime: string;
    likes: number;
    gallery: { id: string; src: string; alt: string }[];
    content?: string[];
  };
}


function BackButtonWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fromWhere = searchParams?.get("from");
  const t = useTranslations("Blog.Article");

  const backHref = fromWhere === "home" ? "/" : "/blog";
  const backText = fromWhere === "home" ? t("backToHome") : t("backToJournal");

  return (
    <Link
      href={backHref}
      onClick={(e) => {
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          router.back();
        }
      }}
      className="group flex w-fit items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]! text-white/60 transition-colors hover:text-gold"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:-translate-x-1 group-hover:border-gold/50 group-hover:bg-gold/10">
        <ArrowLeft size={14} className="text-white group-hover:text-gold" />
      </span>
      {backText}
    </Link>
  );
}

function BlogArticleInner({ post }: BlogArticleProps) {
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // const fromWhere = searchParams?.get("from");
  const t = useTranslations("Blog.Article");

  // const backHref = fromWhere === "home" ? "/" : "/blog";
  // const backText = fromWhere === "home" ? t("backToHome") : t("backToJournal");

  return (
    <article className="relative z-20 mx-auto max-w-4xl px-4 pb-12 md:pb-20 xl:pb-20 2xl:pb-24 3xl:pb-28">
      {/* Main Glass Card */}
      <div className="glass-card overflow-hidden rounded-4xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-xl md:rounded-[2.5rem]">
        {/* --- 1. TOP EDITORIAL HEADER --- */}
        <div className="flex flex-col px-6 pt-6 md:px-12 md:pt-10">
          {/* Back Button - Top Left */}
          <div className="mb-5">
          <Suspense fallback={<div className="h-8 w-24 animate-pulse bg-white/5 rounded-full" />}>
              <BackButtonWrapper />
            </Suspense>
          </div>

          <div className="flex w-full flex-row items-end justify-between border-b border-white/10 pb-6">
            {/* Left: Published */}
            <div className="flex flex-col gap-2">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold/70">{t("published")}</span>
              <span className="text-sm font-extrabold uppercase tracking-wide text-white md:text-base">
                {post.published}
              </span>
            </div>

            {/* Right: Reading Time */}
            <div className="flex flex-col items-end gap-2 text-right">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold/70">{t("readingTime")}</span>
              <span className="text-sm font-extrabold uppercase tracking-wide text-white md:text-base">
                {post.readTime.replace(/read/i, "").trim()}
              </span>
            </div>
          </div>
        </div>

        {/* --- 2. ARTICLE CONTENT AREA --- */}
        <div className="px-6 py-10 md:px-12 md:py-14">
          <div className="prose prose-invert prose-lg max-w-none space-y-6 text-base font-light leading-relaxed text-slate-300 md:text-[17px]">
            {post.content && post.content.length > 0 ? (
              post.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)
            ) : (
              <EmptyState
                backgroundText={t("Pending.backgroundText")}
                title={t("Pending.title")}
                description={t("Pending.description")}
                onAction={() => {
                  window.location.reload();
                }}
              />
            )}
          </div>

          {post.gallery && post.gallery.length > 0 && (
            <div className="mt-16">
              <div className="mb-10 flex items-center gap-4">
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-gold/30 to-transparent"></div>
                <h3 className="text-center text-[10px] font-bold uppercase tracking-[0.4em] text-gold/80">
                  {t("visualGlimpse")}
                </h3>
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-gold/30 to-transparent"></div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                {post.gallery.slice(0, 4).map((image, index) => {
                  const isGalleryLink = index === 3;
                  const className = `group relative h-32 w-[calc(50%-0.5rem)] overflow-hidden rounded-2xl border border-gold/30 shadow-lg md:h-40 md:w-40 ${
                    index % 2 === 0 ? "md:mt-4" : "md:-mt-4"
                  }`;

                  const content = (
                    <>
                      <LoadingImage
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, 160px"
                        watermarkClassName="text-[17px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        wrapperClassName="w-full h-full"
                        className="image-object-cover group-hover:scale-110"
                      />
                      {isGalleryLink ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 transition-colors duration-300 group-hover:bg-black/70">
                          <Images className="mb-2 text-white" size={24} />
                          <span className="px-2 text-center text-[9px] font-bold uppercase tracking-[0.2em] text-white">
                            {t("viewGallery")}
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
            </div>
          )}

          {/* --- 4. BOTTOM ACTION AREA --- */}
          <div className="mt-16 flex flex-row items-center justify-between gap-4 border-t border-white/10 pt-10">
            {/* Left: Like & Share Buttons Only */}
            <div className="flex items-center">
              <ArticleActions initialLikes={post.likes} postTitle={post.title} postSlug={post.slug} />
            </div>

            {/* Right: Minimal More Articles Link */}
            <Link href="/blog" className="group flex items-center gap-2.5 text-right whitespace-nowrap sm:gap-3">
              <span className="text-[8px] lg:text-[12px] font-bold uppercase tracking-[0.15em] text-gold transition-colors group-hover:text-white sm:text-[9px] sm:tracking-[0.2em] md:text-[10px] md:tracking-[0.2em]">
                {t("moreArticles")}
              </span>

              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-300 group-hover:border-gold/50 group-hover:bg-gold/10 group-hover:translate-x-1 sm:h-11 sm:w-11">
                <ArrowRight className="w-5 h-5 text-white transition-transform group-hover:text-gold" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function BlogArticle({ post }: BlogArticleProps) {
  return (
    <Suspense fallback={null}>
      <BlogArticleInner post={post} />
    </Suspense>
  );
}
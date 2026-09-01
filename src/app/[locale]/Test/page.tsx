// src/components/TestimonialsPage.tsx (හෝ අදාළ තැන)
"use client";

import { useReviews } from "@/hooks/testimonials/useFetchReviews"; // ඔයාගේ hook එක import කරගන්න

export default function TestimonialsPage() {
  const { data, isLoading, error } = useReviews();

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-lg text-gray-500 animate-pulse">Loading reviews...</p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="text-center p-10">
        <h3 className="text-red-500 font-bold text-xl">Oops! Something went wrong.</h3>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  // 3. No Data State
  if (!data || data.comments.length === 0) {
    return <div className="text-center p-10 text-gray-500">No reviews found.</div>;
  }

  return (
    <section className="max-w-6xl mx-auto p-6">
      {/* --- Summary Section --- */}
      <div className="bg-blue-50 rounded-xl p-6 mb-10 text-center shadow-sm">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Customer Reviews</h2>
        <div className="flex justify-center items-center gap-6 text-lg text-gray-700">
          <div>
            Total Reviews: <span className="font-bold">{data.totalComments}</span>
          </div>
          <div className="w-px h-6 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            Average Rating: 
            <span className="font-bold ml-1">{data.averageRating}</span> 
            <span className="text-yellow-500">⭐</span>
          </div>
        </div>
      </div>

      {/* --- Comments Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.comments.map((review) => (
          // Public ඒවා විතරක් පෙන්නන්න අවශ්‍ය නම් මෙතන condition එකක් දාන්න පුළුවන්
          review.isPubliclyVisible && (
            <div key={review.id} className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition">
              
              {/* Header: User Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {review.avatarUrl ? (
                      <img src={review.avatarUrl} alt={review.authorName} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-500 font-bold text-sm">
                        {review.authorName.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 flex items-center gap-1">
                      {review.authorName}
                      {/* Verified Badge */}
                      {review.isVerified && <span className="text-blue-500 text-sm" title="Verified User">✔</span>}
                      {/* VIP Badge */}
                      {review.isVip && <span className="bg-yellow-400 text-white text-[10px] px-1 rounded ml-1">VIP</span>}
                    </h4>
                    <p className="text-xs text-gray-500">{review.country} • {review.date}</p>
                  </div>
                </div>
                
                {/* Rating */}
                {review.rating && (
                  <div className="text-yellow-500 text-sm">
                    {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                  </div>
                )}
              </div>

              {/* Content */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-4">
                &quot;{review.content}&quot;
              </p>

              {/* Admin Reply */}
              {review.adminReply && (
                <div className="bg-gray-50 border-l-4 border-blue-400 p-3 mt-4 text-sm text-gray-600 rounded-r-md">
                  <span className="font-bold text-gray-800 block mb-1">Reply from Ikisaki Tours:</span>
                  {review.adminReply}
                </div>
              )}
              
            </div>
          )
        ))}
      </div>
    </section>
  );
}
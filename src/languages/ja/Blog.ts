export default {
  Metadata: {
    title: "ジャーナル",
    description:
      "IkiSaki Toursが厳選したスリランカ旅行の情報をお届けします。旅行ガイドや現地の文化、世界遺産、息をのむような絶景スポットを通して、スリランカの魅力を発見し、あなただけの特別な旅を計画しましょう.",
    //new
      notFoundTitle: "ストーリーが見つかりません",
  },
  Hero: {
    eyebrow: "ジャーナル",
    title: "IkiSaki",
    accent: "と発見する旅",
    strapline:
      "スリランカの旅、文化、歴史、そして隠れた魅力をご紹介します。特別な旅を計画するためのヒントを見つけましょう.",
    image: "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&q=80&w=2400",
    alt: "クラシックなコンパスとスリランカのビンテージ地図",
  },
  Explorer: {
    filterCategories: "カテゴリを絞り込む",
    filter: "フィルター",
    searchPlaceholder: "記事を検索...",
    loadMore: "記事をもっと見る",
    showing: "Showing",
    of: "of",
    stories: "Stories",
    articleSingular: "記事",
    Sidebar: {
      all: "すべて",
      clearFilter: "フィルターをクリア",
      categories: "カテゴリー",
      sortByDate: "日付で並べ替え",
      newestFirst: "新着順",
      oldestFirst: "古い順",
      readTime: "読了時間",
      allReadTimes: "すべての読了時間",
      showResults: "リセットする",
    },
    EmptyState: {
      backgroundText: "ジャーナル",
      title: "記事が見つかりません",
      searchNoResult: "「{query}」の検索結果に記事はありませんでした.",
      filterNoResult: "選択したカテゴリ ({category}) に記事はありませんでした.",
      searchAndFilterNoResult: "「{category}」カテゴリ内で「{query}」に一致する記事は見つかりませんでした.",
      redefine: "検索条件を変更するか、フィルターをリセットしてください.",
      resetBtn: "探索をリセット",
    },
  },
  Card: {
    readMore: "続きを読む",
    lovedThis: "お気に入り",
  },
  Article: {
    backToHome: "ホームに戻る",
    backToJournal: "ジャーナルに戻る",
    published: "公開日",
    readingTime: "読了時間",
    visualGlimpse: "フォトギャラリー",
    viewGallery: "ギャラリーを見る",
    moreArticles: "その他の記事",
    shareStory: "ストーリーを共有する",
    lovedThis: "お気に入り",
    //new 
    wordsBy: "執筆：",
    Pending: {
      backgroundText: "準備中",
      title: "コンテンツは近日公開",
      description: "現在、この記事を制作しております。公開まで今しばらくお待ちください.",
    },
  },
} as const;

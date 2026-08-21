export default {
  Metadata: {
    title: "よくある質問",
    description: "オーダーメイドのスリランカ旅行に関するよくある質問の回答をすばやく見つけることができます。",
  },
  Hero: {
    backGroundImage: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=95&w=1600&auto=format&fit=crop",
    altText: "カスタマーサポートとアシスタンス",
    eyebrow: "サポートとよくある質問",
    title: "どのようなご用件でしょうか？",
    accent: "ご用件でしょうか？",
    strapline: "オーダーメイドのスリランカ旅行に関するよくある質問の回答をすばやく見つけることができます。",
  },
  UI: {
    filterButton: "カテゴリーを絞り込む",
    sidebarTitle: "よくある質問のカテゴリー",
    searchPlaceholder: "質問を検索...",
    searchItemLabel: "質問",
    clearFilter: "フィルターをクリア",
    loadMore: "もっと見る",
    showing: "表示中",
    of: "/",
    faqs: "件のよくある質問",
  },
  Categories: {
    all: "すべて",
    "Ticketing & Visa Services": "チケット・ビザサービス",
    General: "一般",
    Booking: "予約",
    Refunds: "返金",
    Tours: "ツアー",
    Payments: "お支払い",
  },
  EmptyState: {
    backgroundText: "FAQ",
    title: "質問が見つかりません",
    buttonText: "フィルターをリセット",
    descSearchAndCategory:
      "「{category}」カテゴリーに「{query}」に一致する質問は見つかりませんでした。フィルターをクリアするか、別のキーワードをお試しください。",
    descSearchOnly:
      "「{query}」に一致する質問は見つかりませんでした。フィルターをクリアするか、別のキーワードをお試しください。",
    descCategoryOnly: "「{category}」カテゴリーには質問がありません。",
    descDefault: "条件に一致する質問は見つかりませんでした。",
  },
} as const;

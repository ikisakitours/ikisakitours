export default {
  MultiDay: {
    Metadata: {
      title: "周遊ツアー",
      description:
        "IkiSakiが厳選したスリランカ各地の特別なツアーパッケージをご紹介。歴史遺産、豊かな自然、宗教文化、美しい海岸エリアを巡る、上質な旅をお楽しみください.",
    },
    Hero: {
      badge: "周遊ツアー",
      startTitle: "スリランカ",
      HighlightTitle: "周遊",
      EndTitle: "ツアー",
      description:
        "スリランカの世界遺産や豊かな自然、伝統文化、美しい海岸線を巡る特別な旅. 厳選された旅程で、スリランカの魅力をじっくりとご堪能ください.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2400",
      alt: "スリランカの茶畑を抜ける絶景の山岳列車の旅",
    },
  },
  OneDay: {
    Metadata: {
      title: "日帰りツアー",
      description:
        "世界遺産や絶景スポット、歴史ある街並みなど、スリランカの魅力を1日で満喫。限られた時間でも、心に残る特別な体験をお楽しみいただけます.",
    },
    Hero: {
      badge: "クイックエスケープ",
      startTitle: "厳選された",
      HighlightTitle: "日帰り",
      EndTitle: "旅行",
      description:
        "すべてをたった1日で。限られた時間であっても、スリランカならではのユニークな魅力や特別な体験を満喫することができます.",
      image: "https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&q=80&w=2400",
      alt: "スリランカの茶畑を抜ける絶景の山岳列車の旅",
    },
  },
  Explorer: {
    filterPackages: "フィルター",
    searchPlaceholder: "キーワードで検索...",
    loadMore: "さらにパッケージを読み込む",
    showing: "Showing",
    of: "of",
    packages: "Packages",
    priceFilters: {
      any: "すべての価格",
      under200: "$200未満",
      "200to300": "$200 - $300",
      over300: "$300以上",
    },
    ratingFilters: {
      any: "すべての評価",
      up45: "4.5 以上",
      up48: "4.8 以上",
    },
    EmptyState: {
      backgroundText: "パッケージ",
      title: "一致する旅が見つかりません",
      searchNoResult: "「{query}」の検索結果、パッケージは見つかりませんでした.",
      filterNoResult: "選択したフィルターに該当するパッケージはありません.",
      redefine: "旅行の条件を再設定するか、フィルターをリセットしてください.",
      resetBtn: "リセットする",
    },
    Sidebar: {
      categories: "カテゴリー",
      all: "全て",
      price: "料金",
      rating: "評価",
      clearFilter: "フィルターを解除",
      clear: "クリア",
      showResults: "検索結果を表示",
    },
  },
  Card: {
    startingFrom: "〜から始める",
    details: "詳細",
  },
} as const;

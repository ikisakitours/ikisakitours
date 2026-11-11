export default {
  MultiDay: {
    Metadata: {
      title: "周遊ツアー",
      description:
        "IkiSakiが厳選したスリランカ各地の特別なツアーパッケージをご紹介。歴史遺産、豊かな自然、宗教文化、美しい海岸エリアを巡る、上質な旅をお楽しみください。",
    },
    Hero: {
      badge: "周遊ツアー",
      startTitle: "スリランカ",
      HighlightTitle: "周遊",
      EndTitle: "ツアー",
      description:
        "スリランカの世界遺産や豊かな自然、伝統文化、美しい海岸線を巡る特別な旅。 厳選された旅程で、スリランカの魅力をじっくりとご堪能ください。",
      image: "/ikisaki-images/Tours/sigiriya-rock-fortress-multiday-tour-sri-lanka.webp",
      alt: "Travelers admiring the majestic Sigiriya Rock Fortress surrounded by lush green forests during a multi-day tour in Sri Lanka",
    },
  },
  OneDay: {
    Metadata: {
      title: "日帰りツアー",
      description:
        "世界遺産や絶景スポット、歴史ある街並みなど、スリランカの魅力を1日で満喫。限られた時間でも、心に残る特別な体験をお楽しみいただけます。",
    },
    Hero: {
      badge: "クイックエスケープ",
      startTitle: "厳選された",
      HighlightTitle: "日帰り",
      EndTitle: "旅行",
      description:
        "すべてをたった1日で。限られた時間であっても、スリランカならではのユニークな魅力や特別な体験を満喫することができます。",
      image: "/ikisaki-images/Tours/galle-fort-oneday-excursion-sri-lanka.webp",
      alt: "Historic ramparts and lively streets of the UNESCO World Heritage Galle Fort during a one-day excursion in Sri Lanka",
    },
  },
  Explorer: {
    filterPackages: "フィルター",
    searchPlaceholder: "キーワードで検索。。。",
    //new
    SearchInputPackageLabel: "件のプラン",
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
      up45: "4。5 以上",
      up48: "4。8 以上",
    },
    EmptyState: {
      backgroundText: "パッケージ",
      title: "一致する旅が見つかりません",
      searchNoResult: "「{query}」の検索結果、パッケージは見つかりませんでした。",
      filterNoResult: "選択したフィルターに該当するパッケージはありません。",
      redefine: "旅行の条件を再設定するか、フィルターをリセットしてください。",
      resetBtn: "リセットする",
      noDataTitle: "ツアーはまだありません",
      noDataDescription: "新しいツアーパッケージを準備中です。後ほどもう一度ご確認ください。",
    },
    Sidebar: {
      categories: "カテゴリー",
      all: "全て",
      price: "料金",
      rating: "評価",
      clearFilter: "フィルターを解除",
      clear: "クリア",
      showResults: "検索結果を表示",
      durationDays: "期間 (日数)",
      durationHours: "期間 (時間)",
    },
  },
  Card: {
    startingFrom: "〜から始める",
    details: "詳細",
    newBadge: "新着",
    save: "{discount}% 割引",
    Badges: {
      popular: "人気",
      discounted: "割引",
      new_arrival: "新着",
      featured: "おすすめ",
    },
  },
} as const;

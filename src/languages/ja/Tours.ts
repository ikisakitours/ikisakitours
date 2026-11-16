export default {
  MultiDay: {
    Metadata: {
      title: "スリランカ周遊ツアー・世界遺産を巡るモデルコース",
      description:
        "IkiSaki Toursが厳選したスリランカ周遊プライベートツアー。シギリヤロック、キャンディ、ヌワラエリヤ、南海岸など、歴史遺産、豊かな自然、紅茶畑を専用車と専属ドライバーで巡る上質なモデルコースをご紹介します。",
    },
    Hero: {
      badge: "周遊ツアー",
      startTitle: "スリランカ",
      HighlightTitle: "周遊",
      EndTitle: "ツアー",
      description:
        "スリランカの世界遺産や豊かな自然、伝統文化、美しい海岸線を巡る特別な旅。 厳選された旅程で、スリランカの魅力をじっくりとご堪能ください。",
      image: "/ikisaki-images/Tours/sigiriya-rock-fortress-multiday-tour-sri-lanka.webp",
      alt: "緑豊かな森に囲まれた世界遺産シーギリヤ・ロック遺跡を巡るスリランカ周遊プライベートツアー",
    },
  },
  OneDay: {
    Metadata: {
      title: "スリランカ日帰りツアー・現地オプショナルツアー観光",
      description:
        "コロンボやネゴンボ発の充実したスリランカ日帰りツアー。世界遺産シギリヤロック、象の孤児院、ゴール旧市街などの人気観光地を、プライベート専用車で効率よく満喫できるオプショナルツアーです。",
    },
    Hero: {
      badge: "クイックエスケープ",
      startTitle: "厳選された",
      HighlightTitle: "日帰り",
      EndTitle: "旅行",
      description:
        "すべてをたった1日で。限られた時間であっても、スリランカならではのユニークな魅力や特別な体験を満喫することができます。",
      image: "/ikisaki-images/Tours/galle-fort-oneday-excursion-sri-lanka.webp",
      alt: "世界遺産ゴール旧市街の歴史ある要塞とコロニアルな街並みを巡るスリランカ日帰り観光ツアー",
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
    imageAlt: "{title} - スリランカツアーパッケージ | イキサキ・ツアーズ",
    Badges: {
      popular: "人気",
      discounted: "割引",
      new_arrival: "新着",
      featured: "おすすめ",
    },
  },
} as const;

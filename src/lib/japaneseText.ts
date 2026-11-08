import { loadDefaultJapaneseParser } from "budoux";

const jaParser = loadDefaultJapaneseParser();
const JA_CHARS = /[\u3040-\u30ff\u4e00-\u9fff]/;

// Prices, numbers, ranges, dates that must NEVER be split
// e.g. ¥29,000  $1,200  10〜14日間  3日  2026年11月  10:30  50%
const PROTECT =
  /([¥$€£]\s?[\d,.]+|[\d,.]+\s?(?:円|ドル|%|％)|[\d]+(?:[〜~\-–][\d]+)?\s?(?:日間|泊|日|時間|名|人|台|km|㎞|年|月|時|分)|\d{1,2}:\d{2})/g;

// Japanese character followed by English "." -> convert to "。"
const JA_DOT = /([\u3040-\u30ff\u4e00-\u9fff])\.(?=\s|$|\u200B)/g;

// Japanese character followed by English "," -> convert to "、"
const JA_COMMA = /([\u3040-\u30ff\u4e00-\u9fff]),(?=\s|[\u3040-\u30ff\u4e00-\u9fff]|$|\u200B)/g;

export function addJaBreaks<T>(node: T): T {
  if (typeof node === "string") {
    if (!JA_CHARS.test(node) || /[{<@]|https?:/.test(node)) return node;

    // 1) hide protected parts behind placeholders
    const saved: string[] = [];
    const masked = node.replace(PROTECT, (m) => {
      saved.push(m);
      return `\uE000${saved.length - 1}\uE001`;
    });

    // fix English "." and "," after Japanese text
    const fixed = masked.replace(JA_DOT, "$1。").replace(JA_COMMA, "$1、");

    // 2) budoux inserts breaks
    const broken = jaParser.parse(fixed).join("\u200B");

    // 3) put protected parts back, glued with WORD JOINER (U+2060)
    return broken.replace(/\uE000(\d+)\uE001/g, (_, i) => saved[Number(i)].split("").join("\u2060")) as T;
  }
  if (Array.isArray(node)) return node.map(addJaBreaks) as T;
  if (node && typeof node === "object") {
    return Object.fromEntries(Object.entries(node).map(([k, v]) => [k, addJaBreaks(v)])) as T;
  }
  return node;
}
// tally.js：统计，一次扫描，用 Map 查重，按首现顺序输出
import { readLine } from "./seen.js";

export function tally(lines) {
  const unique = [];
  const firsts = [];
  const counts = [];
  const seen = new Map();
  for (let index = 0; index < lines.length; index += 1) {
    const text = readLine(lines[index]);
    const slot = seen.get(text);
    if (slot === undefined) {
      seen.set(text, unique.length);
      unique.push(text);
      firsts.push(index + 1);
      counts.push(1);
    } else {
      counts[slot] += 1;
    }
  }
  return { unique, firsts, counts };
}

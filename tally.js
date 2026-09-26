// tally.js：单次扫描统计首现顺序、首现位置与出现次数（查重走映射）
import { readLine } from "./seen.js";

export function tally(lines) {
  const unique = [];
  const firsts = [];
  const counts = [];
  const indexByLine = new Map();

  lines.forEach(function (raw, i) {
    const line = readLine(raw);
    const spot = indexByLine.get(line);
    if (spot === undefined) {
      indexByLine.set(line, unique.length);
      unique.push(line);
      firsts.push(i + 1);
      counts.push(1);
    } else {
      counts[spot] += 1;
    }
  });

  return { unique: unique, firsts: firsts, counts: counts };
}

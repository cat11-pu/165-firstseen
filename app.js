// app.js：渲染结果
import { readLine } from "./seen.js";
import { tally } from "./tally.js";

export function render(spec) {
  const lines = spec.lines || [];
  const view = tally(lines);
  const counts = view.counts || [];
  return { unique: view.unique || [], firsts: view.firsts || [], counts: counts,
           count: (view.unique || []).length,
           repeats: lines.length - (view.unique || []).length,
           longest: (view.unique || []).reduce((best, item) => Math.max(best, item.length), 0) };
}

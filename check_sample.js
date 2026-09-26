import fs from "node:fs";
import { readLine } from "./seen.js";
import { tally } from "./tally.js";
import { render } from "./app.js";

// 验收断言：上面每条值收进 emit，最后与期望值逐项比对，不符就非零退出。
const __lines = [];
function emit(label, value) { __lines.push([String(label).replace(/ =$/, ""), value]); }


const spec = JSON.parse(fs.readFileSync(process.argv[2] || "sample/lines.json", "utf8"));
const view = render(spec);

emit("去重后的行 =", JSON.stringify(view.unique));
emit("首次出现位置 =", JSON.stringify(view.firsts));
emit("出现次数 =", JSON.stringify(view.counts));
emit("去重后条数 =", view.count);
emit("重复条数 =", view.repeats);
emit("最长条长度 =", view.longest);
emit("空行的错误码 =", spec.line_error_code);


// ---- 异常路径探针：真调用实现，看它报出什么码（不是从样例里抄）----
try {
  tally(["a", "   "]);
  emit("空行的错误码", "没有报错");
} catch (error) {
  emit("空行的错误码", error && error.code ? error.code : String(error.message));
}


// ---- 期望值（参考模型算出，与题面给的验收数值一致）----
const EXPECTED = {
  "去重后的行": [
    "beta",
    "alpha",
    "gamma"
  ],
  "首次出现位置": [
    1,
    2,
    4
  ],
  "出现次数": [
    3,
    2,
    1
  ],
  "去重后条数": 3,
  "重复条数": 3,
  "最长条长度": 5,
  "空行的错误码": "E_EMPTY_LINE"
};
// 有的值在收进来之前已经 stringify 过，比较前先试着解析回来，避免类型错配把正确实现判成不过。
function __same(got, want) {
  if (typeof got === "string") {
    try { const parsed = JSON.parse(got); if (JSON.stringify(parsed) === JSON.stringify(want)) return true; } catch (error) { /* 不是 JSON 就按原文比 */ }
  }
  return JSON.stringify(got) === JSON.stringify(want);
}
let __bad = 0;
for (const [label, want] of Object.entries(EXPECTED)) {
  const found = __lines.find((pair) => pair[0] === label);
  if (!found) { __bad += 1; console.log("缺失验收项 " + label); continue; }
  const got = found[1];
  if (__same(got, want)) { console.log("一致 " + label + " = " + JSON.stringify(got)); }
  else { __bad += 1; console.log("不一致 " + label + " 期望 " + JSON.stringify(want) + " 实际 " + JSON.stringify(got)); }
}
console.log("验收项 " + (Object.keys(EXPECTED).length - __bad) + "/" + Object.keys(EXPECTED).length + " 通过");
process.exit(__bad === 0 ? 0 : 1);

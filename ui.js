// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "行 " + (spec.lines || []).length + " 条，点统计看去重与首次位置。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.unique.forEach(function (line, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = (spot + 1) + ".";
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip ok";
      mark.textContent = line === "" ? "空行" : line;
      row.appendChild(mark);
      const pos = document.createElement("span");
      pos.className = "chip";
      pos.textContent = "首现第 " + view.firsts[spot] + " 条，共 " + view.counts[spot] + " 次";
      row.appendChild(pos);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "去重后 " + view.count + " 条，重复 " + view.repeats + " 条";
    parts.log.textContent = "最长条长度 " + view.longest;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "统计首次出现";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一条重复行";
  addButton.addEventListener("click", function () {
    spec.lines = (spec.lines || []).concat(["beta"]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一条";
  dropButton.addEventListener("click", function () {
    spec.lines = (spec.lines || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一行";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "gamma";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { lines: (spec.lines || []).concat([box.value]) }));
      const spot = view.unique.indexOf(box.value);
      parts.out.textContent = box.value + " 现在第 " + (spot + 1) + " 个，共 " + view.counts[spot] + " 次";
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看重复条数";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "重复 " + view.repeats + " 条，去重后 " + view.count + " 条";
  });
  parts.controls.appendChild(readButton);

  draw();
}

// seen.js：读一行——去掉首尾空白，去空白后为空报 E_EMPTY_LINE
export function readLine(line) {
  const text = (line == null ? "" : String(line)).trim();
  if (text === "") {
    const error = new Error("去空白后为空行");
    error.code = "E_EMPTY_LINE";
    throw error;
  }
  return text;
}

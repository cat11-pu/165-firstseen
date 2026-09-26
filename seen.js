// seen.js：看一行，去首尾空白；去空白后为空报 E_EMPTY_LINE
export function readLine(line) {
  const text = String(line).trim();
  if (text === "") {
    const error = new Error("empty line");
    error.code = "E_EMPTY_LINE";
    throw error;
  }
  return text;
}

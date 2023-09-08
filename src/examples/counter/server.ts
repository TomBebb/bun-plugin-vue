import path from "path"
import fs from "fs/promises"
const root = path.join(import.meta.dir, "dist")

console.log("server root", root)
const isLive = process.env.WATCH != null
if (isLive)
console.log("Listening to server changes...")
const contentTypes = {
  "js": "text/javascript",
  "ts": "text/typescript",
  html: "text/html"
}

Bun.serve({
    
  async fetch(req) {
    let filePath = root + new URL(req.url).pathname;
    if (filePath === "/")
    return "/index.html"

    if (isLive) {
      console.log({filePath})
      const content = await fs.readFile(filePath);
      const ext = path.extname(filePath).substring(1)
      console.log(contentTypes[ext])
      return new Response(content, {headers: {"Content-Type": contentTypes[ext]}})
    }
    const file = Bun.file(filePath);
    console.log({filePath, url: req.url})
    return new Response(file);
  },
 });

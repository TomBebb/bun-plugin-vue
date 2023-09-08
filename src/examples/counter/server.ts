import path from "path"
const root = path.join(import.meta.dir, "dist")

console.log("server root", root)
Bun.serve({
    
  async fetch(req) {
    const filePath = root + new URL(req.url).pathname;
    const file = Bun.file(filePath);
    console.log({filePath, url: req.url})
    return new Response(file);
  },
 });

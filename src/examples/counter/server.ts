import serveStatic from "serve-static-bun";
import path from "path"
const root = path.join( path.relative( process.cwd(),import.meta.dir,), "dist")
Bun.serve({
    
  async fetch(req) {
    const filePath = root + new URL(req.url).pathname;
    const file = Bun.file(filePath);
    return new Response(file);
  },
 });

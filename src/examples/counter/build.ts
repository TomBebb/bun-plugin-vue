import vuePlugin from "./../../";
import path from "path"
import fs from "fs/promises"
const root = import.meta.dir
const outDir = path.join(root, "dist")
console.log("build root", root)
await Bun.build({
    root,
    target: "browser",
    plugins: [
        vuePlugin
    ],
    entrypoints: [
        path.join(root, "main.ts")
    ],
    outdir: outDir,
    splitting: true,
})

const indexPath = "index.html"
const compIndexPath = path.join(outDir, indexPath)
await fs.copyFile(path.join(root, indexPath), compIndexPath)

const content = await fs.readFile(compIndexPath, "utf8")

await fs.writeFile(compIndexPath ,content.replaceAll(".ts", ".js"))
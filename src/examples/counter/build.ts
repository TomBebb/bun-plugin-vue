import vuePlugin from "./../../";
import path from "path"

await Bun.build({
    root: import.meta.dir,
    target: "browser",
    plugins: [
        vuePlugin
    ],
    entrypoints: [
        path.join(import.meta.dir, "main.ts")
    ],
    outdir: "dist",
    splitting: true,
})
import vuePlugin from "./../../";

await Bun.build({
    target: "browser",
    plugins: [
        vuePlugin
    ],
    entrypoints: [
        "main.ts"
    ],
     outdir: "dist",
     splitting: true,
})
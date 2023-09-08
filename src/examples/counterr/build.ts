import vuePlugin from "./../../";

await Bun.build({
    plugins: [
        vuePlugin
    ],
    entrypoints: [
        "main.ts"
    ],
     outdir: "dist",
     splitting: true,
      minify: true,
})
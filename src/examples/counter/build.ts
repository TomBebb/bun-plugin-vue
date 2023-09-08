import vuePlugin from "./../../";
import path from "path"
import fs from "fs/promises"
import { EventEmitter } from "stream";
const root = import.meta.dir
const outDir = path.join(root, "dist")
console.log("build root", root)


async function build() {
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

    await fs.writeFile(compIndexPath, content.replaceAll(".ts", ".js"))
}

await build()
const WS_PORT = 3001;

const emitter = new EventEmitter()
async function setupWebsocket() {


    console.log("Setting up websocket on port: " + WS_PORT)
    await Bun.serve({
        port: WS_PORT,
        fetch(req, server) {
            const success = server.upgrade(req);
            if (success) {
                // Bun automatically returns a 101 Switching Protocols
                // if the upgrade succeeds
                return undefined;
            }

            // handle HTTP request normally
            return new Response("Hello world!");
        },
        websocket: {
            message(ws, msg) {
                console.log("GOT ws message", msg)
            },
            async open(ws) {
                ws.sendText("demo")
                console.log("websocket open " + WS_PORT)
                emitter.addListener("change", () => ws.sendText("update"))
            }, // a socket is opened
        },
    });
    console.log("Set up websocket on port: " + WS_PORT)

}
async function listenFileChanges() {

    for await (const part of fs.watch(root, { recursive: true })) {
        if (part.filename.startsWith("dist"))
            continue;

        await build()
        console.log("rebuilt!")
        emitter.emit("change")
    }
}
if (process.env.WATCH) {
    console.log("Watching for file changes")
    await Promise.all([setupWebsocket(), listenFileChanges()])
    await setupWebsocket()
}
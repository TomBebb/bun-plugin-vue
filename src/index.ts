import type { BunPlugin, Loader } from "bun";
import fs from "fs/promises"
import { compileStyleAsync, compileScript, parse } from 'vue/compiler-sfc';
import path, { basename } from "path"
import process from "process";


const makeId = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

let lang: Loader = "js"
const vuePlugin: BunPlugin = {
    name: "Vue Loader",
    setup(build) {
        build.onLoad({ filter: /.*\.vue/ }, async args => {
            const content = await fs.readFile(args.path, "utf8")

            const parsed = parse(content, { filename: args.path })
            const id = makeId(5);
            const ssr = false
            console.log("Compile stlye")

            let style = ""
            await Promise.all(parsed.descriptor.styles.map(async s => {
                const comp = await compileStyleAsync({
                    filename: args.path,
                    source: s.content,
                    scoped: s.scoped,
                    id
                })
                style += comp.code

            }))


            let isProd = process.env.NODE_ENV == "development" ? false : true;
            const scrSetup = parsed.descriptor.scriptSetup
            if (scrSetup?.setup) {
                //console.log('attrs', scrSetup?.attrs)
                if (scrSetup?.attrs?.lang === "ts") {
                    lang = "ts"
                }
                // vue setup
                let { content: code2 } = compileScript(parsed.descriptor, {
                    id,
                    inlineTemplate: true, // SSR friendly
                    isProd,
                    templateOptions: {
                        filename: basename(args.path),
                        ssr,
                        ssrCssVars: []
                    }
                });
                code += code2;
            }


            return {
                loader: lang,

                contents: `${code};const s=document.createElement("style");s.innerText='todo';document.onload=()=>document.body.appendChild(s)`,
            }
        })
    },
}
export default vuePlugin
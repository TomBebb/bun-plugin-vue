import { createApp } from "vue";
import App from "./App.vue";

console.log("create vue app")

createApp(App)
    .mount("#app");

const devSocket = new  WebSocket("ws://localhost:3001")
devSocket.onmessage =  (e => {
    if (e.data === "update") {
        location.reload()
    }
})
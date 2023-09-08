<script setup lang="ts">
import { ref } from 'vue';
import MyBtn from "./components/MyBtn.vue"
 let counter = ref(0)

function increment() {
    counter.value++
}
function decrement() {
    counter.value--
}

</script>

<template>
    <div>
        {{ counter }}
    </div>
    <MyBtn @click="increment" content="+" class="pos"/>
    <MyBtn @click="decrement" content="-" class="neg"/>
</template>
<style> 
.pos {
    background-color: green;
    color: white;
}
 
.neg {
    background-color: red;
    color: white;

    }
</style>
<script setup lang="ts">
import { ref } from 'vue';

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
    <button @click="increment" class="pos">+</button>
    <button @click="decrement" class="neg">-</button>
</template>
<style> 
.pos {
    background-color: green;
}

.neg {
    background-color: red;
}
</style>
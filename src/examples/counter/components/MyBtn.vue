<script setup lang="ts">
    defineProps<{
        content: string
    }>()

    
</script>

<template>
    <button class="my-btn" v-bind="$attrs">
        {{content }}

    </button>
</template>

<style>
.my-btn {
    padding: 1.2vw;
    font-size: 0.8vw;
    border-radius: 0.5vw;
    width: 2vw;
    text-align: center;
    font-weight: bold;
}
</style>
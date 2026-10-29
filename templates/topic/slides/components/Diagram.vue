<script setup lang="ts">
// <Diagram name="example" /> inlines ../diagrams/<name>.svg (shared with the scroll site).
const all = import.meta.glob("../../diagrams/*.svg", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const props = defineProps<{ name: string }>();
const svg = Object.entries(all).find(([p]) => p.endsWith(`/${props.name}.svg`))?.[1] ?? "";
if (!svg) console.warn(`Diagram "${props.name}" not found in diagrams/`);
</script>

<template><div class="slide-diagram" v-html="svg" /></template>

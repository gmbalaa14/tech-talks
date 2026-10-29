<script setup lang="ts">
// <Fact k="specRevision" /> prints a value from ../facts.json (the same file the scroll site reads).
import facts from "../../facts.json";
const props = defineProps<{ k: string }>();
const value = (facts as Record<string, unknown>)[props.k];
if (value === undefined) console.warn(`<Fact k="${props.k}"> is not defined in facts.json`);
</script>

<template><strong>{{ value }}</strong></template>

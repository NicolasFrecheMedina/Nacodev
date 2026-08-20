<script setup lang="ts">
defineProps<{ id: string; title: string }>()
</script>

<template>
  <section :id="id" class="scene" :aria-labelledby="`${id}-title`">
    <h1 :id="`${id}-title`">{{ title }}</h1>
  </section>
</template>

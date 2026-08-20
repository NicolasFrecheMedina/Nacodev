<script setup lang="ts">
import { useI18n } from '@/i18n'
import SceneShell from './SceneShell.vue'
const { t } = useI18n()
</script>
<template><SceneShell id="exploration" :title="t('scenes.exploration')" /></template>

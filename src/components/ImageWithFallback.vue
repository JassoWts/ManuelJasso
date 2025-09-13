<template>
  <img
    :src="currentSrc"
    :alt="alt"
    :class="imgClass"
    loading="lazy"
    @error="onError"
    :data-primary="src"
    :data-fallback="fallback"
  />
</template>
<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  src: { type: String, required: true },
  fallback: { type: String, required: false, default: '' },
  alt: { type: String, default: '' },
  imgClass: { type: String, default: '' }
});

const currentSrc = ref(props.src);

function onError() {
  if (props.fallback && currentSrc.value !== props.fallback) {
    console.warn('[ImageWithFallback] swapping to fallback', props.src, '->', props.fallback);
    currentSrc.value = props.fallback;
  } else {
    console.error('[ImageWithFallback] failed to load', currentSrc.value);
  }
}

watch(() => props.src, (n) => { currentSrc.value = n; });
</script>

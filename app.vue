<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'ja' },
  link: [{ rel: 'icon', type: 'images/png', href: '/images/favicon.png'}],
  titleTemplate: '%s --無料お悩み相談「anydan(エニダン)」',
})
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

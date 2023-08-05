<template>
  <v-app class="ap">
    <HeaderBar />
    <main>
      <slot></slot>
    </main>
    <FooterBar />
  </v-app>
</template>

<style>
.ap {
  background-color: #F5F5F5
}
</style>

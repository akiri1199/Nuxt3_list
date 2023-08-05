<script setup lang='ts'>
import { mdiHome, mdiAccount, mdiPlus,mdiTextBoxEditOutline } from '@mdi/js'
  const currentUser = useUser()
</script>

<template>
  <v-footer
    app
    fixed
    color="#E0E0E0"
    class="justify-center"
  >
  <ClientOnly>
    <div v-if="currentUser">
      <v-row justify="center">
        <v-col cols="12">
          <v-btn
            class="mx-2"
            icon
            color="#FFFFFF00"
            to="/"
          >
          <v-icon :icon="mdiHome" />
          </v-btn>
          <v-btn
            class="mx-2"
            icon
            color="#FFFFFF00"
            to="/"
          >
          <v-icon :icon="mdiPlus" />
          </v-btn>
          <v-btn
            class="mx-2"
            icon
            color="#FFFFFF00"
            to="/"
          >
          <v-icon :icon="mdiAccount" />
          </v-btn>
          <v-btn
            class="mx-2"
            icon
            color="#FFFFFF00"
            to="/tetote/top"
          >
          <v-col align="center">
            <v-icon :icon="mdiTextBoxEditOutline" class="mt-n2" />
            <p class="text-caption mt-n2">
              掲示板
            </p>
          </v-col>
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <div v-else-if="!currentUser">
      <v-row justify="center" class="mt-1">
        <v-btn
          variant="text"
          size="x-small"
          to="/"
        >
          サービス利用規約
        </v-btn>
        <v-btn
          variant="text"
          size="x-small"
          to="/"
        >
          プライバシーポリシー
        </v-btn>
        <v-btn
          variant="text"
          size="x-small"
          to="/"
        >
          お問い合わせ
        </v-btn>
          <v-col class="text-center mt-n1" cols="12">
            <v-btn variant="text" size="small" class="font-weight-black mt-n3" style="text-transform: none;" to="/company">
              nobu
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </ClientOnly>
    </v-footer>
</template>

<style scoped>
.icon {
  color:#424242;
}
</style>
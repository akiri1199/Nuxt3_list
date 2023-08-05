<script setup lang='ts'>
import { mdiHome, mdiLogin, mdiAccountPlus, mdiDotsVertical, mdiAccount, mdiHelp, mdiPlus, mdiForum, mdiTextBoxEditOutline, mdiEmailEditOutline, mdiLogout, mdiKey, mdiBellOutline } from '@mdi/js'
import { getFirestore, doc, updateDoc } from 'firebase/firestore'
const currentUser = useUser()
const router = useRouter()
  const { logOut } = useLogout()
  const submit = async () => {
    await logOut()
  }
</script>

<template>
    <v-app-bar
      :elevation="0"
      density="compact"
      color="#E0E0E0"
    >
      <v-btn
        class="ma-3"
        icon
        color="#212121"
        to="/"
      >
      <v-icon :icon="mdiHome" />
      </v-btn>
      <v-spacer />

      <ClientOnly>
      <div v-if="!currentUser">
        <v-row justify="end">
          <v-col>
            <v-btn
              stacked
              class="mr-n5"
              variant="text"
              color="#212121"
              size="small"
              to="/users/login"
            >
              <v-icon :icon="mdiLogin" />
                ログイン
              </v-btn>
            <v-btn
              stacked
              class="mr-1"
              variant="text"
              color="#212121"
              size="small"
              to="/users/new"
            >
            <v-icon :icon="mdiAccountPlus" />
                会員登録
              </v-btn>

          </v-col>
        </v-row>
      </div>

      <div v-else-if="currentUser">
        <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ props }">
            <v-btn
              icon
              v-bind="props"
              class="mr-4"
              color="grey darken-2"
            >
            <v-icon :icon="mdiDotsVertical" />
            </v-btn>
          </template>

          <v-list>
            <v-list-subheader>menu</v-list-subheader>
              <v-list-item to="/">
                <template v-slot:prepend>
                  <v-icon :icon="mdiAccount" />
                </template>
                  <v-list-item-title class="font-weight-subtitle">マイページ</v-list-item-title>
              </v-list-item>
              <v-list-item to="/about">
                <template v-slot:prepend>
                  <v-icon :icon="mdiHelp" />
                </template>
                  <v-list-item-title>エニダンとは</v-list-item-title>
              </v-list-item>

              <v-list-item to="/">
                <template v-slot:prepend>
                  <v-icon :icon="mdiPlus" />
                </template>
                  <v-list-item-title>相談する</v-list-item-title>
              </v-list-item>

              <v-list-item to="/">
                <template v-slot:prepend>
                  <v-icon :icon="mdiForum" />
                </template>
                  <v-list-item-title>相談にのる</v-list-item-title>
              </v-list-item>

              <v-list-item to="/tetote/top">
                <template v-slot:prepend>
                  <v-icon :icon="mdiTextBoxEditOutline" />
                </template>
                <v-list-item-title>
                  お悩み掲示板
                </v-list-item-title>
              </v-list-item>

              <v-list-item to="/">
                <template v-slot:prepend>
                  <v-icon :icon="mdiEmailEditOutline" />
                </template>
                  <v-list-item-title>お問い合わせ</v-list-item-title>
              </v-list-item>

              <v-list-item @click="submit">
                <template v-slot:prepend>
                  <v-icon :icon="mdiLogout" />
                </template>
                  <v-list-item-title>ログアウト</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </ClientOnly>
  </v-app-bar>
</template>

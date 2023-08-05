<script setup lang="ts">
import { mdiArrowLeft, mdiCursorDefaultClick } from '@mdi/js'
  useSeoMeta({
    title: 'エニダンについて',
    description: 'モヤモヤしたら、アドバイザーに相談を。相談を重ねることでの変化を試してみて。10分間の無料応援チャットサービス、anydan(エニダン)。',
    ogImage: 'https://anydan.link',
  })
  useHead({
  title: 'エニダンについて',
  meta: [
    {
      name: 'description',
      content: 'モヤモヤしたら、アドバイザーに相談を。相談を重ねることでの変化を試してみて。10分間の無料応援チャットサービス、anydan(エニダン)。',
    },
  ],
});
</script>
<template>
  <v-container>
      <v-row justify="center">
        <v-col cols="12" xs="12" sm="10" md="7" lg="7" align="center">
          <v-row>
            <v-btn icon class="mt-12 ml-3 float-start" elevation="0" color="#FFFFFF00">
              <v-icon @click="$router.go(-1)" :icon="mdiArrowLeft" />
            </v-btn>
          </v-row>
          <p
            class="font-weight-black mt-2"
            style="font-size:17px; text-align:center;"
          >
            anydan(エニダン)とは？
          </p>

          <v-col cols="10" style="text-align:left;">
          <p class="text-subtitle-2 font-weight-bold mt-2">
            相談者の悩みに<span class="ext-no-wrap bg-yellow-accent-3">10分間</span>全力で向き合うサービスです。<br>
          </p>
          <p class="text-subtitle-2 font-weight-bold">
            <span class="text-no-wrap bg-yellow-accent-3">相談者は</span>悩みや話したいことを投稿し、アドバイザーの応募を待ちます。
          </p>
          <p class="text-subtitle-2 font-weight-bold">
            <span class="text-no-wrap bg-yellow-accent-3">アドバイザーは</span>相談者の投稿から応募します。
          </p>
          <p class="text-subtitle-2 font-weight-bold">
            アドバイザー2名が集まり次第、10分間限定の<span class="text-no-wrap bg-yellow-accent-3">特設チャットルーム</span>がオープン。
          </p>
          <p class="text-subtitle-2 font-weight-bold">
            相談者にもアドバイザーにも、<span class="text-no-wrap bg-yellow-accent-3">どちらにも</span>なることができます！
          </p>
          <p class="text-caption mt-5">
            ※本サービスはβ版です
          </p>
          <v-row justify="end">
          <v-img
            class=""
            max-width="100"
            height="auto"
            style="margin-top:-30px;"
            src="/images/ouendan.png"
          />
        </v-row>
      </v-col>
        <v-row justify="center">
          <v-col cols="10" class="mt-2 mb-2">
            <v-btn
              density="compact"
              height="35"
              block
              color="#AA00FF"
              variant="outlined"
              class="font-weight-bold"
              to="/"
              style="border-radius:10px;"
            >
              相談の流れ
              <v-icon :icon="mdiCursorDefaultClick" />
            </v-btn>
          </v-col>

          <v-col cols="10" class="justify-center mt-n6">
            <v-btn
              density="compact"
              height="35"
              block
              variant="outlined"
              color="#00B0FF"
              class="font-weight-bold"
              to="/"
              style="border-radius:10px;"
            >
              アドバイザーの流れ
              <v-icon :icon="mdiCursorDefaultClick" />
            </v-btn>
          </v-col>
          <v-col cols="10" class="justify-center mt-n4">
            <v-btn
              density="compact"
              height="35"
              block
              variant="outlined"
              color="#FF6F00"
              class="font-weight-bold"
              to="/tetote/top"
              style="border-radius:10px;"
            >
              無料お悩み掲示板はコチラ
              <v-icon :icon="mdiCursorDefaultClick" />
            </v-btn>
          </v-col>
        </v-row>

    <v-row justify="center" class="mb-16">
      <v-col cols="11" align="left">
          <v-list style="background-color:#FFFFFF00;">
            <v-list-subheader>menu</v-list-subheader>
              <v-list-item to="/" style="color:#424242">
                  <v-list-item-title class="text-body-2">
                    ・ サービス利用規約
                  </v-list-item-title>
              </v-list-item>
              <v-list-item to="/" style="color:#424242">
                  <v-list-item-title class="text-body-2">
                    ・ プライバシーポリシー
                  </v-list-item-title>
              </v-list-item>
              <v-list-item to="/" style="color:#424242">
                  <v-list-item-title class="text-body-2">
                    ・ お問い合わせ
                  </v-list-item-title>
              </v-list-item>
              <v-list-item to="/" style="color:#424242">
                  <v-list-item-title class="text-body-2">
                    ・ 運営会社
                  </v-list-item-title>
              </v-list-item>
          </v-list>
      </v-col>
    </v-row>
  </v-col>
      </v-row>
  </v-container>
</template>
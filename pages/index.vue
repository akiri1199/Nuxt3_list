<script setup lang='ts'>
import { mdiTruck, mdiCursorDefaultClick } from '@mdi/js'
  const currentUser = useUser()
  useHead({
  title: 'anydan',
  meta: [
    {
      name: 'description',
      content: '無料お悩み相談サイト「anydan(エニダン)」のトップページです。',
    },
  ],
});
</script>

<template>
  <v-container>
    <v-row justify="center" class="mb-10">
      <v-col cols="12" xs="12" sm="12" md="11" lg="11" align="center">
          <div v-if="currentUser">
            <LoggedInTop />
          </div>

          <div v-else>
            <LoggedOutTop />
          </div>

                <v-row justify="center" class="mt-n10">
                  <v-col cols="12" xs="10" sm="8" md="7" lg="7">
                    <v-btn
                      density="compact"
                      variant="outlined"
                      height="35"
                      width="95%"
                      color="#AA00FF"
                      class="font-weight-bold mt-n5"
                      to="/"
                    >
                      相談の流れ
                        <v-icon :icon="mdiCursorDefaultClick" />
                    </v-btn>
                  </v-col>
                  <v-col cols="12" xs="10" sm="8" md="7" lg="7">
                    <v-btn
                      density="compact"
                      variant="outlined"
                      height="35"
                      width="95%"
                      color="#00B0FF"
                      class="font-weight-bold mt-n5"
                      to="/"
                    >
                      アドバイザーの流れ
                      <v-icon :icon="mdiCursorDefaultClick" />
                    </v-btn>
                  </v-col>
                </v-row>

                <v-row v-if="currentUser" justify="center">
                  <v-col cols="6" xs="6" sm="4" md="3" lg="3">
                    <v-btn
                      color="#AA00FF"
                      height="50"
                      block
                      elevation="3"
                      class="text-white font-weight-black"
                      to="/"
                      style="border-radius:20px"
                    >
                      相談する！
                    </v-btn>
                  </v-col>

                  <v-col cols="6" xs="6" sm="4" md="3" lg="3">
                    <v-btn
                        color="#00B0FF"
                        height="50"
                        block
                        elevation="3"
                        class="text-white font-weight-black"
                      to="/"
                      style="border-radius:20px"
                    >
                      相談にのる！
                    </v-btn>
                  </v-col>
                </v-row>


              <v-row justify="center" class="mt-5">
                <v-col cols="1">
                  <p class="ml-2 font-weight-black">＼</p>
                </v-col>
                <v-col cols="7" xs="5" sm="4" md="3" lg="3">
                  <p class="title font-weight-black ext-no-wrap bg-light-blue-lighten-5">
                    What's anydan？
                  </p>
                </v-col>
                <v-col cols="1">
                  <p class="ml-n5 font-weight-black"> ／</p>
                </v-col>
              </v-row>
              <v-row justify="center" class="mt-5 mb-16">
                <v-col cols="11" xs="9" sm="8" md="7" lg="7" align="left">
                  <v-btn
                    variant="text"
                    color="#424242"
                    elevation="0"
                    height="50"
                    class="font-weight-bold"
                    to="/tetote/top"
                    style="border-radius:10px;"
                  >
                  <span style="color:#00B0FF;">●</span>　無料お悩み掲示板
                  </v-btn>
                </v-col>
                <v-col cols="11" xs="9" sm="8" md="7" lg="7" align="left">
                  <v-btn
                    variant="text"
                    color="#424242"
                    elevation="0"
                    height="50"
                    class="font-weight-bold mt-n5"
                    to="/about"
                    style="border-radius:10px;"
                  >
                  <span style="color:#00B0FF;">●</span>　エニダンとは？
                  </v-btn>
                </v-col>
                <v-col cols="11" xs="10" sm="8" md="7" lg="7" align="left">
                  <v-btn
                    color="#424242"
                    variant="text"
                    elevation="0"
                    height="50"
                    class="font-weight-bold mt-n5"
                    to="/"
                    style="border-radius:10px; text-transform: none"
                  >
                  <span style="color:#00B0FF;">●</span>　よくある質問
                  </v-btn>
                </v-col>
              </v-row>
          </v-col>
        </v-row>
  </v-container>
</template>

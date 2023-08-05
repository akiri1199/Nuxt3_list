<script setup lang='ts'>
import { mdiTruck } from '@mdi/js'
  const currentUser = useUser()
</script>

<template>
  <v-container>
    <v-row justify="center" class="mb-10">
      <v-col cols="12" xs="12" sm="12" md="11" lg="11" align="center">
            <v-row justify="center" class="mt-10">
              <v-col align="center">
                <v-img
                  class="mb-n8 mt-n6"
                  max-width="350"
                  height="auto"
                  alt="エニダントップ"
                  sizes="sm:100vw md:50vw lg:400px"
                  format="webp"
                  Cache-Control: max-age=31536000
                  src="/images/topmain.png"
                />

                <v-col cols="12" xs="12" sm="8" md="6" lg="6">
                  <v-card
                    elevation="5"
                    min-height="145"
                    max-height="700"
                    class="overflow-y-auto mt-n2 pb-5"
                    style="border-radius:10px;"
                  >
                    <v-card-title class="font-weight-black mt-n1 ml-n2" color="#424242" style="font-size:15px; text-align:left;">
                    ＼ <span class="text-no-wrap bg-yellow-accent-3">相談にのる</span> ／
                    </v-card-title>
                      <div>
                        <v-row justify="center">
                          <v-card-subtitle class="justify-center font-weight-bold mt-6" style="color:#212121;">
                            現在募集中の相談はありません<br>
                              <v-row justify="end" class="mt-1 pr-9 mb-10">
                                <span style="color:#212121;">........</span>
                                <v-icon :icon="mdiTruck" />
                                <v-icon :icon="mdiTruck" />
                                <v-icon :icon="mdiTruck" />
                              </v-row>
                          </v-card-subtitle>
                        </v-row>
                      </div>
                    </v-card>
                  </v-col>
              </v-col>
            </v-row>

          </v-col>
        </v-row>
  </v-container>
</template>

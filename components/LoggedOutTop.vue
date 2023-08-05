<script setup lang='ts'>
import { mdiTruck } from '@mdi/js'
</script>

<template>
  <v-container>
    <v-row justify="center" class="mb-10">
      <v-col cols="12" xs="12" sm="12" md="11" lg="11" align="center">
        <v-row justify="center" class="mt-10 mb-5">
          <v-col align="center">
            <v-img max-width="400px" height="auto" alt="エニダントップ" format="webp" src="/images/top.png" />
            <v-row justify="center">
              <v-col cols="6" xs="6" sm="4" md="4" lg="4">
                <v-btn color="#AA00FF" height="100" block elevation="3" class="text-white font-weight-black"
                  to="/users/login" style="border-radius:20px; font-size:19px;">
                  相談する！
                </v-btn>
              </v-col>

              <v-col cols="6" xs="6" sm="4" md="4" lg="4">
                <v-btn color="#00B0FF" height="100" block elevation="3" class="text-white font-weight-black" to="/"
                  style="border-radius:20px; font-size:19px;">
                  相談にのる！
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

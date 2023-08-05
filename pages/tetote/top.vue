<script setup lang='ts'>
import { mdiArrowRight, mdiRefresh, mdiCursorDefaultClick } from '@mdi/js'
import { getFirestore, collection, where, query, orderBy, getDocs, limit } from 'firebase/firestore'
type OnayamiList = {
  id:any
  content: any
  userName: any
  status: any
  created_at: any
  year: any
  month: any
  date: any
  hour: any
  min: any
}
const currentUser = useUser()
const count = ref()
const { data:onayamiList, refresh } = await useAsyncData( async () => {
  const q = query(collection(getFirestore(), 'posts'),orderBy('created_at', 'desc'))
  const onayami:OnayamiList[] = []
  const querySnapshot = await getDocs(q)
  const length = querySnapshot.docs.length
  count.value = length
  querySnapshot.forEach((doc:any) => {
      onayami.push({
        id: doc.id,
        userName: doc.data().userName,
        content: doc.data().content,
        status: doc.data().status,
        created_at: doc.data().created_at,
        year: doc.data().year,
        month: doc.data().month,
        date: doc.data().date,
        hour: doc.data().hour,
        min: doc.data().min,
      })
    })
  return onayami
}, {
  watch: [count]
})
  const array = ref(onayamiList)
  const content = ref('')
  const alert = ref<boolean>(false)
  const testForm = ref('') as any
  const { makeOnayami } = useNewOnayami() as any
  const submit = () => {
    if (content.value !== '') {
        makeOnayami(content.value, currentUser.value)
        alert.value = true
      }
      content.value = ''
    if (alert.value === true) {
      setTimeout(() => { alert.value = false }, 1500)
    }
  }
useSeoMeta({
  title: 'みんなのお悩み --無料お悩み掲示板「anydan(エニダン)」',
  description: '無料お悩み掲示板',
  ogImage: 'https://anydan.link',
})
</script>

<template>
  <v-container>
  <v-row justify="center">
    <v-col cols="11" xs="12" sm="10" md="8" lg="8" align="center" style="margin-top:100px">
      <p class="mt-n12 mb-8 font-weight-midium" style="text-align:center; color:#EF9A9A">お悩み相談 無料掲示板</p>
      <p
        class="font-weight-black mb-n8"
        style="font-size:17px; text-align:left; color:#E57373;"
      >
        どんなお悩みがありますか？
      </p>
        <v-form ref="testForm" class="pt-6 mt-16" @submit.prevent="submit">
          <v-textarea
            v-model="content"
            label="お悩み"
            filled
            rows="1"
            auto-grow
            class="font-weight-medium mt-n12"
            color="#263238"
            style="text-align:left;"
          />
          <v-row>
            <v-col align="right">
              <v-btn
                color="#E57373"
                elevation="10"
                class="text-white font-weight-bold mt-n4 mb-2 mt-2"
                style="border-radius:10px;"
                type="submit"
                @click="refresh"
              >
                相談する
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>

  <v-row v-if="alert === true" class="mt-n16">
        <v-col align="center">
        <v-alert
          type="success"
          color="#E57373"
          density="compact"
          width="280px"
          :value="alert"
          title="投稿しました！"
          class="text-white alert"
          style="border-radius:10px;"
        >
        </v-alert>
      </v-col>
      </v-row>

  
      <v-row v-if="currentUser" justify="center">
        <v-col cols="11" xs="12" sm="10" md="8" lg="8" align="center">
          <v-btn block color="#FFEBEE" variant="outlined" class="mt-2 pt-1 mb-4 justify-center font-weight-bold" style="border-radius:10px; color:#E57373; text-transform: none;" to="/tetote/myList">
            My投稿一覧
            <v-icon :icon="mdiCursorDefaultClick" />
          </v-btn>
        </v-col>
      </v-row>

  <v-row justify="center">
    <v-col cols="11" xs="12" sm="10" md="8" lg="8" align="center">
      <p
        class="font-weight-black"
        style="font-size:17px; text-align:left; color:#E57373;"
      >
        みんなのお悩み
      </p>
        <v-btn class="float-end mt-n8" color="#FAFAFA" icon @click="refresh">
          <v-icon :icon="mdiRefresh" />
        </v-btn>
      <v-row justify="center" class="mt-1 mb-16">
        <v-col
          cols="12"
          v-for="onayami in array"
          :key="onayami.id"
        >
        <v-card style="border-radius:10px;">
          <v-row class="float-end mt-1 mr-1">
            <v-btn
              color="#E57373"
              class="font-weight-black text-white"
              :icon="mdiArrowRight"
              :to="`/tetote/posts/${onayami.id}`"
            >
            </v-btn>
          </v-row>
          <v-card-text class="mt-n1" style="font-size:14px; text-align:left;">
            ■ {{ onayami.year }}/{{ onayami.month }}/{{ onayami.date }} {{ onayami.hour }}:{{ onayami.min }}
          </v-card-text>
          <v-card-text class="mt-n7" style="font-size:14px; text-align:left;">
            {{ onayami.userName }}
          </v-card-text>
          <v-card class="mb-3 mt-n6 css" elevation="0" color="#FFFFFF00">
            <v-card-text class="text-subtitle-2 font-weight-bold" align="left">
              {{ onayami.content }}
            </v-card-text>
          </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</v-container>
</template>

<style>
.css {
  white-space: pre-line;
}
</style>
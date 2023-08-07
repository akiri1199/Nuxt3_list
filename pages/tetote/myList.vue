<script setup lang='ts'>
import { mdiArrowLeft, mdiRefresh, mdiChevronDoubleRight } from '@mdi/js'
import { getFirestore, collection, orderBy, query, getDocs, where } from 'firebase/firestore'
const currentUser = useUser()
type Post = {
  id: any
  content: any
  userId: any
  status: any
  // created_at: any
  year: any
  month: any
  date: any
  hour: any
  min: any
}
const count = ref()
const { data: allPostsList, refresh } = await useAsyncData(async () => {
  const postsRef = collection(getFirestore(), 'posts')
  const q = query(postsRef, where("userId", '==', currentUser.value))
  const allPost: Post[] = []
  const querySnapshot = await getDocs(q)
  const length = querySnapshot.docs.length
  count.value = length
  querySnapshot.forEach((doc: any) => {
    allPost.push({
      id: doc.id,
      content: doc.data().content,
      userId: doc.data().userId,
      status: doc.data().status,
      // created_at: doc.data().created_at,
      year: doc.data().year,
      month: doc.data().month,
      date: doc.data().date,
      hour: doc.data().hour,
      min: doc.data().min,
    })
  })
  return allPost
}, {
  watch: [count]
})
const array = ref(allPostsList)
useSeoMeta({
  title: '無料お悩み掲示板「anydan(エニダン)」',
  description: 'モヤモヤしたら、アドバイザーに相談を。相談を重ねることでの変化を試してみて。10分間の無料応援チャットサービス、anydan(エニダン)。',
  ogImage: 'https://anydan.link',
})
</script>
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" xs="12" sm="11" md="9" lg="8" align="center">
        <v-row>
          <v-btn icon class="mt-12 ml-3 float-start" elevation="0" color="#FFFFFF00">
            <v-icon @click="$router.go(-1)" :icon="mdiArrowLeft" />
          </v-btn>
        </v-row>
        <p class="font-weight-black mt-2 mb-4" style="font-size:17px; text-align:center;">
          my投稿一覧
        </p>
        <v-row class="float-end mr-3">
          <v-btn class="mt-n8" color="#FAFAFA" icon @click="refresh">
            <v-icon :icon="mdiRefresh" />
          </v-btn>
        </v-row>
        <v-row justify="center" style="margin-bottom:100px;">
          <v-col v-for="post in array" :key="post.id" align="left" class="index overflow-y-auto" cols="11">
            <v-card style="border-radius:10px;">
              <v-btn icon elevation="2" color="#FAFAFA" class="float-right mt-2 mr-2" :to="`/tetote/posts/${post.id}`">
                <v-icon :icon="mdiChevronDoubleRight" />
              </v-btn>
              <v-card-text style="font-size:13px;">
                ■{{ post.year }}/{{ post.month }}/{{ post.date }} {{ post.hour }}:{{ post.min }}
              </v-card-text>
              <v-card-text class="text-subtitle-2 font-weight-bold mt-n6 css">
                {{ post.content }}
              </v-card-text>
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

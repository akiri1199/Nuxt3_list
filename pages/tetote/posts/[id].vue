<script setup lang='ts'>
import { mdiArrowLeft, mdiHeart, mdiRefresh } from '@mdi/js'
import { getFirestore, doc, collection, query, orderBy, getDocs, where, onSnapshot } from 'firebase/firestore'
const currentUser = useUser()
type OnayamiAdvise = {
  id: any
  userName: any
  content: any
  status: any
  created_at: any
  year: any
  month: any
  date: any
  hour: any
  min: any
}
const { params } = useRoute();


const postsId = params.id as any

const postId = postsId

const postInfo = ref('') as any
const unsub = onSnapshot(doc(getFirestore(), 'posts', postId), (doc: any) => {
  postInfo.value = doc.data() as any
})

const alert = ref<boolean>(false)
const count = ref()

const { data: onayamiAdviseList, refresh } = await useAsyncData(async () => {
  const q = query(collection(getFirestore(), 'posts', postId, 'comments'), orderBy('created_at', 'desc'))
  const querySnapshot = await getDocs(q)
}, {
  watch: [count]
})


const array = ref(onayamiAdviseList)
const content = ref('')
const testForm = ref('') as any
const { makeOnayamiAdvise } = useNewOnayamiAdvise() as any
const submit = () => {
  if (content.value !== '') {
    makeOnayamiAdvise(content.value, postId, currentUser.value)
    content.value = ''
    alert.value = true
  }
  if (alert.value === true) {
    setTimeout(() => { alert.value = false }, 1500)
  }
}
const { likeCountOnayami } = useLikeCountOnayami(postId)
const { onayamiIncrement } = useOnayamiIncrement()
const increment = () => {
  onayamiIncrement(postId, likeCountOnayami.value)
}
const { adviseiIncrement } = useAdviseIncrement()
const incrementAdvise = async (id: any) => {
  adviseiIncrement(postId, id)
}
const title = `${postInfo.value.content}`
useSeoMeta({
  title: title,
  description: title,
  ogImage: 'https://anydan.link',
}),
  useHead({
    title: title,
    meta: [
      { property: 'og:title', content: title },
      { property: 'og:description', content: title },
      { name: "description", content: title },
    ]
  })
</script>
<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="11" xs="12" sm="10" md="9" lg="9" style="margin-top:50px">
        <v-btn icon class="float-left" elevation="0" color="#FFFFFF00" @click="$router.go(-1)">
          <v-icon :icon="mdiArrowLeft" />
        </v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="11" xs="12" sm="10" md="9" lg="9" align="center">
        <p class="font-weight-black mt-n5 mb-3" style="font-size:17px; text-align:left; color:#E57373;">
          相談内容
        </p>
      </v-col>
      <v-col cols="11" xs="12" sm="10" md="9" lg="9" align="center">
        <v-card width="100%" class="" elevation="3" style="border-radius:10px;">
          <v-card-text class="justify-center css" style="text-align:left; font-size:16px;">
            {{ postInfo.userName }}
          </v-card-text>
          <v-card-text class="justify-center mt-n6 mb-3 css" style="text-align:left; font-size:16px;">
            {{ postInfo.content }}
          </v-card-text>
          <v-btn icon size="large" color="#FFFFFF00" elevation="0" class="float-end mr-3 mb-n1 mt-n7" @click="increment">
            <v-icon :icon="mdiHeart" style="color:#E57373;" />
            <span>
              <p style="font-size:12px;" class="mt-2 ml-1">{{ likeCountOnayami }}</p>
            </span>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="11" xs="12" sm="10" md="9" lg="9" align="center" style="margin-top:30px">
        <p class="font-weight-black mb-n8" style="font-size:17px; text-align:left; color:#E57373;">
          お悩みにコメント・応援する
        </p>
      </v-col>
    </v-row>
    <v-row v-if="alert === true" justify="center" class="mb-n10">
      <v-col cols="5" align="center">
        <v-alert type="success" color="#E57373" density="compact" width="280px" :value="alert" title="コメントしました！"
          class="text-white alert" style="border-radius:10px;">
        </v-alert>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="11" xs="12" sm="10" md="9" lg="9" align="center" style="margin-top:30px">
        <v-form ref="testForm" class="pt-6 mt-16" @submit.prevent="submit">
          <v-textarea v-model="content" label="コメント" rows="1" auto-grow class="font-weight-medium mt-n12" color="#263238"
            style="text-align:left;" />
          <v-btn color="#E57373" elevation="10" class="text-white font-weight-bold mt-n4 mb-2 mt-2"
            style="border-radius:10px;" type="submit" @click="refresh">
            コメント・応援する
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="11" xs="12" sm="10" md="9" lg="9" align="center">
        <p class="font-weight-black" style="font-size:17px; text-align:left; color:#E57373;">
          みんなのコメント
        </p>
        <v-btn class="float-end mt-n8" color="#FAFAFA" icon @click="refresh">
          <v-icon :icon="mdiRefresh" />
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="!count" justify="center">
      <v-col cols="8" xs="8" sm="8" md="8" lg="8" align="center">
        <v-card class="mt-6 mb-1" color="#F5F5F5">
          <v-card-subtitle class="mt-1 mb-1">コメントはありません</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-1 overflow-y-auto" style="max-height:500px">
      <v-col cols="11" xs="12" sm="10" md="9" lg="9" v-for="comment in array" :key="comment.id" align="center">
        <v-card style="border-radius:10px;" class="mb-n2">
          <v-card-text style="font-size:14px; text-align:left;">
            ■{{ comment.year }}/{{ comment.month }}/{{ comment.date }} {{ comment.hour }}:{{ comment.min }}
          </v-card-text>
          <v-card-text class="mt-n7" style="font-size:14px; text-align:left;">
            {{ comment.userName }}
          </v-card-text>
          <v-card class="pt-3" elevation="0">
            <v-card-subtitle class="css text-subtitle-2 font-weight-bold mt-n3" align="left">
              {{ comment.content }}
            </v-card-subtitle>
          </v-card>
          <v-btn icon size="large" color="#FFFFFF00" elevation="0" class="float-end mr-4 mb-n1 mt-n6"
            @click="incrementAdvise(comment.id)">
            <v-icon :icon="mdiHeart" style="color:#E57373;" />
            <span>
              <LikeCountToAd :commentId="comment.id" />
            </span>
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="11" xs="12" sm="9" md="9" lg="9" style="margin-bottom:100px; margin-top:10px;">
        <v-divider class="mb-5" />
        <p>
          本サービスの「<span class="text-no-wrap bg-yellow-accent-3">エニダン</span>」では、この悩みに詳しい人2人にチャットで相談することができます。（無料）
        </p>
        <v-btn block class="mt-4" rounded color="#C51162" elevation="3" variant="outlined" to="/">
          チャット相談はこちら（無料）
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.css {
  white-space: pre-line;
}
</style>

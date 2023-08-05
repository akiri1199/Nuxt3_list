<script setup lang='ts'>
  import { getFirestore, doc, onSnapshot } from 'firebase/firestore'
  interface Props {
    commentId: string;
  }
  const props = withDefaults(defineProps<Props>(), {
  commentId: ''
})
  const commentId = props.commentId
  const id = commentId as any
  const { params } = useRoute()
  const postsId = params.id as any
  const postId = postsId
  const likeCountAdvise = ref()
  onMounted(() => {
    const unsub = onSnapshot(doc(getFirestore(), "posts", postId, 'comments', id, 'likes', id), (doc:any) => {
      likeCountAdvise.value = doc.data().likes
  })
  })
</script>

<template>
  <ClientOnly>
    <p style="font-size:12px;" class="mt-2 ml-1">{{ likeCountAdvise }}</p>
  </ClientOnly>
</template>

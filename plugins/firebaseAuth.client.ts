import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  const currentUser = ref<any | null>(null)
  const unsubscribe = await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        currentUser.value = null
      } else {
        currentUser.value = user.uid!
      }
    resolve(unsubscribe)
    })
  })
  nuxtApp.provide('CurrentUser', currentUser)
})

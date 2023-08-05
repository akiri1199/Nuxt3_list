import { getFirestore, Timestamp, writeBatch, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, reauthenticateWithCredential, updateEmail, EmailAuthProvider, updatePassword, sendPasswordResetEmail, deleteUser } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

export const useUser = () => {
  const nuxtApp = useNuxtApp()
  const currentUser = nuxtApp.$CurrentUser as any
  return currentUser
}

export const useLogIn = () => {
  const logIn = async (email: any, password: any) => {
    await signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        if (userCredential) {
          alert('ログインしました！')
        }
      })
      .catch(() => {
        alert('ログインに失敗しました。\nメールアドレス・パスワードをご確認ください。')
      })
  }
  return { logIn }
}

export const useLogout = () => {
  const logOut = async () => {
    const router = useRouter()
    await signOut(getAuth())
    router.push('/')
  }
  return { logOut }
}

export const useMailNewIn = () => {
  const newIn = async (email: any, password: any, displayName: any) => {
    await createUserWithEmailAndPassword(getAuth(), email, password)
      .then( async (userCredential:any) => {
        if (userCredential) {
          const batch = writeBatch(getFirestore())
          const user = userCredential.user
          const userRef = doc(getFirestore(), 'users', user.uid)
          batch.set(userRef, {
            address: '',
            phoneNumber: '',
            notice: 'off',
            created_at: Timestamp.fromDate(new Date())
          })
          const userProfilesRef = doc(getFirestore(), 'user-profiles', user.uid)
          batch.set(userProfilesRef, {
            displayName: displayName,
            iconURL: '',
            userIntroduce: '',
            created_at: Timestamp.fromDate(new Date()),
            updated_at: Timestamp.fromDate(new Date())
          })
          await batch.commit()
          alert('会員登録ありがとうございます！ログインしました！')
        }
      }).catch((error) => {
        alert('会員登録に失敗しました。\nメールアドレスが既に使われているか、入力内容に誤りがあります。')
      })
  }
  return { newIn }
}

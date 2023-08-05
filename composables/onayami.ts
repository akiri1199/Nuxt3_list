import { getFirestore, Timestamp, collection, doc, onSnapshot, setDoc, updateDoc, getDoc, query } from 'firebase/firestore'

type Post = {
  id:any
  created_at: any
}

export const usePostsList = () => {
  const postsList:Post[] = []
  const q = query(collection(getFirestore(), 'posts'))
  const unsubscribe = onSnapshot(q,(snapshot:any) => {
    snapshot.docChanges().forEach((change:any) => {
      if (change.type === 'added') {
        postsList.push({
          id: change.doc.id,
          created_at: change.doc.data().created_at,
        }) 
      } if (change.type === 'modified') {
      } if (change.type === 'removed') {
      }
    })
  })
  return { postsList }
}

export const useNewOnayami = () => {
  const makeOnayami = (content:string, currentUser:any) => {
    const newOnayamiRef = doc(collection(getFirestore(), 'posts'))
    const id = newOnayamiRef.id
    if (currentUser === null) {
      setDoc(newOnayamiRef, {
        content: content.replace(/<br>/g, '\n'),
        userName: '匿名さん',
        userId: null,
        status: 'wait',
        created_at: Timestamp.fromDate(new Date()),
        year: Timestamp.fromDate(new Date()).toDate().getFullYear(),
        month: ('0' + (Timestamp.fromDate(new Date()).toDate().getMonth() + 1 )).slice(-2),
        date: ('0' + (Timestamp.fromDate(new Date()).toDate().getDate())).slice(-2),
        hour: ('0' + (Timestamp.fromDate(new Date()).toDate().getHours())).slice(-2),
        min: ('0' + (Timestamp.fromDate(new Date()).toDate().getMinutes())).slice(-2)
      })
    } else if (currentUser !== null) {
      const unsub = onSnapshot(doc(getFirestore(), 'user-profiles', currentUser), (doc:any) => {
        if (doc.data() === undefined) {
        }
        setDoc(newOnayamiRef, {
          content: content.replace(/<br>/g, '\n'),
          userId: currentUser,
          userName: doc.data().displayName,
          status: 'wait',
          created_at: Timestamp.fromDate(new Date()),
          year: Timestamp.fromDate(new Date()).toDate().getFullYear(),
          month: ('0' + (Timestamp.fromDate(new Date()).toDate().getMonth() + 1 )).slice(-2),
          date: ('0' + (Timestamp.fromDate(new Date()).toDate().getDate())).slice(-2),
          hour: ('0' + (Timestamp.fromDate(new Date()).toDate().getHours())).slice(-2),
          min: ('0' + (Timestamp.fromDate(new Date()).toDate().getMinutes())).slice(-2)
        })
      })
    }
    setDoc(doc(getFirestore(), 'posts', id, 'likes', id), {
      likes : 0
    })
  }
  return {
    makeOnayami
  }
}

export const useLikeCountOnayami = (postId:any) => {
  const likeCountOnayami = ref()
  const unsub = onSnapshot(doc(getFirestore(), "posts", postId, 'likes', postId), (doc:any) => {
    likeCountOnayami.value = doc.data().likes
})
  return { likeCountOnayami }
}

export const useOnayamiIncrement = () => {
  const onayamiIncrement = async (postId:any, likeCountOnayami:number) => {
    await updateDoc(doc(getFirestore(), 'posts', postId, 'likes', postId), {
        likes: Number(likeCountOnayami) + 1
    })
  }
  return { onayamiIncrement }
}

// ここからアドバイス

export const useNewOnayamiAdvise = () => {
  const makeOnayamiAdvise = (content:string, postId:any, currentUser:any) => {
    const newAdviseRef = doc(collection(getFirestore(), 'posts', postId, 'comments'))
    const id = newAdviseRef.id
    if (currentUser === null) {
      setDoc(newAdviseRef, {
        postId: postId,
        content: content.replace(/<br>/g, '\n'),
        userName: '匿名さん',
        userId: null,
        status: 'wait',
        created_at: Timestamp.fromDate(new Date()),
        year: Timestamp.fromDate(new Date()).toDate().getFullYear(),
        month: ('0' + (Timestamp.fromDate(new Date()).toDate().getMonth() + 1 )).slice(-2),
        date: ('0' + (Timestamp.fromDate(new Date()).toDate().getDate())).slice(-2),
        hour: ('0' + (Timestamp.fromDate(new Date()).toDate().getHours())).slice(-2),
        min: ('0' + (Timestamp.fromDate(new Date()).toDate().getMinutes())).slice(-2)
      })
    } else if (currentUser !== null) {
      const unsub = onSnapshot(doc(getFirestore(), 'user-profiles', currentUser), (doc:any) => {
        if (doc.data() === undefined) {
        }
        setDoc(newAdviseRef, {
          postId: postId,
          content: content.replace(/<br>/g, '\n'),
          userId: currentUser,
          userName: doc.data().displayName,
          status: 'wait',
          created_at: Timestamp.fromDate(new Date()),
          year: Timestamp.fromDate(new Date()).toDate().getFullYear(),
          month: ('0' + (Timestamp.fromDate(new Date()).toDate().getMonth() + 1 )).slice(-2),
          date: ('0' + (Timestamp.fromDate(new Date()).toDate().getDate())).slice(-2),
          hour: ('0' + (Timestamp.fromDate(new Date()).toDate().getHours())).slice(-2),
          min: ('0' + (Timestamp.fromDate(new Date()).toDate().getMinutes())).slice(-2)
        })
      })
    }
    setDoc(doc(getFirestore(), 'posts', postId, 'comments', id, 'likes', id), {
      likes : 0
    })
  }
  return {
    makeOnayamiAdvise
  }
}

export const uselikeCountComment = async (postId:any, id:any) => {
  const docRef = doc(getFirestore(), "posts", postId, 'comments', id, 'likes', id)
  const docSnap = await getDoc(docRef)
  if (!docSnap.exists()){
    return
  }
  const data = docSnap.data()
  if(data === undefined){
    return
  }
  const likeCountComment = data.likes
  return likeCountComment
}

export const useAdviseIncrement = () => {
  const adviseiIncrement = async (postId:any, id:any) => {
    const likeCountComment = await uselikeCountComment(postId, id)
    updateDoc(doc(getFirestore(), 'posts', postId, 'comments', id, 'likes', id), {
      likes: Number(likeCountComment) + 1
    })
  }
  return {adviseiIncrement}
}

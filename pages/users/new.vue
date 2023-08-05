<script setup lang='ts'>
import { mdiArrowLeft, mdiEye, mdiEyeOff } from '@mdi/js'
  const emailRules = (value:any) => /.+@.+\..+/.test(value) || '有効ではありません'
  const requiredValidation = (value:any) => !!value || '必ず入力してください'
  const minValidation = (value:any) => value.length >= 8 || '8文字以上で入力してください'
  const limitLengthValidation = (value:any) => value.length <= 10 || '10文字以内で入力してください'
  const show1 = ref(false)
  const displayName = ref('')
  const email = ref('')
  const password = ref('')
  const { newIn } = useMailNewIn()
  const testForm = ref('')
  const router = useRouter()
  const currentUser = useUser()
  const newSubmit = async () => {
    if ((testForm.value as any).validate()) {
      await newIn(email.value, password.value, displayName.value)
      if (currentUser.value !== null) {
        router.push('/')
        } else {
          password.value = ''
      }
    }
  }
  const eye = mdiEye
  const eyeOff = mdiEyeOff
  useSeoMeta({
    title: '新規会員登録',
    description: 'モヤモヤしたら、アドバイザーに相談を。相談を重ねることでの変化を試してみて。10分間の無料応援チャットサービス、anydan(エニダン)。',
    ogImage: 'https://anydan.link',
  })
</script>
<template>
  <v-container>
    <v-card
      class="mx-auto mt-13 mb-10"
      max-width="400px"
      height="500"
      style="border-radius:10px"
    >
      <v-toolbar
      density="compact"
      color="#EFEBE9"
      flat
      class="mb-5"
      style="color:#212121;"
      >
      <v-btn>
        <v-icon @click="$router.go(-1)" :icon="mdiArrowLeft" />
      </v-btn>
      <v-row justify="center">
      <p
      class="font-weight-bold ml-n15" style="font-size:18px; color:#A1887F;">
      新規会員登録
      </p>
    </v-row>
      </v-toolbar>

      <v-form ref="testForm" class="pa-4 pt-5 mt-n3" @submit.prevent="newSubmit">
        <v-text-field
          v-model="displayName"
          label="ニックネーム"
          :rules="[requiredValidation, limitLengthValidation]"
          filled
          color="blue-grey lighten-1"
        />
        <v-text-field
          v-model="email"
          label="メールアドレス"
          :rules="[requiredValidation, emailRules]"
          filled
          color="blue-grey lighten-1"
          type="email"
        />
        <v-text-field
          v-model="password"
          label="パスワード"
          :rules="[requiredValidation, minValidation]"
          filled
          color="blue-grey lighten-1"
          counter="8"
          :append-icon="show1 ? eye : eyeOff"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
        />
        <v-spacer />
        <v-btn
          type="submit"
          block
          color="#D7CCC8"
          class="white--text mb-5 font-weight-bold text-white"
          style="border-radius:10px"
        >
        <p style="color:#6D4C41;">会員登録する</p>
        </v-btn>
      </v-form>
      <v-divider />
      <v-card-subtitle align="center" class="mt-4">
        ログインはこちら<br>
        <v-btn
          variant="outlined"
          color="#424242"
          style="margin-top:8px; border-radius:20px;"
          to="/users/login"
        >
          ログイン
        </v-btn>
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>
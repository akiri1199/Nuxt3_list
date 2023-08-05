<script setup lang='ts'>
import { mdiArrowLeft, mdiEye, mdiEyeOff } from '@mdi/js'
  const emailRules = (value:any) => /.+@.+\..+/.test(value) || '有効ではありません'
  const requiredValidation = (value:any) => !!value || '必ず入力してください'
  const minValidation = (value:any) => value.length >= 8 || '8文字以上で入力してください'
  const show1 = ref(false)
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  const { logIn } = useLogIn()
  const testForm = ref('')
  const currentUser = useUser()
  const loginSubmit = async () => {
    if ( (testForm.value as any).validate() ) {
      await logIn(email.value, password.value)
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
    title: 'ログイン',
    description: 'モヤモヤしたら、アドバイザーに相談を。相談を重ねることでの変化を試してみて。10分間の無料応援チャットサービス、anydan(エニダン)。',
    ogImage: 'https://anydan.link',
  })
</script>

<template>
    <Html>
      <Head>
        <Title>ログイン</Title>
        <Meta name="description" :content="'モヤモヤしたら、アドバイザーに相談を。相談を重ねることでの変化を試してみて。10分間の無料応援チャットサービス、anydan(エニダン)。'" />
        <Link rel="icon" href="/anydan.link" as="script" />
      </Head>
    </Html>
  <v-container>
    <v-row justify="center" style="margin-bottom:100px;">
      <v-col cols="11" xs="12" sm="10" md="7" lg="7" align="center">
        <v-row>
          <v-btn icon class="mt-12 ml-3 float-start" elevation="0" color="#FFFFFF00">
            <v-icon @click="$router.go(-1)" :icon="mdiArrowLeft" />
          </v-btn>
        </v-row>
          <p
            class="font-weight-bold mt-3"
            style="font-size:18px; color:#A1887F; text-align:center;"
          >
            ログイン
          </p>
      </v-col>
      <v-col cols="11" xs="12" sm="10" md="7" lg="7" align="center">
        <v-form
          ref="testForm"
          class="pa-4 pt-5"
          @submit.prevent='loginSubmit'
        >
          <v-text-field
            v-model="email"
            :rules="[requiredValidation, emailRules]"
            label="メールアドレス"
            color="blue-grey lighten-1"
            type="email"
          />
          <v-text-field
            v-model="password"
            label="パスワード"
            :rules="[requiredValidation, minValidation]"
            color="blue-grey lighten-1"
            counter
            :append-icon="show1 ? eye : eyeOff"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
          />
          <v-btn
            type="submit"
            block
            class="mb-5 mt-2 font-weight-bold text-white"
            color="#D7CCC8"
            style="border-radius:10px;"
          >
            <p style="color:#6D4C41;">ログインする</p>
          </v-btn>
        </v-form>
        <v-btn
          variant="text"
          elevation="0"
          class="mt-n4 mb-7 text-decoration-underline"
          style="font-size:12px;"
          to="/users/resetPassword"
          >
          パスワードを忘れた方はこちら
        </v-btn>
        <v-divider />
        <p class="text-subtitle-2 mt-6">
          新規でアカウントを作成される方はこちら
        </p>
        <v-btn
          class="mb-16"
          variant="outlined"
          color="#424242"
          style="margin-top:10px; border-radius:20px;"
          to="/users/new"
        >
          新規会員登録
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
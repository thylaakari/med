<script setup>
import { ref } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import { useRouter } from 'vue-router'

useHead({
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1',
      type: 'module',
      tagPosition: 'bodyClose',
    },
  ],
})

const email = ref('')
const password = ref('')
const role = ref('')
const supabase = useSupabaseClient()
const loading = ref(false)
const error = ref(null)
const router = useRouter()

async function login() {
  try {
    loading.value = true
    if (!email.value || !password.value || !role.value) {
      error.value = 'Заполните все поля'
      return
    }

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (authError) {
      error.value = authError.message
      return
    }

    // Проверяем роль в таблице users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('email', data.user.email)
      .eq('role', role.value)
      .single()

    if (userError || !userData) {
      error.value = userError?.message || 'Роль не найдена или не совпадает'
      await supabase.auth.signOut()
      return
    }

    // Перенаправляем в зависимости от роли
    const redirectRoutes = {
      doctor: '/docdash',
      clinic: '/clinicdash',
      manager: '/managerdash',
    }
    router.push(redirectRoutes[role.value] || '/')
  } catch (err) {
    error.value = err.message
    console.error('Ошибка:', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
        class="mx-auto h-10 w-auto"
      />
      <h2
        class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
      >
        Войти в аккаунт
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div v-if="error" class="text-red-600 text-sm text-center mb-4">
        {{ error }}
      </div>
      <form action="#" method="POST" class="space-y-6" @submit.prevent="login">
        <div>
          <label for="email" class="block text-sm/6 font-medium text-gray-900"
            >Email</label
          >
          <div class="mt-2">
            <input
              id="email"
              type="email"
              name="email"
              v-model="email"
              required
              autocomplete="email"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm/6 font-medium text-gray-900"
              >Пароль</label
            >
            <div class="text-sm">
              <a
                href="#"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Забыли пароль?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              type="password"
              name="password"
              v-model="password"
              required
              autocomplete="current-password"
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label for="role" class="block text-sm/6 font-medium text-gray-900"
            >Войти как</label
          >
          <div class="mt-2">
            <select
              id="role"
              v-model="role"
              required
              class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              <option value="" disabled>Выберите роль</option>
              <option value="doctor">Врач</option>
              <option value="clinic">Клиника</option>
              <option value="manager">Менеджер</option>
            </select>
          </div>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            :disabled="loading"
          >
            Войти
          </button>
        </div>
      </form>
      <p class="mt-10 text-center text-sm/6 text-gray-500">
        или
        <NuxtLink
          to="/"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          вернуться на главную
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

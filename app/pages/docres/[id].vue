<script setup>
useHead({
  script: [
    {
      src: 'https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1',
      type: 'module',
      tagPosition: 'bodyClose',
    },
    {
      src: 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
      type: 'module',
      tagPosition: 'bodyClose',
    },
  ],
})
const router = useRouter()
definePageMeta({
  layout: 'doclayout',
  middleware: ['auth-role'],
  requiredRole: 'doctor',
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()
const research = ref(null)
const loading = ref(true)
const error = ref(null)
const protocol = ref(null)
const conclusion = ref(null)

// Загрузка данных исследования
async function fetchResearch() {
  try {
    loading.value = true
    const { data, error: fetchError } = await supabase
      .from('researches')
      .select(
        'id, region, modality, isUrgent, anamnesis, patientAge, category, timeToEnd, status, protocol, conclusion, sex'
      )
      .eq('id', route.params.id)
      .eq('doctor', user.value?.email)
      .single()

    protocol.value = data.protocol
    conclusion.value = data.conclusion

    if (fetchError) {
      error.value = fetchError.message
      return
    }

    if (!data) {
      error.value = 'Исследование не найдено'
      return
    }

    research.value = data
  } catch (err) {
    error.value = err.message
    console.error('Ошибка загрузки исследования:', err)
  } finally {
    loading.value = false
  }
}

// Изменение статуса на "done"
async function completeResearch() {
  try {
    const { error: updateError } = await supabase
      .from('researches')
      .update({
        status: 'done',
        timeToEnd: 0,
        conclusion: conclusion.value,
        protocol: protocol.value,
      })
      .eq('id', route.params.id)
      .eq('doctor', user.value?.email)

    if (updateError) {
      error.value = updateError.message
      return
    }

    research.value.status = 'done'
    research.value.timeToEnd = 0
    router.push({ name: 'docdash' })
  } catch (err) {
    error.value = err.message
    console.error('Ошибка завершения исследования:', err)
  }
}

onMounted(() => {
  if (user.value) {
    fetchResearch()
    setupRealtime()
  }
})
</script>

<template>
  <div class="min-h-full">
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div v-if="loading" class="text-gray-600 text-center mt-6">
          Загрузка...
        </div>
        <div v-else-if="error" class="text-red-600 text-center mt-6">
          {{ error }}
        </div>
        <div v-else-if="research">
          <div class="bg-white border border-gray-300 rounded-2xl">
            <header>
              <div class="mx-auto max-w-7xl px-4 pt-3 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">
                  {{ research.sex }}, {{ research.patientAge }} лет
                </h1>
              </div>
            </header>
            <div class="p-4 sm:p-6 mb-4">
              <div class="my-4 sm:mt-0">
                <h3 class="text-lg font-medium text-pretty text-gray-900">
                  {{ research.region }}
                  <span
                    v-if="research.isUrgent"
                    class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 inset-ring inset-ring-red-600/10 mr-2"
                    >Срочное</span
                  >
                  <span
                    class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10"
                    >{{ research.modality }}</span
                  >
                </h3>
                <p class="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
                  <strong>Анамнез: </strong>{{ research.anamnesis }}
                </p>

                <div
                  v-if="research.status === 'inprogress'"
                  class="flex items-center rounded-md bg-blue-50 my-3 px-3 py-2 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10"
                >
                  <select
                    name="Headline"
                    id="Headline"
                    class="w-full rounded-lg text-gray-700 sm:text-sm"
                  >
                    <option value="">Выбрать шаблон</option>

                    <optgroup label="Рентген">
                      <option value="AK">Стопа</option>
                      <option value="AK">ОГК</option>
                      <option value="AK">ОБП</option>
                    </optgroup>

                    <optgroup label="КТ">
                      <option value="BBK">Голова</option>
                      <option value="BG">Жопа</option>
                    </optgroup>

                    <optgroup label="МРТ">
                      <option value="EC">ОБП</option>
                      <option value="EC">Колено</option>
                      <option value="EC">Голова</option>
                      <option value="EC">Таз</option>
                    </optgroup>
                  </select>
                </div>

                <label for="Notes">
                  <span class="text-sm font-medium text-gray-700">
                    Описание</span
                  >

                  <textarea
                    :disabled="research.status === 'done'"
                    id="Notes"
                    v-model="protocol"
                    class="mt-0.5 w-full resize-none rounded border border-gray-300 shadow-sm sm:text-sm p-3 h-96"
                    rows="4"
                    >{{ research.protocol }}
</textarea
                  >
                </label>

                <div>
                  <label for="Notes">
                    <span class="text-sm font-medium text-gray-700">
                      Заключение
                    </span>

                    <textarea
                      id="Notes"
                      :disabled="research.status === 'done'"
                      v-model="conclusion"
                      class="mt-0.5 w-full resize-none rounded border border-gray-300 shadow-sm sm:text-sm p-3"
                      rows="4"
                      >{{ research.conclusion }}</textarea
                    >
                  </label>

                  <button
                    @click="completeResearch"
                    v-if="research.status === 'inprogress'"
                    class="w-full sm:w-auto px-6 py-3 text-lg font-bold text-white rounded-lg bg-gradient-to-r from-green-600 to-green-800 hover:from-green-500 hover:to-green-700 shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  >
                    <svg
                      class="w-6 h-6 mr-2 inline-block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Завершить исследование
                  </button>
                </div>
              </div>
              <span
                class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20"
                >Категория 1</span
              >
              <span
                v-if="research.status === 'inprogress'"
                class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 inset-ring inset-ring-yellow-600/20"
                >Осталось 6 минут</span
              >
            </div>
          </div>
          <div class="mt-6">
            <NuxtLink
              to="/docdash"
              class="inline-flex items-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Вернуться к исследованиям
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

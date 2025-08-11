<template>
  <main class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl mb-8">
        Исследование #{{ research?.id || '...' }}
      </h1>

      <div v-if="isLoading" class="text-center py-8">
        <svg
          class="animate-spin h-8 w-8 text-blue-600 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>

      <div
        v-else-if="errorMessage"
        class="p-4 bg-red-100 text-red-700 rounded-md"
      >
        {{ errorMessage }}
      </div>

      <div
        v-else-if="research"
        class="bg-white rounded-2xl shadow-sm p-6 sm:p-8"
      >
        <!-- Информация об исследовании -->
        <div class="grid gap-6">
          <div>
            <h2 class="text-lg font-semibold text-gray-900">
              Детали исследования
            </h2>
            <dl class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt class="text-sm font-medium text-gray-500">Дата создания</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ formatDate(research.created_at) }}
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Область</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ research.region }}
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Модальность</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ research.modality || '–' }}
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Срочность</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ research.isUrgent ? 'Срочное' : 'Обычное' }}
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Имя пациента</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ research.patientName }}
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Возраст</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ research.patientAge }}
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Пол</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ research.sex }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">
                  Время до окончания
                </dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ research.timeToEnd ? `${research.timeToEnd} мин` : '–' }}
                </dd>
              </div>
            </dl>
          </div>

          <!-- Анамнез -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Анамнез</h2>
            <p class="mt-2 text-sm text-gray-500">
              {{ research.anamnesis || 'Анамнез отсутствует' }}
            </p>
          </div>

          <!-- Протокол -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Протокол</h2>
            <p class="mt-2 text-sm text-gray-500">
              {{ research.protocol || 'Протокол отсутствует' }}
            </p>
          </div>

          <!-- Заключение -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Заключение</h2>
            <p class="mt-2 text-sm text-gray-500">
              {{ research.conclusion || 'Заключение отсутствует' }}
            </p>
          </div>

          <!-- Форма аудита -->
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Аудит</h2>
            <form @submit.prevent="submitAudit" class="mt-4 grid gap-6">
              <div>
                <label
                  for="auditResult"
                  class="block text-sm font-medium text-gray-700"
                >
                  Результат аудита
                </label>
                <input
                  v-model="form.auditResult"
                  type="text"
                  id="auditResult"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Введите результат аудита"
                  required
                />
                <p v-if="errors.auditResult" class="mt-1 text-sm text-red-600">
                  {{ errors.auditResult }}
                </p>
              </div>

              <div>
                <label
                  for="auditResponse"
                  class="block text-sm font-medium text-gray-700"
                >
                  Комментарий аудита
                </label>
                <textarea
                  v-model="form.auditResponse"
                  id="auditResponse"
                  rows="4"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Введите комментарий аудита"
                ></textarea>
              </div>

              <div class="flex justify-end gap-4">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {{ isSubmitting ? 'Сохранение...' : 'Завершить аудит' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Уведомления -->
      <div
        v-if="successMessage"
        class="mt-6 p-4 bg-green-100 text-green-700 rounded-md"
      >
        {{ successMessage }}
      </div>
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'managerlayout',
  middleware: ['auth-role'],
  requiredRole: 'manager',
})

const supabase = useSupabaseClient()
const route = useRoute()
const research = ref(null)
const isLoading = ref(true)
const errorMessage = ref('')
const successMessage = ref('')
const isSubmitting = ref(false)
const form = ref({
  auditResult: '',
  auditResponse: '',
})
const errors = ref({})

async function fetchResearch() {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('researches')
      .select('*')
      .eq('id', route.params.id)
      .single()
    if (error) throw error
    if (!data) throw new Error('Исследование не найдено')
    research.value = data

    // Обновляем isAudit и status при загрузке страницы
    await supabase
      .from('researches')
      .update({ isAudit: true, status: 'audit' })
      .eq('id', route.params.id)
  } catch (error) {
    errorMessage.value = 'Ошибка при загрузке исследования: ' + error.message
  } finally {
    isLoading.value = false
  }
}

async function submitAudit() {
  errors.value = {}
  if (!form.value.auditResult) {
    errors.value.auditResult = 'Поле результата аудита обязательно'
    return
  }

  isSubmitting.value = true
  try {
    const { error } = await supabase
      .from('researches')
      .update({
        auditResult: form.value.auditResult,
        auditResponse: form.value.auditResponse || null,
        status: 'done',
      })
      .eq('id', route.params.id)
    if (error) throw error

    successMessage.value = 'Аудит успешно завершен!'
    form.value.auditResult = ''
    form.value.auditResponse = ''
    setTimeout(() => (successMessage.value = ''), 5000)
  } catch (error) {
    errorMessage.value = 'Ошибка при сохранении аудита: ' + error.message
    setTimeout(() => (errorMessage.value = ''), 5000)
  } finally {
    isSubmitting.value = false
  }
}

function formatDate(dateString) {
  if (!dateString) return '–'
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(() => {
  fetchResearch()
})
</script>

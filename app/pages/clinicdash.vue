<template>
  <main class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl mb-8">
        Добавить новое исследование
      </h1>

      <form
        @submit.prevent="submitResearch"
        class="bg-white rounded-2xl shadow-sm p-6 sm:p-8"
      >
        <div class="grid gap-6">
          <!-- Поле для региона -->
          <div>
            <label for="region" class="block text-sm font-medium text-gray-700">
              Область исследования
            </label>
            <input
              v-model="form.region"
              type="text"
              id="region"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Например, Коленно-локтевой сустав"
              required
            />
            <p v-if="errors.region" class="mt-1 text-sm text-red-600">
              {{ errors.region }}
            </p>
          </div>

          <!-- Поле для модальности -->
          <div>
            <label
              for="modality"
              class="block text-sm font-medium text-gray-700"
            >
              Модальность
            </label>
            <select
              v-model="form.modality"
              id="modality"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              <option value="" disabled>Выберите модальность</option>
              <option value="КТ">КТ</option>
              <option value="Рентген">Рентген</option>
              <option value="МРТ">МРТ</option>
            </select>
            <p v-if="errors.modality" class="mt-1 text-sm text-red-600">
              {{ errors.modality }}
            </p>
          </div>

          <!-- Поле для срочности -->
          <div>
            <label
              for="isUrgent"
              class="block text-sm font-medium text-gray-700"
            >
              Срочность
            </label>
            <select
              v-model="form.isUrgent"
              id="isUrgent"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option :value="false">Обычное</option>
              <option :value="true">Срочное</option>
            </select>
          </div>

          <!-- Поле для анамнеза -->
          <div>
            <label
              for="anamnesis"
              class="block text-sm font-medium text-gray-700"
            >
              Анамнез
            </label>
            <textarea
              v-model="form.anamnesis"
              id="anamnesis"
              rows="4"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Введите анамнез пациента"
            ></textarea>
          </div>

          <!-- Поле для имени пациента -->
          <div>
            <label
              for="patientName"
              class="block text-sm font-medium text-gray-700"
            >
              Имя пациента
            </label>
            <input
              v-model="form.patientName"
              type="text"
              id="patientName"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Например, Иванов Иван Иванович"
              required
            />
            <p v-if="errors.patientName" class="mt-1 text-sm text-red-600">
              {{ errors.patientName }}
            </p>
          </div>

          <!-- Поле для возраста пациента -->
          <div>
            <label
              for="patientAge"
              class="block text-sm font-medium text-gray-700"
            >
              Возраст пациента
            </label>
            <input
              v-model.number="form.patientAge"
              type="number"
              id="patientAge"
              min="0"
              max="150"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Введите возраст"
              required
            />
            <p v-if="errors.patientAge" class="mt-1 text-sm text-red-600">
              {{ errors.patientAge }}
            </p>
          </div>

          <!-- Поле для пола -->
          <div>
            <label for="sex" class="block text-sm font-medium text-gray-700">
              Пол
            </label>
            <select
              v-model="form.sex"
              id="sex"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            >
              <option value="" disabled>Выберите пол</option>
              <option value="Мужской">Мужской</option>
              <option value="Женский">Женский</option>
            </select>
            <p v-if="errors.sex" class="mt-1 text-sm text-red-600">
              {{ errors.sex }}
            </p>
          </div>

          <!-- Поле для времени до окончания -->
          <div>
            <label
              for="timeToEnd"
              class="block text-sm font-medium text-gray-700"
            >
              Время до окончания (в минутах)
            </label>
            <input
              v-model.number="form.timeToEnd"
              type="number"
              id="timeToEnd"
              min="0"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Например, 60"
            />
          </div>
        </div>

        <div class="mt-8 flex justify-end gap-4">
          <button
            type="button"
            @click="resetForm"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Очистить
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? 'Сохранение...' : 'Добавить исследование' }}
          </button>
        </div>
      </form>

      <!-- Уведомления -->
      <div
        v-if="successMessage"
        class="mt-6 p-4 bg-green-100 text-green-700 rounded-md"
      >
        {{ successMessage }}
      </div>
      <div
        v-if="errorMessage"
        class="mt-6 p-4 bg-red-100 text-red-700 rounded-md"
      >
        {{ errorMessage }}
      </div>
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'cliniclayout',
  middleware: ['auth-role'],
  requiredRole: 'clinic',
})

const supabase = useSupabaseClient()
const form = ref({
  region: '',
  modality: '',
  isUrgent: false,
  anamnesis: '',
  patientName: '',
  patientAge: null,
  sex: '',
  timeToEnd: null,
})
const errors = ref({})
const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

async function submitResearch() {
  errors.value = {}

  // Валидация
  if (!form.value.region) errors.value.region = 'Поле региона обязательно'
  if (!form.value.modality)
    errors.value.modality = 'Поле модальности обязательно'
  if (!form.value.patientName)
    errors.value.patientName = 'Поле имени пациента обязательно'
  if (!form.value.sex) errors.value.sex = 'Поле пола обязательно'
  if (
    form.value.patientAge === null ||
    form.value.patientAge < 0 ||
    form.value.patientAge > 150
  ) {
    errors.value.patientAge = 'Введите корректный возраст (0–150)'
  }

  if (Object.keys(errors.value).length > 0) return

  isSubmitting.value = true
  try {
    const { error } = await supabase.from('researches').insert({
      created_at: new Date().toISOString(), // Устанавливаем дату на клиенте
      region: form.value.region,
      modality: form.value.modality,
      isUrgent: form.value.isUrgent,
      anamnesis: form.value.anamnesis || null,
      patientName: form.value.patientName,
      patientAge: form.value.patientAge,
      sex: form.value.sex,
      timeToEnd: form.value.timeToEnd || null,
      isAudit: false,
    })
    if (error) throw error

    successMessage.value = 'Исследование успешно добавлено!'
    resetForm()
    setTimeout(() => (successMessage.value = ''), 5000)
  } catch (error) {
    errorMessage.value = 'Ошибка при добавлении исследования: ' + error.message
    setTimeout(() => (errorMessage.value = ''), 5000)
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  form.value = {
    region: '',
    modality: '',
    isUrgent: false,
    anamnesis: '',
    patientName: '',
    patientAge: null,
    sex: '',
    timeToEnd: null,
  }
  errors.value = {}
}
</script>

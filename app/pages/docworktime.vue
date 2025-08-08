<template>
  <div class="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-6">
      Составление расписания
    </h1>

    <!-- Выбор месяца -->
    <div class="flex justify-between items-center mb-6">
      <button @click="prevMonth" class="p-2 rounded-full hover:bg-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <h2 class="text-xl font-semibold text-gray-700">
        {{ currentMonthName }} {{ currentYear }}
      </h2>
      <button @click="nextMonth" class="p-2 rounded-full hover:bg-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- Календарь -->
    <div class="grid grid-cols-7 gap-2 mb-6">
      <div
        v-for="day in ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']"
        :key="day"
        class="text-center font-medium text-gray-500"
      >
        {{ day }}
      </div>

      <div v-for="day in calendarDays" :key="day.date" class="col-span-1">
        <button
          @click="selectDate(day)"
          :class="[
            'h-10 w-full rounded-full flex items-center justify-center hover:bg-gray-200 transition duration-200',
            {
              'bg-blue-600 text-white hover:bg-blue-700': day.isSelected,
              'border border-blue-600': day.isToday,
              'text-gray-400': !day.isCurrentMonth,
            },
          ]"
          :disabled="!day.isCurrentMonth"
        >
          {{ day.day }}
        </button>
      </div>
    </div>

    <!-- Выбранные даты -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Выбранные даты</h2>
      <div v-if="selectedDates.length === 0" class="text-gray-500 italic">
        Нет выбранных дат
      </div>
      <div v-else class="space-y-3">
        <div
          v-for="date in selectedDates"
          :key="date.date"
          class="flex justify-between items-center p-3 bg-gray-50 rounded-md"
        >
          <div>
            <span class="font-medium">{{ formatDate(date.date) }}</span>
            <span class="text-gray-500 ml-2"
              >{{ date.startTime }} - {{ date.endTime }}</span
            >
          </div>
          <button
            @click="removeDate(date.date)"
            class="text-red-500 hover:text-red-700 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Кнопка сохранения -->
    <button
      @click="saveSchedule"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition duration-200"
    >
      Сохранить расписание
    </button>
  </div>

  <!-- Модальное окно для выбора времени -->
  <div
    v-if="showTimeModal"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="closeTimeModal"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 class="text-lg font-medium text-gray-900 mb-4">
        {{ modalDateTitle }}
      </h3>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            for="startTime"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Начало</label
          >
          <select
            id="startTime"
            v-model="selectedStartTime"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option
              v-for="time in timeOptions"
              :key="'start-' + time"
              :value="time"
            >
              {{ time }}
            </option>
          </select>
        </div>
        <div>
          <label
            for="endTime"
            class="block text-sm font-medium text-gray-700 mb-1"
            >Конец</label
          >
          <select
            id="endTime"
            v-model="selectedEndTime"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          >
            <option
              v-for="time in timeOptions"
              :key="'end-' + time"
              :value="time"
            >
              {{ time }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex justify-end space-x-3">
        <button
          @click="closeTimeModal"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
        >
          Отмена
        </button>
        <button
          @click="saveTime"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'doclayout',
})

// Текущая дата и состояние
const currentDate = ref(new Date())
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const selectedDates = ref([])
const showTimeModal = ref(false)
const selectedDate = ref('')
const selectedStartTime = ref('09:00')
const selectedEndTime = ref('18:00')
const modalDateTitle = ref('')

// Генерация временных интервалов
const timeOptions = ref([])
for (let hour = 0; hour < 24; hour++) {
  for (let minute = 0; minute < 60; minute += 30) {
    timeOptions.value.push(
      `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`
    )
  }
}

// Названия месяцев
const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

// Вычисляемые свойства
const currentMonthName = computed(() => monthNames[currentMonth.value])
const calendarDays = computed(() => {
  const days = []

  // Первый день месяца
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  // Последний день месяца
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  // День недели первого дня месяца (0 - воскресенье, 1 - понедельник и т.д.)
  const firstDayWeekday = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1

  // Добавляем пустые ячейки для дней предыдущего месяца
  for (let i = 0; i < firstDayWeekday; i++) {
    days.push({
      day: '',
      date: '',
      isCurrentMonth: false,
      isSelected: false,
      isToday: false,
    })
  }

  // Добавляем дни текущего месяца
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const date = new Date(currentYear.value, currentMonth.value, day)
    const dateString = date.toISOString().split('T')[0]
    const today = new Date()

    days.push({
      day,
      date: dateString,
      isCurrentMonth: true,
      isSelected: selectedDates.value.some((d) => d.date === dateString),
      isToday:
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    })
  }

  return days
})

// Методы
const prevMonth = () => {
  currentMonth.value--
  if (currentMonth.value < 0) {
    currentMonth.value = 11
    currentYear.value--
  }
}

const nextMonth = () => {
  currentMonth.value++
  if (currentMonth.value > 11) {
    currentMonth.value = 0
    currentYear.value++
  }
}

const selectDate = (day) => {
  if (!day.isCurrentMonth) return

  selectedDate.value = day.date
  const existingDate = selectedDates.value.find((d) => d.date === day.date)

  if (existingDate) {
    selectedStartTime.value = existingDate.startTime
    selectedEndTime.value = existingDate.endTime
  } else {
    selectedStartTime.value = '09:00'
    selectedEndTime.value = '18:00'
  }

  // Форматируем дату для заголовка модального окна
  const dateObj = new Date(day.date)
  modalDateTitle.value = dateObj.toLocaleDateString('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  showTimeModal.value = true
}

const saveTime = () => {
  if (selectedStartTime.value >= selectedEndTime.value) {
    alert('Конечное время должно быть после начального')
    return
  }

  // Удаляем дату если она уже есть
  selectedDates.value = selectedDates.value.filter(
    (d) => d.date !== selectedDate.value
  )

  // Добавляем новую дату
  selectedDates.value.push({
    date: selectedDate.value,
    startTime: selectedStartTime.value,
    endTime: selectedEndTime.value,
  })

  // Сортируем даты
  selectedDates.value.sort((a, b) => new Date(a.date) - new Date(b.date))

  closeTimeModal()
}

const closeTimeModal = () => {
  showTimeModal.value = false
}

const removeDate = (date) => {
  selectedDates.value = selectedDates.value.filter((d) => d.date !== date)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  })
}

const saveSchedule = () => {
  if (selectedDates.value.length === 0) {
    alert('Выберите хотя бы одну дату')
    return
  }

  console.log('Сохраненное расписание:', selectedDates.value)
  alert('Расписание сохранено!')
}
</script>

<style scoped>
/* Дополнительные стили при необходимости */
</style>

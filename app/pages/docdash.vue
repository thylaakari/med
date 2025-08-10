<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

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

definePageMeta({
  layout: 'doclayout',
  middleware: ['auth-role'],
  requiredRole: 'doctor',
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const activeTab = ref('created')
const tabsContent = ref({
  created: [],
  inprogress: [],
  done: [],
  audit: [],
})
const loading = ref(false)
const error = ref(null)

const setTab = (tab) => {
  activeTab.value = tab
}

// Функция для преобразования данных исследования
const transformResearch = (task) => ({
  id: task.id, // Сохраняем id для обновления статуса
  title: task.region,
  tags: [
    task.isUrgent ? { text: 'Срочное', color: 'red' } : null,
    { text: task.modality, color: 'blue' },
  ].filter(Boolean),
  description: `${task.sex}, ${task.patientAge} лет`,
  category: task.category,
  timeLeft:
    task.timeToEnd > 0
      ? `Осталось ${task.timeToEnd} минут`
      : task.status === 'done'
      ? 'Завершено'
      : 'В аудите',
  link: `/docres/${task.id}`,
})

// Загрузка начальных данных
async function fetchResearches() {
  try {
    loading.value = true
    const { data, error: fetchError } = await supabase
      .from('researches')
      .select(
        'id, region, modality, isUrgent, anamnesis, patientAge, category, timeToEnd, status, sex'
      )

    if (fetchError) {
      error.value = fetchError.message
      return
    }

    tabsContent.value = {
      created: data
        .filter((task) => task.status === 'created')
        .map(transformResearch),
      inprogress: data
        .filter((task) => task.status === 'inprogress')
        .map(transformResearch),
      done: data
        .filter((task) => task.status === 'done')
        .map(transformResearch),
      audit: data
        .filter((task) => task.status === 'audit')
        .map(transformResearch),
    }
  } catch (err) {
    error.value = err.message
    console.error('Ошибка загрузки исследований:', err)
  } finally {
    loading.value = false
  }
}

// Функция для взятия исследования в работу
async function takeToWork(researchId, index) {
  try {
    const { error: updateError } = await supabase
      .from('researches')
      .update({ status: 'inprogress', doctor: user.value?.email })
      .eq('id', researchId)

    if (updateError) {
      error.value = updateError.message
      return
    }

    // Перемещаем исследование из created в inprogress
    const research = tabsContent.value.created[index]
    tabsContent.value.created.splice(index, 1)
    tabsContent.value.inprogress.unshift({
      ...research,
      timeLeft: `Осталось ${research.timeToEnd} минут`,
    })
  } catch (err) {
    error.value = err.message
    console.error('Ошибка при взятии в работу:', err)
  }
}

// Реал-тайм подписка
let subscription = null
function setupRealtime() {
  subscription = supabase
    .channel('researches-channel')
    .on(
      'postgres_changes',
      {
        event: '*', // Ловим INSERT и UPDATE
        schema: 'public',
        table: 'researches',
        filter: `doctor=eq.${user.value?.email}`,
      },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          const newResearch = payload.new
          if (
            ['created', 'inprogress', 'done', 'audit'].includes(
              newResearch.status
            )
          ) {
            tabsContent.value[newResearch.status].unshift(
              transformResearch(newResearch)
            )
          }
        } else if (payload.eventType === 'UPDATE') {
          const updatedResearch = payload.new
          const oldStatus = payload.old.status
          const newStatus = updatedResearch.status
          if (oldStatus !== newStatus) {
            // Удаляем из старого таба
            tabsContent.value[oldStatus] = tabsContent.value[oldStatus].filter(
              (item) => item.id !== updatedResearch.id
            )
            // Добавляем в новый таб
            if (
              ['created', 'inprogress', 'done', 'audit'].includes(newStatus)
            ) {
              tabsContent.value[newStatus].unshift(
                transformResearch(updatedResearch)
              )
            }
          }
        }
      }
    )
    .subscribe()
}

onUnmounted(() => {
  if (subscription) {
    supabase.removeChannel(subscription)
  }
})

onMounted(() => {
  if (user.value) {
    fetchResearches()
    setupRealtime()
  }
})
</script>

<template>
  <div class="min-h-full">
    <header class="bg-white shadow-sm"></header>
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <nav>
          <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
              <div
                class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
              >
                <div class="flex">
                  <div class="flex space-x-4">
                    <button
                      @click="setTab('created')"
                      :class="[
                        activeTab === 'created'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-400 hover:text-black hover:bg-gray-100',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      ]"
                    >
                      Активные
                    </button>
                    <button
                      @click="setTab('inprogress')"
                      :class="[
                        activeTab === 'inprogress'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-400 hover:text-black hover:bg-gray-100',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      ]"
                    >
                      В работе
                    </button>
                    <button
                      @click="setTab('done')"
                      :class="[
                        activeTab === 'done'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-400 hover:text-black hover:bg-gray-100',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      ]"
                    >
                      Выполненные
                    </button>
                    <button
                      @click="setTab('audit')"
                      :class="[
                        activeTab === 'audit'
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-400 hover:text-black hover:bg-gray-100',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      ]"
                    >
                      Идет аудит
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div v-if="error" class="text-red-600 text-sm text-center mb-4">
          {{ error }}
        </div>
        <div v-if="loading" class="text-gray-600 text-center mt-6">
          Загрузка...
        </div>

        <div v-if="!loading && activeTab === 'created'" class="mt-6 space-y-4">
          <div
            v-for="(item, index) in tabsContent.created"
            :key="item.id"
            class="block rounded-xl border border-gray-200 p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div class="flex-1">
                <div class="flex items-center gap-3">
                  <h3 class="text-xl font-semibold text-gray-900">
                    {{ item.title }}
                  </h3>
                  <div class="flex gap-2">
                    <span
                      v-for="tag in item.tags"
                      :key="tag.text"
                      :class="[
                        tag.color === 'red'
                          ? 'bg-red-100 text-red-800 ring-red-200'
                          : '',
                        tag.color === 'blue'
                          ? 'bg-blue-100 text-blue-800 ring-blue-200'
                          : '',
                        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset',
                      ]"
                    >
                      {{ tag.text }}
                    </span>
                  </div>
                </div>
                <p class="mt-2 text-base text-gray-600 line-clamp-2">
                  {{ item.description }}
                </p>
                <div class="mt-3 flex gap-2">
                  <span
                    :class="[
                      item.timeLeft.includes('Осталось')
                        ? 'bg-yellow-100 text-yellow-800 ring-yellow-200'
                        : 'bg-gray-100 text-gray-600 ring-gray-200',
                      'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset',
                    ]"
                  >
                    {{ item.timeLeft }}
                  </span>
                </div>
              </div>
              <div class="mt-4 sm:mt-0 sm:flex sm:items-center">
                <button
                  @click="takeToWork(item.id, index)"
                  class="w-full sm:w-auto px-6 py-3 text-lg font-bold text-white rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-500 hover:to-indigo-700 shadow-md hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
                >
                  Взять в работу
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!loading && activeTab === 'inprogress'" class="mt-6">
          <NuxtLink
            v-for="item in tabsContent.inprogress"
            :key="item.id"
            :to="item.link"
            class="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 bg-white mb-4"
          >
            <div class="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
              <div class="my-4 sm:mt-0">
                <h3 class="text-lg font-medium text-pretty text-gray-900">
                  {{ item.title }}
                  <span
                    v-for="tag in item.tags"
                    :key="tag.text"
                    :class="[
                      tag.color === 'blue'
                        ? 'bg-blue-50 text-blue-700 inset-ring inset-ring-blue-700/10'
                        : '',
                      'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium mr-2',
                    ]"
                  >
                    {{ tag.text }}
                  </span>
                </h3>
                <p class="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
                  {{ item.description }}
                </p>
              </div>
            </div>
            <span
              :class="[
                item.timeLeft.includes('Осталось')
                  ? 'bg-yellow-50 text-yellow-800 inset-ring inset-ring-yellow-600/20'
                  : 'bg-gray-50 text-gray-600 inset-ring inset-ring-gray-500/10',
                'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
              ]"
            >
              {{ item.timeLeft }}
            </span>
          </NuxtLink>
        </div>

        <div v-if="!loading && activeTab === 'done'" class="mt-6">
          <NuxtLink
            v-for="item in tabsContent.done"
            :key="item.id"
            :to="item.link"
            class="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 bg-white mb-4"
          >
            <div class="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
              <div class="my-4 sm:mt-0">
                <h3 class="text-lg font-medium text-pretty text-gray-900">
                  {{ item.title }}
                  <span
                    v-for="tag in item.tags"
                    :key="tag.text"
                    :class="[
                      tag.color === 'red'
                        ? 'bg-red-100 text-red-800 ring-red-200'
                        : '',
                      tag.color === 'blue'
                        ? 'bg-blue-100 text-blue-800 ring-blue-200'
                        : '',
                      'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset',
                    ]"
                  >
                    {{ tag.text }}
                  </span>
                </h3>
                <p class="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
                  {{ item.description }}
                </p>
              </div>
            </div>
            <span
              :class="[
                item.timeLeft.includes('Осталось')
                  ? 'bg-yellow-50 text-yellow-800 inset-ring inset-ring-yellow-600/20'
                  : 'bg-gray-50 text-gray-600 inset-ring inset-ring-gray-500/10',
                'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
              ]"
            >
              {{ item.timeLeft }}
            </span>
          </NuxtLink>
        </div>

        <div v-if="!loading && activeTab === 'audit'" class="mt-6">
          <NuxtLink
            v-for="item in tabsContent.audit"
            :key="item.id"
            :to="item.link"
            class="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 bg-white mb-4"
          >
            <div class="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
              <div class="my-4 sm:mt-0">
                <h3 class="text-lg font-medium text-pretty text-gray-900">
                  {{ item.title }}
                  <span
                    v-for="tag in item.tags"
                    :key="tag.text"
                    :class="[
                      tag.color === 'blue'
                        ? 'bg-blue-50 text-blue-700 inset-ring inset-ring-blue-700/10'
                        : '',
                      'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium mr-2',
                    ]"
                  >
                    {{ tag.text }}
                  </span>
                </h3>
                <p class="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
                  {{ item.description }}
                </p>
              </div>
            </div>
            <span
              class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20 mr-2"
            >
              {{ item.category }}
            </span>
            <span
              :class="[
                item.timeLeft.includes('Осталось')
                  ? 'bg-yellow-50 text-yellow-800 inset-ring inset-ring-yellow-600/20'
                  : 'bg-gray-50 text-gray-600 inset-ring inset-ring-gray-500/10',
                'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
              ]"
            >
              {{ item.timeLeft }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

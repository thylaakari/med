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
        .map((task) => ({
          title: task.region,
          tags: [
            task.isUrgent ? { text: 'Срочное', color: 'red' } : null,
            { text: task.modality, color: 'blue' },
          ].filter(Boolean),
          description: `${task.sex}, ${task.patientAge} лет`,
          category: task.category,
          timeLeft:
            task.timeToEnd > 0
              ? `Осталось ${Math.floor(task.timeToEnd / 60)} минут`
              : 'Завершено',
          link: `/docres/${task.id}`,
        })),
      inprogress: data
        .filter((task) => task.status === 'inprogress')
        .map((task) => ({
          title: task.region,
          tags: [
            task.isUrgent ? { text: 'Срочное', color: 'red' } : null,
            { text: task.modality, color: 'blue' },
          ].filter(Boolean),
          description: `${task.sex}, ${task.patientAge} лет`,
          category: task.category,
          timeLeft: `Осталось ${Math.floor(task.timeToEnd / 60)} минут`,
          link: `/docres/${task.id}`,
        })),
      // done: data
      //   .filter((task) => task.status === 'done')
      //   .map((task) => ({
      //     title: task.region,
      //     tags: [{ text: task.modality, color: 'blue' }],
      //     description: `${task.sex}, ${task.patientAge} лет`,
      //     category: task.category,
      //     timeLeft: 'Завершено',
      //     link: `/docres/${task.id}`,
      //   })),
      // audit: data
      //   .filter((task) => task.status === 'audit')
      //   .map((task) => ({
      //     title: task.region,
      //     tags: [{ text: task.modality, color: 'blue' }],
      //     description: `${task.sex}, ${task.patientAge} лет`,
      //     category: task.category,
      //     timeLeft: 'В аудите',
      //     link: `/docres/${task.id}`,
      //   })),
    }
  } catch (err) {
    error.value = err.message
    console.error('Ошибка загрузки исследований:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (user.value) {
    fetchResearches()
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

        <div v-if="!loading && activeTab === 'created'" class="mt-6">
          <NuxtLink
            v-for="item in tabsContent.created"
            :key="item.title"
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
                        ? 'bg-red-50 text-red-700 inset-ring inset-ring-red-600/10'
                        : '',
                      tag.color === 'blue'
                        ? 'bg-blue-50 text-blue-700 inset-ring inset-ring-blue-700/10'
                        : '',
                      'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium  mr-2',
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
              {{ item.category }} категория
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

        <div v-if="!loading && activeTab === 'inprogress'" class="mt-6">
          <NuxtLink
            v-for="item in tabsContent.inprogress"
            :key="item.title"
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
                      'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
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
              class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 inset-ring inset-ring-yellow-600/20"
            >
              {{ item.timeLeft }}
            </span>
          </NuxtLink>
        </div>

        <div v-if="!loading && activeTab === 'done'" class="mt-6">
          <NuxtLink
            v-for="item in tabsContent.done"
            :key="item.title"
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
                      'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
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
              class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10"
            >
              {{ item.timeLeft }}
            </span>
          </NuxtLink>
        </div>

        <div v-if="!loading && activeTab === 'audit'" class="mt-6">
          <NuxtLink
            v-for="item in tabsContent.audit"
            :key="item.title"
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
                      'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
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
              class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10"
            >
              {{ item.timeLeft }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

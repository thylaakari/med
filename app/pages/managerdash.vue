<template>
  <main class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl mb-8">
        Список исследований (не в аудите)
      </h1>

      <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="column in columns"
                  :key="column.key"
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  @click="sortBy(column.key)"
                >
                  <div class="flex items-center gap-2">
                    {{ column.label }}
                    <svg
                      v-if="sortKey === column.key"
                      class="h-4 w-4"
                      :class="{ 'rotate-180': sortOrder === 'desc' }"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="research in sortedResearches"
                :key="research.id"
                class="hover:bg-gray-50 transition-colors cursor-pointer"
                @click="navigateToResearch(research.id)"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(research.created_at) }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:underline"
                >
                  {{ research.region }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ research.modality || '–' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ research.doctor }}
                </td>
              </tr>
              <tr v-if="!researches.length && !isLoading" class="text-center">
                <td colspan="9" class="px-6 py-4 text-sm text-gray-500">
                  Нет исследований для отображения
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Индикатор загрузки -->
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
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSupabaseClient, useRouter } from '#imports'

definePageMeta({
  layout: 'managerlayout',
  middleware: ['auth-role'],
  requiredRole: 'manager',
})

const supabase = useSupabaseClient()
const router = useRouter()
const researches = ref([])
const isLoading = ref(false)
const sortKey = ref('created_at')
const sortOrder = ref('desc')

const columns = [
  { key: 'created_at', label: 'Дата создания' },
  { key: 'region', label: 'Область' },
  { key: 'modality', label: 'Модальность' },
  { key: 'doctor', label: 'Доктор' },
]

async function getResearches() {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('researches')
      .select('*')
      .eq('isAudit', false)
      .eq('status', 'done')
    if (error) throw error
    researches.value = data
  } catch (error) {
    console.error('Ошибка при загрузке исследований:', error.message)
  } finally {
    isLoading.value = false
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

function sortBy(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const sortedResearches = computed(() => {
  return [...researches.value].sort((a, b) => {
    const aValue = a[sortKey.value]
    const bValue = b[sortKey.value]
    if (aValue === null || aValue === undefined) return 1
    if (bValue === null || bValue === undefined) return -1
    if (sortKey.value === 'created_at') {
      return sortOrder.value === 'asc'
        ? new Date(aValue) - new Date(bValue)
        : new Date(bValue) - new Date(aValue)
    }
    if (typeof aValue === 'string') {
      return sortOrder.value === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    return sortOrder.value === 'asc' ? aValue - bValue : bValue - aValue
  })
})

function navigateToResearch(id) {
  router.push(`/mresearch/${id}`)
}

onMounted(() => {
  getResearches()
})
</script>

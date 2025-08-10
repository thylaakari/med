<script setup>
definePageMeta({
  layout: 'doclayout',
  middleware: ['auth-role'],
  requiredRole: 'doctor',
})

const research = ref('')
const supabase = useSupabaseClient()
const user = useSupabaseUser()
const route = useRoute()
const id = route.params.id
const loading = ref(true)

async function getReserch() {
  try {
    const { data, error } = await supabase
      .from('researches')
      .select('*')
      .eq('id', id)
      .eq('doctor', user.value?.email)
      .single()
    if (error) throw error
    research.value = data
    loading.value = false
  } catch (error) {
    console.error(error)
  }
}
onMounted(async () => {
  getReserch()
})
</script>
<template>
  <header class="bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1
        class="text-3xl font-bold tracking-tight text-gray-900"
        v-if="!loading"
      >
        Аудит #{{ research.id }}
      </h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <article
        class="rounded-xl border-2 border-gray-100 bg-white mb-4"
        v-if="!loading"
      >
        <div class="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
          <div>
            <h3 class="font-medium sm:text-lg">
              {{ research.region }}
              <span
                class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10"
                >{{ research.modality }}</span
              >
            </h3>

            <div class="mt-2 sm:flex sm:items-center sm:gap-2">
              <div class="flex items-center gap-1 text-gray-500">
                <p class="text-xs">Описано за 12 минут</p>
              </div>

              <span class="hidden sm:block" aria-hidden="true">&middot;</span>

              <p class="hidden sm:block sm:text-xs sm:text-gray-500">
                Категория {{ research.category }}
              </p>
            </div>
          </div>
        </div>

        <div class="p-4 ml-10">
          <span class="text-sm font-medium text-gray-700"> Описание</span>

          <div
            class="mt-0.5 w-full resize-none rounded border border-gray-300 shadow-sm sm:text-sm p-3 bg-gray-100"
          >
            {{ research.protocol }}
          </div>
        </div>

        <div class="p-4 ml-10">
          <span class="text-sm font-medium text-gray-700"> Заключение </span>

          <div
            class="mt-0.5 w-full resize-none rounded border border-gray-300 shadow-sm sm:text-sm p-3 bg-gray-100"
          >
            {{ research.conclusion }}
          </div>
        </div>

        <div class="p-4 mt-4 mr-10">
          <span class="text-sm font-medium text-gray-700">Ответ аудитора</span>

          <div
            class="mt-0.5 w-full resize-none rounded border border-gray-300 shadow-sm sm:text-sm p-3 bg-blue-100"
          >
            {{ research.auditResponse }}
          </div>
          <div
            class="mt-0.5 w-full resize-none rounded border border-gray-300 shadow-sm sm:text-sm p-3 bg-blue-100"
          >
            {{ research.auditResult }}
          </div>
        </div>

        <!-- <div class="p-4 ml-10">
          <span class="text-sm font-medium text-gray-700"> Вы</span>

          <div
            class="mt-0.5 w-full resize-none rounded border border-gray-300 shadow-sm sm:text-sm p-3 bg-gray-100"
          >
            Че попутал криндель?
          </div>
        </div> -->

        <!-- <div class="m-4 flex gap-2">
          <input
            type="text"
            placeholder="Введите сообщение..."
            class="peer w-full rounded border border-gray-300 shadow-sm sm:text-sm p-3"
          />

          <span
            class="text-sm font-medium rounded-sm border border-gray-300 p-3 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-3 shadow-sm focus:outline-hidden"
            >Отправить</span
          >
        </div> -->
      </article>
      <div v-else>Загрузка...</div>
    </div>
  </main>
</template>

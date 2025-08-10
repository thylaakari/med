<template>
  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <article
        class="rounded-xl border-2 border-gray-100 bg-white mb-4"
        v-for="task in researches"
        :key="task.id"
      >
        <div class="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
          <h3 class="font-medium sm:text-lg">
            <NuxtLink :to="'/docaudit/' + task.id" class="hover:underline">
              {{ task.region }} #{{ task.id }}
            </NuxtLink>
          </h3>
        </div>

        <div class="flex justify-end" v-if="task.auditResult">
          <strong
            class="-me-[2px] -mb-[2px] inline-flex items-center gap-1 rounded-ss-xl rounded-ee-xl bg-blue-800 px-3 py-1.5 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>

            <span class="text-[10px] font-medium sm:text-xs">{{
              task.auditResult
            }}</span>
          </strong>
        </div>
      </article>
    </div>
  </main>
</template>

<script setup>
definePageMeta({
  layout: 'doclayout',
  middleware: ['auth-role'],
  requiredRole: 'doctor',
})

const researches = ref([]) // Реактивная переменная для хранения исследований

// Объект для маппинга статусов на текст
const statusText = {
  success: 'Успешно!',
  error: 'Хуйня, переделывай',
  warning: 'Есть вопросики',
}
const supabase = useSupabaseClient()
const user = useSupabaseUser()

async function getAuditResearches() {
  try {
    const { data, error } = await supabase
      .from('researches')
      .select('*')
      .eq('isAudit', true)
      .eq('doctor', user.value?.email)
    if (error) throw error
    researches.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getAuditResearches()
})
</script>

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
</script>

<template>
  <div class="min-h-full">
    <docheader></docheader>
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
                    <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                    <a
                      href="#"
                      class="rounded-md px-3 py-2 text-sm font-medium text-black"
                      >Активные</a
                    >
                    <a
                      href="#"
                      class="rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:text-black"
                      >В РАБоте</a
                    >
                    <a
                      href="#"
                      class="rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:text-black"
                      >Выполненные</a
                    >
                    <a
                      href="#"
                      class="rounded-md px-3 py-2 text-sm font-medium text-gray-400 hover:text-black"
                      >Идет аудит</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <a
          href="#"
          class="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 bg-white mb-4"
        >
          <div class="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
            <div class="my-4 sm:mt-0">
              <h3 class="text-lg font-medium text-pretty text-gray-900">
                Органы грудной клетки
                <span
                  class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 inset-ring inset-ring-red-600/10"
                  >Срочное</span
                >
                <span
                  class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10"
                  >МРТ</span
                >
              </h3>
              <p class="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
                Женщина, 66 лет
              </p>
            </div>
          </div>
          <span
            class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20"
            >Категория 1</span
          >
          <span
            class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 inset-ring inset-ring-yellow-600/20"
            >Осталось 6 минут</span
          >
        </a>

        <a
          href="#"
          class="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 bg-white mb-4"
        >
          <div class="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
            <div class="my-4 sm:mt-0">
              <h3 class="text-lg font-medium text-pretty text-gray-900">
                Брюшная полость
                <span
                  class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10"
                  >КТ</span
                >
              </h3>
              <p class="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
                Бабка, 98 лет
              </p>
            </div>
          </div>
          <span
            class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20"
            >Категория 2</span
          >
          <span
            class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10"
            >Осталось 13 часов</span
          >
        </a>

        <a
          href="#"
          class="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 bg-white mb-4"
        >
          <div class="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
            <div class="my-4 sm:mt-0">
              <h3 class="text-lg font-medium text-pretty text-gray-900">
                Стопа
                <span
                  class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10"
                  >Рентгенография</span
                >
              </h3>
              <p class="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
                Призывник, 18 лет
              </p>
            </div>
          </div>
          <span
            class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 inset-ring inset-ring-green-600/20"
            >Категория 3</span
          >
          <span
            class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 inset-ring inset-ring-gray-500/10"
            >Осталось 2 часа</span
          >
        </a>
      </div>
    </main>
  </div>
</template>

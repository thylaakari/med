<template>
  <header class="absolute inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-between p-6 lg:px-8">
      <div class="flex lg:flex-1">
        <NuxtLink to="/" class="-m-1.5 p-1.5">
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
            class="h-8 w-auto"
          />
        </NuxtLink>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          command="show-modal"
          commandfor="mobile-menu"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            data-slot="icon"
            aria-hidden="true"
            class="size-6"
          >
            <path
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <NuxtLink to="/" class="text-sm/6 font-semibold text-gray-900"
          >Главная</NuxtLink
        >
        <NuxtLink to="toclinics" class="text-sm/6 font-semibold text-gray-900"
          >Клиникам</NuxtLink
        >
        <NuxtLink to="todoc" class="text-sm/6 font-semibold text-gray-900"
          >Врачам</NuxtLink
        >
        <NuxtLink to="blog" class="text-sm/6 font-semibold text-gray-900"
          >Блог</NuxtLink
        >
        <div class="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            command="show-modal"
            commandfor="dialog"
            class="text-sm/6 font-semibold text-gray-900"
          >
            О компании
          </button>
        </div>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <NuxtLink
          to="auth"
          class="text-sm/6 font-semibold text-gray-900 cursor-pointer"
          >Войти <span aria-hidden="true">&rarr;</span></NuxtLink
        >
      </div>
    </nav>
    <el-dialog>
      <dialog id="mobile-menu" class="backdrop:bg-transparent lg:hidden">
        <div tabindex="0" class="fixed inset-0 focus:outline-none">
          <el-dialog-panel
            class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >
            <div class="flex items-center justify-between">
              <a href="#" class="-m-1.5 p-1.5">
                <span class="sr-only">Контора</span>
                <img
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                  class="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                command="close"
                commandfor="mobile-menu"
                class="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span class="sr-only">Close menu</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  data-slot="icon"
                  aria-hidden="true"
                  class="size-6"
                >
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="space-y-2 py-6">
                  <NuxtLink
                    to="/"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >Главная</NuxtLink
                  >
                  <NuxtLink
                    to="toclinics"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >Клиникам</NuxtLink
                  >
                  <NuxtLink
                    to="todoc"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >Врачам</NuxtLink
                  >
                  <NuxtLink
                    to="blog"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >Блог</NuxtLink
                  >
                </div>
                <div class="py-6">
                  <NuxtLink
                    to="auth"
                    class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >Войти</NuxtLink
                  >
                </div>
              </div>
            </div>
          </el-dialog-panel>
        </div>
      </dialog>
    </el-dialog>
  </header>
  <el-dialog>
    <dialog
      id="dialog"
      aria-labelledby="dialog-title"
      class="fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-transparent"
    >
      <el-dialog-backdrop
        class="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      ></el-dialog-backdrop>

      <div
        tabindex="0"
        class="flex min-h-full items-end justify-center p-4 text-center focus:outline-none sm:items-center sm:p-0"
      >
        <el-dialog-panel
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  data-slot="icon"
                  aria-hidden="true"
                  class="size-6 text-red-600"
                >
                  <path
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  id="dialog-title"
                  class="text-base font-semibold text-gray-900"
                >
                  Кто-то читает эту хуйню?
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Ебать, ты уже не прошел один из тестов, потому что нажал
                    сюда. Тебя ебет, что мы за компания??
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              command="close"
              commandfor="dialog"
              class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
            >
              Я пидарас
            </button>
            <button
              type="button"
              command="close"
              commandfor="dialog"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Сорян, бес попутал
            </button>
          </div>
        </el-dialog-panel>
      </div>
    </dialog>
  </el-dialog>
</template>

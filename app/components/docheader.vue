<script setup></script>
<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="shrink-0">
            <img
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
              class="size-8"
            />
          </div>
          <div class="md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <NuxtLink
                to="/docdash"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >Исследования</NuxtLink
              >
              <NuxtLink
                to="/docaudits"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >Аудиты</NuxtLink
              >
              <NuxtLink
                to="/docstats"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >Статистика</NuxtLink
              >
              <NuxtLink
                to="/docworktime"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >График РАБоты</NuxtLink
              >
              <NuxtLink
                to="/docreport"
                class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >Сообщить о проблеме</NuxtLink
              >
            </div>
          </div>
        </div>
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <NuxtLink
              to="/docprofile"
              class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >Профиль</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

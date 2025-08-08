<script setup></script>

<template>
  <docheader></docheader>
  <div class="max-w-6xl mx-auto">
    <!-- Фильтры -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">Параметры отчета</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Период с</label
          >
          <input
            type="date"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Период по</label
          >
          <input
            type="date"
            class="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div class="flex items-end">
          <button
            class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium"
          >
            Применить
          </button>
        </div>
      </div>
    </div>

    <!-- Основные метрики -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Исследования -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Всего исследований</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">1,248</p>
            <p class="text-sm text-green-600 mt-1">+12% за период</p>
          </div>
          <div class="bg-blue-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Аудиты -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Аудиты (успешные)</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">94%</p>
            <p class="text-sm text-green-600 mt-1">36/38 исследований</p>
          </div>
          <div class="bg-green-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Заработок -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Заработано</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">248,500 ₽</p>
            <p class="text-sm text-green-600 mt-1">+18% за период</p>
          </div>
          <div class="bg-purple-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Штрафы -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-500">Штрафы</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">2,500 ₽</p>
            <p class="text-sm text-red-600 mt-1">2 нарушения</p>
          </div>
          <div class="bg-red-100 p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Графики и детализация -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Часы работы -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-700 mb-4">Часы работы</h2>
        <div class="flex items-center justify-between mb-4">
          <div>
            <p class="text-sm text-gray-500">Всего часов</p>
            <p class="text-2xl font-bold text-gray-800">168 ч</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Среднее в день</p>
            <p class="text-2xl font-bold text-gray-800">8.4 ч</p>
          </div>
        </div>
        <div class="space-y-3">
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-gray-700"
                >Дневные смены</span
              >
              <span class="text-sm font-medium text-gray-700">112 ч</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                class="bg-blue-600 h-2.5 rounded-full"
                style="width: 67%"
              ></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between mb-1">
              <span class="text-sm font-medium text-gray-700"
                >Ночные смены</span
              >
              <span class="text-sm font-medium text-gray-700">56 ч</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5">
              <div
                class="bg-purple-600 h-2.5 rounded-full"
                style="width: 33%"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Детализация аудитов -->
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">
        Детализация аудитов
      </h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Дата
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Тип исследования
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Результат
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Комментарий
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                15.05.2023
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                КТ головного мозга
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >Успешно</span
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Без замечаний
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                18.05.2023
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Рентген грудной клетки
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                  >Неуспешно</span
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Неполное описание
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                22.05.2023
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                МРТ позвоночника
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >Успешно</span
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                Отличное качество
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Штрафы -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-700 mb-4">
        Штрафы и нарушения
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="border border-gray-200 rounded-lg p-4">
          <div class="flex items-start">
            <div class="bg-red-100 p-2 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-gray-900 mb-1">Опоздание</h3>
              <p class="text-sm text-gray-500">12.05.2023 - 30 минут</p>
              <p class="text-sm text-gray-700 mt-1">Штраф: 500 ₽</p>
            </div>
          </div>
        </div>
        <div class="border border-gray-200 rounded-lg p-4">
          <div class="flex items-start">
            <div class="bg-red-100 p-2 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-gray-900 mb-1">Неуспешный аудит</h3>
              <p class="text-sm text-gray-500">18.05.2023 - Рентген</p>
              <p class="text-sm text-gray-700 mt-1">Штраф: 2,000 ₽</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

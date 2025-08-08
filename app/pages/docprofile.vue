<script setup>
definePageMeta({
  layout: 'doclayout',
})
const supabase = useSupabaseClient()

async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    navigateTo('/auth')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-4 md:p-6">
    <!-- Шапка -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">
        <i class="fas fa-user-md text-blue-500 mr-2"></i>
        Мой профиль
      </h1>
      <NuxtLink
        to="/docsettings"
        class="text-sm text-blue-600 hover:text-blue-800 flex items-center"
      >
        <i class="fas fa-cog mr-1"></i> Настройки
      </NuxtLink>
    </div>

    <!-- Основной контент -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Левая колонка - аватар и основная информация -->
      <div class="space-y-6">
        <!-- Блок с аватаром -->
        <div class="bg-white rounded-lg shadow-md p-6 text-center">
          <div class="avatar-upload mx-auto mb-4">
            <div
              class="w-32 h-32 rounded-full bg-gray-200 mx-auto overflow-hidden relative"
            >
              <img
                id="avatarPreview"
                src="https://via.placeholder.com/150"
                alt="Аватар"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-200"
              >
                <i class="fas fa-camera text-white text-2xl"></i>
              </div>
            </div>
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              class="hidden"
            />
          </div>
          <h2 class="text-xl font-bold text-gray-800">Иванов Иван Иванович</h2>
          <p class="text-gray-600">Врач-рентгенолог</p>
          <p class="text-sm text-gray-500 mt-2">
            <i class="fas fa-hospital mr-1"></i> Городская больница №1
          </p>
          <div class="mt-4 flex justify-center space-x-2">
            <button
              @click="signOut"
              class="w-full px-4 py-2 text-sm text-red-700 focus:bg-gray-100 focus:outline-hidden"
            >
              Выйти нахер
            </button>
          </div>
        </div>

        <!-- Статистика -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-medium text-gray-700 mb-4 flex items-center">
            <i class="fas fa-chart-line text-blue-500 mr-2"></i>
            Моя статистика
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Стаж работы</span>
              <span class="font-medium">8 лет 3 мес</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Исследований</span>
              <span class="font-medium">1,248</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Рейтинг</span>
              <div class="flex items-center">
                <span class="font-medium mr-2">4.8</span>
                <div class="flex text-yellow-400">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star-half-alt"></i>
                </div>
              </div>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Аудитов пройдено</span>
              <span class="font-medium">94%</span>
            </div>
          </div>
        </div>

        <!-- Контакты -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-medium text-gray-700 mb-4 flex items-center">
            <i class="fas fa-address-book text-blue-500 mr-2"></i>
            Контакты
          </h3>
          <div class="space-y-3">
            <div class="flex items-start">
              <i class="fas fa-phone-alt text-gray-500 mt-1 mr-3"></i>
              <div>
                <p class="text-gray-600">Рабочий телефон</p>
                <a
                  href="tel:+78001234567"
                  class="font-medium hover:text-blue-600"
                  >+7 (800) 123-45-67</a
                >
              </div>
            </div>
            <div class="flex items-start">
              <i class="fas fa-envelope text-gray-500 mt-1 mr-3"></i>
              <div>
                <p class="text-gray-600">Электронная почта</p>
                <a
                  href="mailto:i.ivanov@hospital.ru"
                  class="font-medium hover:text-blue-600"
                  >i.ivanov@hospital.ru</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Центральная колонка - основная информация -->
      <div class="lg:col-span-2 space-y-6">
        <!-- О себе -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-start mb-4">
            <h3 class="font-medium text-gray-700 flex items-center">
              <i class="fas fa-user-edit text-blue-500 mr-2"></i>
              О себе
            </h3>
          </div>
          <div class="prose max-w-none text-gray-700">
            <p>
              Специализация: лучевая диагностика, компьютерная томография,
              магнитно-резонансная томография.
            </p>
            <p class="mt-2">
              Окончил Первый Московский государственный медицинский университет
              им. И.М. Сеченова в 2015 году.
            </p>
            <p class="mt-2">Сертификаты:</p>
            <ul class="list-disc pl-5 mt-1">
              <li>Современные методы лучевой диагностики (2020)</li>
              <li>КТ-ангиография (2021)</li>
              <li>МРТ в неврологии (2022)</li>
            </ul>
          </div>
        </div>

        <!-- Расписание -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-start mb-4">
            <h3 class="font-medium text-gray-700 flex items-center">
              <i class="fas fa-calendar-alt text-blue-500 mr-2"></i>
              Мое расписание
            </h3>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    День
                  </th>
                  <th
                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    Время
                  </th>
                  <th
                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    Тип работы
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-4 py-3 whitespace-nowrap">Понедельник</td>
                  <td class="px-4 py-3 whitespace-nowrap">08:00 - 16:00</td>
                  <td class="px-4 py-3 whitespace-nowrap">КТ исследования</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 whitespace-nowrap">Вторник</td>
                  <td class="px-4 py-3 whitespace-nowrap">09:00 - 17:00</td>
                  <td class="px-4 py-3 whitespace-nowrap">МРТ исследования</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 whitespace-nowrap">Среда</td>
                  <td class="px-4 py-3 whitespace-nowrap">12:00 - 20:00</td>
                  <td class="px-4 py-3 whitespace-nowrap">Консультации</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 whitespace-nowrap">Четверг</td>
                  <td class="px-4 py-3 whitespace-nowrap">08:00 - 16:00</td>
                  <td class="px-4 py-3 whitespace-nowrap">КТ исследования</td>
                </tr>
                <tr>
                  <td class="px-4 py-3 whitespace-nowrap">Пятница</td>
                  <td class="px-4 py-3 whitespace-nowrap">09:00 - 15:00</td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    Аудит исследований
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Последние активности -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="font-medium text-gray-700 mb-4 flex items-center">
            <i class="fas fa-history text-blue-500 mr-2"></i>
            Последние активности
          </h3>
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="bg-green-100 p-2 rounded-full mr-3">
                <i class="fas fa-check text-green-600"></i>
              </div>
              <div>
                <p class="font-medium">Завершено исследование КТ #2456</p>
                <p class="text-sm text-gray-500">Сегодня, 14:32</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="bg-blue-100 p-2 rounded-full mr-3">
                <i class="fas fa-file-upload text-blue-600"></i>
              </div>
              <div>
                <p class="font-medium">Загружен отчет по МРТ #1892</p>
                <p class="text-sm text-gray-500">Вчера, 18:15</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="bg-yellow-100 p-2 rounded-full mr-3">
                <i class="fas fa-user-check text-yellow-600"></i>
              </div>
              <div>
                <p class="font-medium">Принята смена у Петрова П.П.</p>
                <p class="text-sm text-gray-500">Вчера, 08:00</p>
              </div>
            </div>
            <div class="flex items-start">
              <div class="bg-purple-100 p-2 rounded-full mr-3">
                <i class="fas fa-certificate text-purple-600"></i>
              </div>
              <div>
                <p class="font-medium">Получен новый сертификат</p>
                <p class="text-sm text-gray-500">3 дня назад</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

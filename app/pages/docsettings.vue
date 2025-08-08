<template>
  <div class="max-w-5xl mx-auto p-4 md:p-6">
    <!-- Шапка -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-gray-800">
        <i class="fas fa-cog text-blue-500 mr-2"></i>
        Настройки профиля
      </h1>
    </div>

    <!-- Основной контент -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <!-- Табы -->
      <div class="border-b border-gray-200">
        <nav class="flex flex-col sm:flex-row">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'tab-button py-4 px-6 text-sm font-medium text-center border-b-2',
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent hover:text-blue-600 hover:border-blue-300',
            ]"
          >
            <i :class="tab.icon + ' mr-2'"></i>{{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Контент табов -->
      <div class="p-6">
        <!-- Личные данные -->
        <div v-show="activeTab === 'profile'">
          <form @submit.prevent="saveProfile">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Аватар -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Фотография профиля</label
                >
                <div class="flex items-center">
                  <div class="avatar-upload mr-4">
                    <div
                      class="w-20 h-20 rounded-full bg-gray-200 overflow-hidden relative"
                    >
                      <img
                        :src="
                          avatarPreview || 'https://via.placeholder.com/150'
                        "
                        alt="Аватар"
                        class="w-full h-full object-cover"
                      />
                      <div
                        class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition duration-200"
                      >
                        <i class="fas fa-camera text-white"></i>
                      </div>
                    </div>
                    <input
                      type="file"
                      ref="avatarInput"
                      accept="image/*"
                      class="hidden"
                      @change="handleAvatarUpload"
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      @click="$refs.avatarInput.click()"
                      class="text-sm text-blue-600 hover:text-blue-800 mr-3"
                    >
                      Изменить
                    </button>
                    <button
                      type="button"
                      @click="removeAvatar"
                      class="text-sm text-red-600 hover:text-red-800"
                    >
                      Удалить
                    </button>
                    <p class="text-xs text-gray-500 mt-1">
                      Рекомендуемый размер: 200x200 px
                    </p>
                  </div>
                </div>
              </div>

              <!-- Основная информация -->
              <div>
                <label
                  for="lastName"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Фамилия</label
                >
                <input
                  type="text"
                  id="lastName"
                  v-model="profile.lastName"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  for="firstName"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Имя</label
                >
                <input
                  type="text"
                  id="firstName"
                  v-model="profile.firstName"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  for="middleName"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Отчество</label
                >
                <input
                  type="text"
                  id="middleName"
                  v-model="profile.middleName"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  for="position"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Должность</label
                >
                <input
                  type="text"
                  id="position"
                  v-model="profile.position"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  for="department"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Отделение</label
                >
                <select
                  id="department"
                  v-model="profile.department"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="radiology">
                    Отделение лучевой диагностики
                  </option>
                  <option value="xray">Рентгенологическое отделение</option>
                  <option value="ct">КТ отделение</option>
                  <option value="mri">МРТ отделение</option>
                </select>
              </div>
              <div>
                <label
                  for="cabinet"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Кабинет</label
                >
                <input
                  type="text"
                  id="cabinet"
                  v-model="profile.cabinet"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Рабочий телефон</label
                >
                <input
                  type="tel"
                  id="phone"
                  v-model="profile.phone"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 mb-1"
                  >Рабочая почта</label
                >
                <input
                  type="email"
                  id="email"
                  v-model="profile.email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div class="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                @click="resetProfile"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Сохранить изменения
              </button>
            </div>
          </form>
        </div>

        <!-- Безопасность -->
        <div v-show="activeTab === 'security'">
          <form @submit.prevent="saveSecurity" class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                Смена пароля
              </h3>
              <div class="space-y-4">
                <div>
                  <label
                    for="currentPassword"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Текущий пароль</label
                  >
                  <input
                    type="password"
                    id="currentPassword"
                    v-model="security.currentPassword"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    for="newPassword"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Новый пароль</label
                  >
                  <input
                    type="password"
                    id="newPassword"
                    v-model="security.newPassword"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <p class="text-xs text-gray-500 mt-1">
                    Минимум 8 символов, включая цифры и специальные знаки
                  </p>
                </div>
                <div>
                  <label
                    for="confirmPassword"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Подтвердите новый пароль</label
                  >
                  <input
                    type="password"
                    id="confirmPassword"
                    v-model="security.confirmPassword"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                Двухфакторная аутентификация
              </h3>
              <div
                class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p class="font-medium">SMS подтверждение</p>
                  <p class="text-sm text-gray-500">
                    Код будет отправлен на ваш рабочий телефон
                  </p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="security.twoFactorEnabled"
                    class="sr-only peer"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                  ></div>
                </label>
              </div>
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Обновить настройки безопасности
              </button>
            </div>
          </form>
        </div>

        <!-- Уведомления -->
        <div v-show="activeTab === 'notifications'">
          <form @submit.prevent="saveNotifications" class="space-y-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                Настройки уведомлений
              </h3>
              <div class="space-y-4">
                <div
                  v-for="channel in notificationChannels"
                  :key="channel.id"
                  class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p class="font-medium">{{ channel.name }}</p>
                    <p class="text-sm text-gray-500">
                      {{ channel.description }}
                    </p>
                  </div>
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      v-model="notifications.channels[channel.id]"
                      class="sr-only peer"
                    />
                    <div
                      class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                    ></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">
                Типы уведомлений
              </h3>
              <div class="space-y-4">
                <div
                  v-for="type in notificationTypes"
                  :key="type.id"
                  class="p-4 bg-gray-50 rounded-lg"
                >
                  <label class="flex items-start">
                    <input
                      type="checkbox"
                      v-model="notifications.types[type.id]"
                      class="mt-1 mr-3"
                    />
                    <div>
                      <p class="font-medium">{{ type.name }}</p>
                      <p class="text-sm text-gray-500">
                        {{ type.description }}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Сохранить настройки
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'doclayout',
})

// Состояние табов
const tabs = ref([
  { id: 'profile', name: 'Личные данные', icon: 'fas fa-user' },
  { id: 'security', name: 'Безопасность', icon: 'fas fa-lock' },
  { id: 'notifications', name: 'Уведомления', icon: 'fas fa-bell' },
])

const activeTab = ref('profile')

// Данные профиля
const profile = ref({
  lastName: 'Иванов',
  firstName: 'Иван',
  middleName: 'Иванович',
  position: 'Врач-рентгенолог',
  department: 'radiology',
  cabinet: '317',
  phone: '+78001234567',
  email: 'i.ivanov@hospital.ru',
})

const initialProfile = JSON.parse(JSON.stringify(profile.value))

// Аватар
const avatarPreview = ref(null)
const avatarInput = ref(null)

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeAvatar = () => {
  avatarPreview.value = null
  if (avatarInput.value) {
    avatarInput.value.value = ''
  }
}

// Безопасность
const security = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  twoFactorEnabled: true,
})

// Уведомления
const notificationChannels = ref([
  {
    id: 'email',
    name: 'Электронная почта',
    description: 'Получать уведомления на email',
  },
  {
    id: 'sms',
    name: 'SMS уведомления',
    description: 'Получать важные уведомления по SMS',
  },
  {
    id: 'push',
    name: 'Push-уведомления',
    description: 'Получать уведомления в мобильном приложении',
  },
])

const notificationTypes = ref([
  {
    id: 'newStudies',
    name: 'Новые исследования',
    description: 'Уведомлять о новых назначенных исследованиях',
  },
  {
    id: 'auditResults',
    name: 'Результаты аудитов',
    description: 'Уведомлять о результатах проверки исследований',
  },
  {
    id: 'scheduleChanges',
    name: 'Изменения в расписании',
    description: 'Уведомлять об изменениях в рабочем графике',
  },
  {
    id: 'system',
    name: 'Системные уведомления',
    description: 'Важные обновления и сообщения от администрации',
  },
])

const notifications = ref({
  channels: {
    email: true,
    sms: false,
    push: true,
  },
  types: {
    newStudies: true,
    auditResults: true,
    scheduleChanges: false,
    system: true,
  },
})

// Предпочтения
const preferences = ref({
  language: 'ru',
  timezone: '+3',
  dateFormat: 'dd.mm.yyyy',
  timeFormat: '24',
  theme: 'light',
  density: 'normal',
})

// Методы сохранения
const saveProfile = async () => {
  try {
    // Здесь будет вызов API для сохранения профиля
    console.log('Профиль сохранен:', profile.value)
    alert('Настройки профиля успешно сохранены!')
    initialProfile = JSON.parse(JSON.stringify(profile.value))
  } catch (error) {
    console.error('Ошибка сохранения профиля:', error)
    alert('Произошла ошибка при сохранении профиля')
  }
}

const saveSecurity = async () => {
  if (security.value.newPassword !== security.value.confirmPassword) {
    alert('Новый пароль и подтверждение не совпадают')
    return
  }

  try {
    // Здесь будет вызов API для сохранения настроек безопасности
    console.log('Настройки безопасности сохранены:', security.value)
    alert('Настройки безопасности успешно обновлены!')
    security.value.currentPassword = ''
    security.value.newPassword = ''
    security.value.confirmPassword = ''
  } catch (error) {
    console.error('Ошибка сохранения настроек безопасности:', error)
    alert('Произошла ошибка при обновлении настроек безопасности')
  }
}

const saveNotifications = async () => {
  try {
    // Здесь будет вызов API для сохранения настроек уведомлений
    console.log('Настройки уведомлений сохранены:', notifications.value)
    alert('Настройки уведомлений успешно сохранены!')
  } catch (error) {
    console.error('Ошибка сохранения настроек уведомлений:', error)
    alert('Произошла ошибка при сохранении настроек уведомлений')
  }
}

const savePreferences = async () => {
  try {
    // Здесь будет вызов API для сохранения предпочтений
    console.log('Предпочтения сохранены:', preferences.value)
    alert('Настройки предпочтений успешно применены!')
  } catch (error) {
    console.error('Ошибка сохранения предпочтений:', error)
    alert('Произошла ошибка при применении настроек предпочтений')
  }
}

// Методы сброса
const resetProfile = () => {
  profile.value = JSON.parse(JSON.stringify(initialProfile))
}

const resetPreferences = () => {
  preferences.value = {
    language: 'ru',
    timezone: '+3',
    dateFormat: 'dd.mm.yyyy',
    timeFormat: '24',
    theme: 'light',
    density: 'normal',
  }
}
</script>

<style scoped>
.avatar-upload {
  position: relative;
  display: inline-block;
}

.avatar-upload input[type='file'] {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  cursor: pointer;
}
</style>

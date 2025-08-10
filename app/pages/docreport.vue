<script setup>
import { v4 as uuidv4 } from 'uuid'

definePageMeta({
  layout: 'doclayout',
  middleware: ['auth-role'],
  requiredRole: 'doctor',
})

const supabase = useSupabaseClient()

// Check if user is authenticated
const {
  data: { user },
} = await supabase.auth.getUser()
if (!user) {
  throw new Error('User not authenticated')
}

// Form data
const problemType = ref('technical')
const problemDescription = ref('')
const files = ref([])

// Handle file selection
const handleFileChange = (event) => {
  const selectedFiles = Array.from(event.target.files)
  if (selectedFiles.length + files.value.length > 3) {
    alert('Максимум 3 файла')
    return
  }
  selectedFiles.forEach((file) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('Файл превышает 5MB')
      return
    }
    files.value.push(file)
  })
  updateFileList()
}

// Update file list display
const updateFileList = () => {
  const fileList = document.getElementById('fileList')
  fileList.innerHTML = ''
  files.value.forEach((file, index) => {
    const fileItem = document.createElement('div')
    fileItem.className =
      'flex items-center justify-between p-2 bg-gray-100 rounded'
    fileItem.innerHTML = `
      <span>${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</span>
      <button type="button" class="text-red-500 hover:text-red-700" data-index="${index}">
        <i class="fas fa-trash"></i>
      </button>
    `
    fileList.appendChild(fileItem)
  })
  fileList.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      const index = parseInt(button.dataset.index)
      files.value.splice(index, 1)
      updateFileList()
    })
  })
}

// Handle form submission
const handleSubmit = async (event) => {
  event.preventDefault()

  if (!problemDescription.value.trim()) {
    alert('Пожалуйста, заполните описание проблемы')
    return
  }

  try {
    // Upload files to Supabase storage
    const fileUrls = []
    for (const file of files.value) {
      const fileName = `${uuidv4()}_${file.name}`
      const { data, error } = await supabase.storage
        .from('support-files')
        .upload(fileName, file, {
          upsert: false,
        })

      if (error) {
        console.error('Storage error:', error)
        throw new Error(`Failed to upload file ${file.name}: ${error.message}`)
      }

      // Get public URL for the uploaded file
      const {
        data: { publicUrl },
      } = supabase.storage.from('support-files').getPublicUrl(fileName)
      fileUrls.push(publicUrl)
    }

    // Insert form data into Supabase
    const { data, error } = await supabase.from('support_requests').insert({
      problem_type: problemType.value,
      description: problemDescription.value,
      files: fileUrls,
      created_at: new Date().toISOString(),
      status: 'pending',
      user_id: user.id, // Include user ID for RLS
    })

    if (error) {
      console.error('Database error:', error)
      throw new Error(`Failed to insert support request: ${error.message}`)
    }

    alert('Сообщение успешно отправлено!')
    // Reset form
    problemDescription.value = ''
    files.value = []
    problemType.value = 'technical'
    document.getElementById('problemForm').reset()
    updateFileList()
  } catch (error) {
    console.error('Error submitting form:', error)
    alert(`Ошибка при отправке сообщения: ${error.message}`)
  }
}
</script>

<template>
  <div class="max-w-3xl mx-auto p-4 md:p-6">
    <!-- Шапка -->
    <div class="flex items-center justify-between mb-8"></div>

    <!-- Форма -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <form id="problemForm" @submit="handleSubmit">
        <!-- Тип проблемы -->
        <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2"
            >Тип проблемы</label
          >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label
              class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name="problemType"
                value="technical"
                v-model="problemType"
                class="mr-2"
              />
              <div>
                <span class="font-medium">Техническая</span>
                <p class="text-sm text-gray-500">
                  Оборудование, ПО, соединение
                </p>
              </div>
            </label>
            <label
              class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name="problemType"
                value="medical"
                v-model="problemType"
                class="mr-2"
              />
              <div>
                <span class="font-medium">Медицинская</span>
                <p class="text-sm text-gray-500">
                  Качество исследований, диагнозы
                </p>
              </div>
            </label>
            <label
              class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
            >
              <input
                type="radio"
                name="problemType"
                value="other"
                v-model="problemType"
                class="mr-2"
              />
              <div>
                <span class="font-medium">Другое</span>
                <p class="text-sm text-gray-500">Иные вопросы</p>
              </div>
            </label>
          </div>
        </div>

        <!-- Описание проблемы -->
        <div class="mb-6">
          <label
            for="problemDescription"
            class="block text-gray-700 font-medium mb-2"
          >
            Подробное описание проблемы <span class="text-red-500">*</span>
          </label>
          <textarea
            id="problemDescription"
            v-model="problemDescription"
            rows="5"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Опишите проблему как можно подробнее..."
            required
          ></textarea>
        </div>

        <!-- Прикрепление файлов -->
        <!-- <div class="mb-6">
          <label class="block text-gray-700 font-medium mb-2"
            >Прикрепить файлы (если есть)</label
          >
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
          >
            <input
              type="file"
              id="fileUpload"
              class="hidden"
              multiple
              @change="handleFileChange"
            />
            <label for="fileUpload" class="cursor-pointer">
              <i
                class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"
              ></i>
              <p class="text-gray-500">
                Перетащите файлы сюда или нажмите для выбора
              </p>
              <p class="text-sm text-gray-400 mt-1">
                Максимум 3 файла, до 5MB каждый
              </p>
            </label>
          </div>
          <div id="fileList" class="mt-2 space-y-2"></div>
        </div> -->

        <!-- Кнопки -->
        <div class="flex flex-col sm:flex-row justify-end gap-3">
          <button
            type="button"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            @click="
              () => {
                problemDescription = ''
                files = []
                document.getElementById('problemForm').reset()
                updateFileList()
              }
            "
          >
            Отмена
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
          >
            <i class="fas fa-paper-plane mr-2"></i> Отправить сообщение
          </button>
        </div>
      </form>
    </div>

    <!-- Информационный блок -->
    <div class="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
      <div class="flex">
        <div class="flex-shrink-0">
          <i class="fas fa-info-circle text-blue-500 mt-1 mr-3"></i>
        </div>
        <div>
          <h3 class="text-sm font-medium text-blue-800">
            Как мы обрабатываем ваши обращения
          </h3>
          <div class="mt-2 text-sm text-blue-700">
            <p>
              • Технические проблемы обычно решаются в течение 1-2 рабочих дней
            </p>
            <p>
              • Медицинские вопросы требуют проверки и могут занять до 5 дней
            </p>
            <p>
              • В критических случаях звоните по телефону:
              <a href="tel:+78001234567" class="font-semibold hover:underline"
                >8-800-123-45-67</a
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

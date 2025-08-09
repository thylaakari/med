<script setup>
definePageMeta({
  layout: 'doclayout',
  middleware: ['auth-role'],
  requiredRole: 'doctor',
})
</script>
<template>
  <header class="bg-white shadow-sm">
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">
        Аудит #1488
      </h1>
    </div>
  </header>
  <main>
    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <article class="rounded-xl border-2 border-gray-100 bg-white mb-4">
        <div class="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
          <div>
            <h3 class="font-medium sm:text-lg">
              Коленно-локтевой сустав
              <span
                class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10"
                >ПЭТ КТ</span
              >
            </h3>

            <div class="mt-2 sm:flex sm:items-center sm:gap-2">
              <div class="flex items-center gap-1 text-gray-500">
                <p class="text-xs">Описано за 12 минут</p>
              </div>

              <span class="hidden sm:block" aria-hidden="true">&middot;</span>

              <p class="hidden sm:block sm:text-xs sm:text-gray-500">
                Категория 2
              </p>
            </div>
          </div>
        </div>

        <div class="p-4 ml-10">
          <span class="text-sm font-medium text-gray-700"> Описание</span>

          <div
            class="mt-0.5 w-full resize-none rounded border border-gray-300 shadow-sm sm:text-sm p-3 bg-gray-100"
          >
            Базальные отделы легких без признаков опухолевого роста. Желудок без
            признаков опухолевого роста. Печень не увеличена. Внутрипеченочные
            протоки не расширены. Образований в печени нет. Желчный пузырь не
            изменен. Общий желчный проток не расширен. Поджелудочная железа
            однородная, без признаков опухолевого роста. Селезенка не увеличена,
            без признаков опухолевого роста. Надпочечники без признаков
            опухолевого роста. Почки одинаково накапливают контрастное вещество.
            Экскреция почек сохранена. Образований в почках нет. Мочевой пузырь
            без признаков опухолевого роста. Клетчатка брюшной полости не
            изменена. Данных за лимфаденопатию нет. Образований в брюшной
            полости не выявлено. Кишечник не может быть оценен без
            предварительной подготовки. Метод выбора для исследования толстой
            кишки - эндоскопия. Семенные пузырьки и предстательная железа могут
            быть оценены на трансректальном УЗИ или МРТ. Гемодинамически
            значимых стенозов аорты и ее ветвей не выявлено.
            Костно-деструктивных изменений не выявлено. Дегенеративные изменения
            в позвоночнике.
          </div>
        </div>

        <div class="p-4 ml-10">
          <span class="text-sm font-medium text-gray-700"> Заключение </span>

          <div
            class="mt-0.5 w-full resize-none rounded border border-gray-300 shadow-sm sm:text-sm p-3 bg-gray-100"
          >
            Все заебись
          </div>
        </div>

        <div class="p-4 mt-4 mr-10">
          <span class="text-sm font-medium text-gray-700">Ответ аудитора</span>

          <div
            class="mt-0.5 w-full resize-none rounded border border-gray-300 shadow-sm sm:text-sm p-3 bg-blue-100"
          >
            Хуйню написал про ЖКТ
          </div>
        </div>

        <div class="p-4 ml-10">
          <span class="text-sm font-medium text-gray-700"> Вы</span>

          <div
            class="mt-0.5 w-full resize-none rounded border border-gray-300 shadow-sm sm:text-sm p-3 bg-gray-100"
          >
            Че попутал криндель?
          </div>
        </div>

        <div class="m-4 flex gap-2">
          <input
            type="text"
            placeholder="Введите сообщение..."
            class="peer w-full rounded border border-gray-300 shadow-sm sm:text-sm p-3"
          />

          <span
            class="text-sm font-medium rounded-sm border border-gray-300 p-3 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-3 shadow-sm focus:outline-hidden"
            >Отправить</span
          >
        </div>
      </article>
    </div>
  </main>
</template>

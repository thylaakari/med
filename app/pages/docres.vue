<script setup>
definePageMeta({
  layout: 'doclayout',
  middleware: ['auth-role'],
  requiredRole: 'doctor',
})
</script>

<template>
  <div class="min-h-full">
    <header class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Женщина, 66 лет
        </h1>
      </div>
    </header>
    <main>
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div
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
                <strong>Анамнез: </strong>В поликлинике порекомендовали пройти
                МРТ легких на предмет метастазов липомы правого мизинца на ноге
                (удален в 1922 году)
              </p>

              <div
                class="flex items-center rounded-md bg-blue-50 my-3 px-3 py-2 text-xs font-medium text-blue-700 inset-ring inset-ring-blue-700/10"
              >
                <select
                  name="Headline"
                  id="Headline"
                  class="w-full rounded-lg text-gray-700 sm:text-sm"
                >
                  <option value="">Выбрать шаблон</option>

                  <optgroup label="Рентген">
                    <option value="AK">Стопа</option>
                    <option value="AK">ОГК</option>
                    <option value="AK">ОБП</option>
                  </optgroup>

                  <optgroup label="КТ">
                    <option value="BBK">Голова</option>
                    <option value="BG">Жопа</option>
                  </optgroup>

                  <optgroup label="МРТ">
                    <option value="EC">ОБП</option>
                    <option value="EC">Колено</option>
                    <option value="EC">Голова</option>
                    <option value="EC">Таз</option>
                  </optgroup>
                </select>
              </div>

              <label for="Notes">
                <span class="text-sm font-medium text-gray-700"> Описание</span>

                <textarea
                  id="Notes"
                  class="mt-0.5 w-full resize-none rounded border border-gray-300 shadow-sm sm:text-sm p-3 h-96"
                  rows="4"
                >
Базальные отделы легких без признаков опухолевого роста.
Желудок без признаков опухолевого роста.
Печень не увеличена. Внутрипеченочные протоки не расширены. Образований в печени нет.
Желчный пузырь не изменен. Общий желчный проток не расширен.
Поджелудочная железа однородная, без признаков опухолевого роста.
Селезенка не увеличена, без признаков опухолевого роста.
Надпочечники без признаков опухолевого роста.
Почки одинаково накапливают контрастное вещество. Экскреция почек сохранена. Образований в почках нет.
Мочевой пузырь без признаков опухолевого роста.
Клетчатка брюшной полости не изменена. Данных за лимфаденопатию нет. Образований в брюшной полости не выявлено.
Кишечник не может быть оценен без предварительной подготовки. Метод выбора для исследования толстой кишки - эндоскопия.
Семенные пузырьки и предстательная железа могут быть оценены на трансректальном УЗИ или МРТ.
Гемодинамически значимых стенозов аорты и ее ветвей не выявлено.
Костно-деструктивных изменений не выявлено. Дегенеративные изменения в позвоночнике.
</textarea
                >
              </label>

              <div>
                <label for="Notes">
                  <span class="text-sm font-medium text-gray-700">
                    Заключение
                  </span>

                  <textarea
                    id="Notes"
                    class="mt-0.5 w-full resize-none rounded border border-gray-300 shadow-sm sm:text-sm p-3"
                    rows="4"
                  >
Все заебись</textarea
                  >
                </label>

                <div class="mt-1.5 flex items-center justify-end gap-2">
                  <a
                    class="group inline-block rounded-sm bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:ring-3 focus:outline-hidden"
                    href="#"
                  >
                    <span
                      class="block rounded-xs bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent"
                    >
                      Очень красивая кнопка ОТПРАВИТЬ
                    </span>
                  </a>
                </div>
              </div>
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
        </div>
      </div>
    </main>
  </div>
</template>

<template>
  <headermain></headermain>

  <div class="px-2 py-10 mt-40">
    <div id="features" class="mx-auto max-w-6xl">
      <p class="text-center text-base font-semibold leading-7 text-primary-500">
        Врач
      </p>
      <h2
        class="text-center font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl"
      >
        Долго будем хуйней страдать?
      </h2>
      <ul
        class="mt-16 grid grid-cols-1 gap-6 text-center text-slate-700 md:grid-cols-3"
      >
        <li class="rounded-xl bg-white px-6 py-8 shadow-sm">
          <h3 class="my-3 font-display font-medium">Увеличь заработок</h3>
          <p class="mt-1.5 text-sm leading-6 text-secondary-500">
            Берешь самые жирные исследования и получаешь бабос сидя на жопе
          </p>
        </li>
        <li class="rounded-xl bg-white px-6 py-8 shadow-sm">
          <h3 class="my-3 font-display font-medium">Сидеть на жопе</h3>
          <p class="mt-1.5 text-sm leading-6 text-secondary-500">
            Можно не выходить из дома. Мечта социофоба!
          </p>
        </li>
        <li class="rounded-xl bg-white px-6 py-8 shadow-sm">
          <h3 class="my-3 font-display font-medium">Даже брать не надо</h3>
          <p class="mt-1.5 text-sm leading-6 text-secondary-500">
            Подключи подписку и выбранные исследования сами придут к тебе в
            работу
          </p>
        </li>
        <li class="rounded-xl bg-white px-6 py-8 shadow-sm">
          <a href="/pricing" class="group">
            <h3
              class="my-3 font-display font-medium group-hover:text-primary-500"
            >
              Мгновенные чаты с клиниками и админами
            </h3>
            <p class="mt-1.5 text-sm leading-6 text-secondary-500">
              Заподозрили пидорасов в сотрудниках? Сообщите админам - мы быстро
              рассмотрим обращение
            </p>
          </a>
        </li>
        <li class="rounded-xl bg-white px-6 py-8 shadow-sm">
          <h3
            class="my-3 font-display font-medium group-hover:text-primary-500"
          >
            148 800 рублей
          </h3>
          <p class="mt-1.5 text-sm leading-6 text-secondary-500">
            Столько в среднем зарабатывает рентгенолог у нас.
          </p>
        </li>
        <li class="rounded-xl bg-white px-6 py-8 shadow-sm">
          <h3
            class="my-3 font-display font-medium group-hover:text-primary-500"
          >
            Учебник
          </h3>
          <p class="mt-1.5 text-sm leading-6 text-secondary-500">
            Есть своя школа, курсы, хуйня по подписке с миньками и лором.
          </p>
        </li>
      </ul>
    </div>
  </div>

  <section
    class="relative bg-gradient-to-r from-purple-100 via-blue-100 to-green-100 py-16 px-8 overflow-hidden"
  >
    <!-- SVG Pattern Background -->
    <div class="absolute inset-0 w-full h-full -z-10">
      <svg
        class="w-full h-full"
        viewBox="0 0 1440 800"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="dots"
            patternUnits="userSpaceOnUse"
            width="40"
            height="40"
            patternTransform="rotate(45)"
          >
            <circle cx="10" cy="10" r="2" fill="#3B82F6" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="1440" height="800" fill="url(#dots)" />
      </svg>
    </div>

    <!-- Content Container -->
    <div
      class="max-w-7xl mx-auto relative z-20 grid md:grid-cols-2 gap-12 items-center"
    >
      <!-- Text Content -->
      <div
        class="p-8 bg-white bg-opacity-90 rounded-xl shadow-lg backdrop-blur-lg hover:scale-105 transform transition duration-300 ease-in-out"
      >
        <h2 class="text-4xl font-extrabold text-gray-800 mb-4">
          Так, и че надо делать?
        </h2>
        <p class="text-gray-600 mb-6 text-lg">
          Ща все расскажем. Самое главное - не быть пидарасом, а остальное
          здесь:
        </p>
        <div class="space-y-6">
          <!-- Card for each feature -->
          <div
            class="flex items-center space-x-4 p-4 bg-gradient-to-tr from-purple-200 via-blue-200 to-green-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div
              class="p-3 bg-white rounded-full shadow-lg hover:scale-110 transform transition duration-300"
            >
              <!-- Icon: Users -->
              <svg
                class="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17 20v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2H17z" />
                <circle cx="12" cy="8" r="4" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-700">Регаешься</h3>
              <p class="text-gray-500 text-sm">
                Проводим отбор по имени и краниометрии. Пидарасы нам не нужны.
              </p>
            </div>
          </div>

          <div
            class="flex items-center space-x-4 p-4 bg-gradient-to-tr from-purple-200 via-blue-200 to-green-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div
              class="p-3 bg-white rounded-full shadow-lg hover:scale-110 transform transition duration-300"
            >
              <!-- Icon: Lightbulb -->
              <svg
                class="w-6 h-6 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 21h6v-1H9v1zm3-18a4 4 0 00-4 4c0 1.38.56 2.63 1.46 3.54A5.978 5.978 0 009 12h6a5.978 5.978 0 00-1.46-3.46A4 4 0 0015 7a4 4 0 00-4-4z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-700">Если прошел?</h3>
              <p class="text-gray-500 text-sm">
                Пришлем ссылку на тестирование. 4 задания разных областей.
                Опишешь хуйню - останешься в ЧМ.
              </p>
            </div>
          </div>

          <div
            class="flex items-center space-x-4 p-4 bg-gradient-to-tr from-purple-200 via-blue-200 to-green-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div
              class="p-3 bg-white rounded-full shadow-lg hover:scale-110 transform transition duration-300"
            >
              <!-- Icon: User Group -->
              <svg
                class="w-6 h-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M16 14c-1.33 0-2.53.53-3.41 1.39A4.993 4.993 0 0012 20c1.33 0 2.53-.53 3.41-1.39A4.993 4.993 0 0016 14zM8 14c-1.33 0-2.53.53-3.41 1.39A4.993 4.993 0 004 20c1.33 0 2.53-.53 3.41-1.39A4.993 4.993 0 008 14zM12 4c-2.21 0-4 1.79-4 4 0 1.66 1.34 3 3 3h2c1.66 0 3-1.34 3-3 0-2.21-1.79-4-4-4z"
                />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-700">
                Ну прошел тесты, дальше чо?
              </h3>
              <p class="text-gray-500 text-sm">
                Если все норм, пришлем оффер, если нет, напишем почему отказ.
                Обычно принимаем всех, ведь мне похуй.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Image with Overlay & Hover Effect -->
      <div class="relative p-4">
        <div
          class="absolute inset-0 bg-gradient-to-br from-purple-400 via-blue-400 to-green-400 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
        ></div>
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="About Us"
          class="relative rounded-xl shadow-xl object-cover w-full h-full hover:opacity-90 transition-opacity duration-300"
        />
      </div>
    </div>
  </section>

  <footermain></footermain>
</template>

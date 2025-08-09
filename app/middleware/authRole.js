export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // Проверяем, аутентифицирован ли пользователь
  if (!user.value) {
    return navigateTo('/auth')
  }

  // Получаем данные пользователя из таблицы users
  const { data: userData, error } = await supabase
    .from('users')
    .select('role')
    .eq('email', user.value.email)
    .single()

  if (error || !userData) {
    console.error(
      'Ошибка получения роли или пользователь не найден:',
      error?.message
    )
    return navigateTo('/auth')
  }

  const requiredRole = to.meta.requiredRole
  if (!userData.role || (requiredRole && userData.role !== requiredRole)) {
    console.error(`Доступ запрещен`)
    return navigateTo('/auth')
  }
})

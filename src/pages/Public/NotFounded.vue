<template>
  <main class="content content_theme_ornament">
    <div class="err-404 page__404">
      <p class="err-404__code">404</p>
      <p class="err-404__text">
        Извините! Страница, которую Вы ищете, не может быть найдена.
      </p>
      <router-link
        to="/"
        class="button button_theme_green button_border_rounded err-404__button"
        >Перейти на главную страницу</router-link
      >
    </div>
  </main>
</template>
<script>
export default {
  name: "404",
  title: "404"
};
</script>
<template>
  <main class="content content_cabinet">
    <section class="admin-log page__section">
      <h1 class="section-title mb-50">логирование</h1>
      <div class="tabs reports__tabs _tabs">
        <nav class="tabs__navigation">
          <router-link
            to="/cabinet/logging/forms"
            active-class="_active"
            class="tabs__title _tabs-item"
          >
            Формы
          </router-link>
          <router-link
            to="/cabinet/logging/logins"
            active-class="_active"
            class="tabs__title _tabs-item"
          >
            Вход в систему
          </router-link>
          <router-link
            to="/cabinet/logging/statistics"
            active-class="_active"
            class="tabs__title _tabs-item"
          >
            Статистические данные
          </router-link>
        </nav>
        <div class="tabs__content">
          <router-view />
        </div>
      </div>
    </section>
  </main>
</template>
<script>

export default {
  name: "cabinet-logging",
  title: "Логирование"
};
</script>
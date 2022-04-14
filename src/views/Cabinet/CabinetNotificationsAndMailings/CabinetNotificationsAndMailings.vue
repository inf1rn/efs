<template>
  <main class="content content_cabinet">
    <section class="admin_mailings page__section">
      <div class="users__top">
        <h1 class="section-title">уведомления и рассылки</h1>
        <router-link to="/cabinet/notifications-and-mailings/new" class="users__add">+ новое уведомление/рассылка</router-link>
      </div>

      <div class="admin_mailings__wrapper">
        <div class="tabs form-detail__tabs _tabs">
          <nav class="tabs__navigation">
            <router-link
              tag="button"
              type="submit"
              to="/cabinet/notifications-and-mailings/notifications"
              class="tabs__title _tabs-item"
              active-class="_active"
            >
              Уведомления
            </router-link>
            <router-link
              tag="button"
              type="submit"
              to="/cabinet/notifications-and-mailings/mailings"
              class="tabs__title _tabs-item"
              active-class="_active"
            >
              Рассылки
            </router-link>
          </nav>
          <div class="tabs__content">
            <router-view />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  name: "cabinet-notifications-and-mailings",
};
</script>
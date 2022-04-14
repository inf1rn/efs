<template>
  <main class="content content_cabinet">
    <section class="reports page__section">
      <h1 class="section-title mb-50">отчеты</h1>
      <div class="reports__wrapper wrapper-max_width-m">
        <div class="reports__row reports__bottom bottom-reports">
          <div class="tabs reports__tabs _tabs">
            <nav class="tabs__navigation">
              <router-link
                to="/cabinet/reports/reports-all"
                class="tabs__title _tabs-item"
                active-class="_active"
                >Отчеты</router-link
              >
              <router-link
                to="/cabinet/reports/templates"
                class="tabs__title _tabs-item"
                active-class="_active"
              >
                Шаблоны
              </router-link>
              <router-link
                to="/cabinet/reports/history-requests"
                class="tabs__title _tabs-item"
                active-class="_active"
              >
                История запросов
              </router-link>
            </nav>
            <div class="tabs__content">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import {createNamespacedHelpers} from "vuex"
const {mapActions: mapActionsReports} = createNamespacedHelpers("forms/reports")

export default {
  name: "cabinet-reports",
  title: "Отчёты",
  methods: {
    ...mapActionsReports(["fetchForms"])
  },
  created() {
    this.fetchForms()
  }
};
</script>
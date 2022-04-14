<template>
  <main class="admin_subject-edit content content_cabinet">
    <section class="form-detail page__section">
      <ul class="breadcrumbs page__breadcrumbs">
        <li class="breadcrumbs__item">
          <span href="#" class="breadcrumbs__link">Организации</span>
        </li>
        <li class="breadcrumbs__item">
          <router-link to="/cabinet/subjects" class="breadcrumbs__link"
            >Регионы</router-link
          >
        </li>
        <li class="breadcrumbs__item">
          <span href="#" class="breadcrumbs__link breadcrumbs__link_current">{{
            region?.title
          }}</span>
        </li>
      </ul>
      <div class="form-detail__top">
        <h1 class="section-title">{{ organization?.title }}</h1>
      </div>

      <div class="form-detail__wrapper wrapper-max_width-m">
        <div class="tabs form-detail__tabs _tabs">
          <nav class="tabs__navigation">
            <router-link
              type="submit"
              :to="`/cabinet/subjects/${regionId}/edit-organization-${organizationId}/description`"
              active-class="_active"
              class="tabs__title _tabs-item"
            >
              Описание
            </router-link>
            <router-link
              type="submit"
              :to="`/cabinet/subjects/${regionId}/edit-organization-${organizationId}/employees`"
              class="tabs__title _tabs-item"
              active-class="_active"
            >
              Руководство
            </router-link>
            <router-link
              type="submit"
              :to="`/cabinet/subjects/${regionId}/edit-organization-${organizationId}/programs`"
              class="tabs__title _tabs-item"
              active-class="_active"
            >
              Программы
            </router-link>
          </nav>
          <router-view />
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

const { mapState: mapStateOrganization, mapActions: mapActionsOrganization } =
  createNamespacedHelpers("subjects/organization");
export default {
  name: "cabinet-organization-edit",
  computed: {
    ...mapStateOrganization({
      regionId: (state) => state.regionId,
      organizationId: (state) => state.organizationId,
      region: (state) => state.region,
      organization: (state) => state.organizationEdit.formOrganization,
    }),
    title() {
      return this.organization?.title;
    },
  },
};
</script>
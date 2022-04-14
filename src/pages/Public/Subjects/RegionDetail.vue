<template>
  <main class="content content_pt_s">
    <section
      class="
        region-detail-detail-page
        page__section page__section_width_content
      "
    >
      <ul class="breadcrumbs page__breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link to="/subjects" class="breadcrumbs__link"
            >Субъекты</router-link
          >
        </li>
        <li class="breadcrumbs__item">
          <span href="#" class="breadcrumbs__link breadcrumbs__link_current">
            {{ regionName }}
          </span>
        </li>
      </ul>
      <article class="region-detail" style="flex-direction: row">
        <div class="region-detail__description">
          <h1 class="section-title">{{ regionName }}</h1>
          <p class="section-subtitle">Субъект</p>
          <div class="region-detail__text-area">
            <p class="region-detail__text" v-html="regionDescription"></p>
          </div>
        </div>
        <div class="region-detail__statistic">
          <ul class="hex-stat">
            <li class="hex-stat__item hex-stat__item_first">
              <p class="hex-stat__text">{{ regionStat[0]?.title }}</p>
              <p class="hex-stat__num">{{ regionStat[0]?.value }}</p>
            </li>
            <li class="hex-stat__item hex-stat__item_second">
              <p class="hex-stat__text">{{ regionStat[1]?.title }}</p>
              <p class="hex-stat__num">
                {{ regionStat[1]?.value }}
              </p>
            </li>
            <li class="hex-stat__item hex-stat__item_third">
              <p class="hex-stat__text">{{ regionStat[2]?.title }}</p>
              <p class="hex-stat__num">{{ regionStat[2]?.value }}</p>
            </li>
            <li class="hex-stat__item hex-stat__item_fourth">
              <p class="hex-stat__text">{{ regionStat[3]?.title }}</p>
              <p class="hex-stat__num">{{ regionStat[3]?.value }}</p>
            </li>
          </ul>
        </div>
      </article>
    </section>
    <section
      class="
        organizations-section
        page__section page__section_width_content page__section_mt_m
      "
    >
      <h2 class="section-title">Организации</h2>
      <ul class="program-list organizations-section__organization-list">
        <li
          class="program-list__item"
          v-for="organization in organizations"
          :key="organization.title"
        >
          <router-link
            :to="'/subjects/' + regionId + '/' + organization.id"
            class="program-list__link"
            >{{ organization.title_short }}
          </router-link>
        </li>
      </ul>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "subjects/organizationsRegionInfo"
);

export default {
  name: "cabinet-region-detail",
  methods: {
    ...mapActions(["getRegionStat", "getOrganizations", "getRegion"]),
    ...mapMutations(["setRegionId"]),
  },
  computed: {
    ...mapState({
      organizations: (state) => state.organizations,
      regionStat: (state) => state.regionStat,
      regionId: (state) => state.regionId,
      region: (state) => state.region,
      regionName: (state) => state.region?.title,
      regionDescription: (state) => state.region?.description,
      regionSubtitle: (state) => state.region?.subtitle,
    }),
    title() {
      return this.region?.title;
    },
  },
  created() {
    this.setRegionId(this.$route.params.regionId);
    this.getRegionStat();
    this.getOrganizations();
    this.getRegion();
  },
};
</script>

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
          <router-link
            :to="`/subjects/${regionId}`"
            class="breadcrumbs__link"
            >{{ regionName }}</router-link
          >
        </li>
        <li class="breadcrumbs__item">
          <span href="#" class="breadcrumbs__link breadcrumbs__link_current">
            {{ organizationShortName }}
          </span>
        </li>
      </ul>
      <article class="organization-detail">
        <h1 class="section-title">{{ organizationShortName }}</h1>
        <p class="section-subtitle">
          {{ organizationName }}
        </p>
        <div class="organization-detail__description">
          <div class="organization-detail__text-area">
            <p class="organization-detail__text" v-html="description"></p>
          </div>
          <div class="organization-detail__contacts-area">
            <ul class="organization-detail__contacts">
              <li class="organization-detail__contacts-item">
                <div class="hex organization-detail__contacts-hex">
                  <img src="@/assets/images/contacts__phone.svg" alt="" />
                </div>
                <div class="organization-detail__text-box">
                  <p class="organization-detail__contacts-name">Телефон</p>
                  <p class="organization-detail__contacts-value">
                    {{ phone }}
                  </p>
                </div>
              </li>
              <li class="organization-detail__contacts-item">
                <div class="hex organization-detail__contacts-hex">
                  <img src="@/assets/images/contacts__map-pin.svg" alt="" />
                </div>
                <div class="organization-detail__text-box">
                  <p class="organization-detail__contacts-name">Адрес</p>
                  <p class="organization-detail__contacts-value">
                    {{ address }}
                  </p>
                </div>
              </li>
              <li class="organization-detail__contacts-item">
                <div class="hex organization-detail__contacts-hex">
                  <img src="@/assets/images/contacts__email.svg" alt="" />
                </div>
                <div class="organization-detail__text-box">
                  <p class="organization-detail__contacts-name">E-mail</p>
                  <p class="organization-detail__contacts-value">
                    {{ email }}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </section>
    <section
      class="
        org-team-section
        page__section
        page__section_width_full
        page__section_theme_white
        page__section_mt_m
      "
    >
      <div class="org-team org-team-section__inner">
        <div class="org-team__director-area">
          <svg
            class="org-team__director-photo"
            width="200"
            height="230"
            viewBox="0 0 200 230"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M0 172.5L100 230L200 172.5V57.5L100 0L0 57.5V172.5Z"
              fill="url(#pattern0)"
            />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use
                  xlink:href="#image0"
                  transform="translate(-0.075) scale(0.0014393 0.00125156)"
                />
              </pattern>
              <image
                id="image0"
                width="799"
                height="799"
                :xlink:href="getMainEmployee?.image"
              />
            </defs>
          </svg>
          <p class="org-team__director-position">
            {{ getMainEmployee?.position }}
          </p>
          <p class="org-team__director-name">{{ getMainEmployee?.name }}</p>
          <p class="org-team__director-bio">
            {{ getMainEmployee?.description }}
          </p>
        </div>
        <ul class="org-team__team-area">
          <li
            class="org-team__person"
            v-for="employee in getEmployees"
            :key="employee.id"
          >
            <p class="org-team__person-name">{{ employee.name }}</p>
            <p class="org-team__person-position">
              {{ employee.position }}
            </p>
            <p class="org-team__person-bio">{{ employee.description }}</p>
          </li>
        </ul>
      </div>
    </section>
    <section
      class="
        programs-section
        page__section page__section_width_content page__section_mt_m
      "
    >
      <h2 class="section-title">Программы</h2>
      <ul class="program-list programs-section__pragram-list">
        <li
          class="program-list__item"
          v-for="educationProgram in organization?.education_programs"
          :key="educationProgram.id"
        >
          <a :href="educationProgram.link" class="program-list__link">{{
            educationProgram.title
          }}</a>
        </li>
      </ul>
    </section>
  </main>
</template>
<script>
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
const {
  mapState: mapStateCurrentOrganization,
  mapGetters: mapGettersCurrentOrganization,
} = createNamespacedHelpers("subjects/organization/currentOrganization");
const { mapState: mapStateOrganization } = createNamespacedHelpers(
  "subjects/organization"
);

export default {
  name: "cabinet-organization-detail",
  methods: {
    async downloadItem({ url, label }) {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = label;
      link.click();
      URL.revokeObjectURL(link.href);
    },
  },
  computed: {
    ...mapStateCurrentOrganization({
      organization: (state) => state.organization,
    }),
    ...mapStateOrganization({
      regionId: (state) => state.regionId,
      region: (state) => state.region,
    }),
    organizationName: function () {
      return this.organization?.title;
    },
    title: function () {
      return this.organization?.title;
    },
    address: function () {
      return this.organization?.address;
    },
    phone: function () {
      return this.organization?.phone;
    },
    email: function () {
      return this.organization?.email;
    },
    organizationShortName: function () {
      return this.organization?.title_short;
    },
    description: function () {
      return this.organization?.description;
    },
    regionName: function () {
      return this.region?.title;
    },
    ...mapGettersCurrentOrganization(["getMainEmployee", "getEmployees"]),
  },
};
</script>
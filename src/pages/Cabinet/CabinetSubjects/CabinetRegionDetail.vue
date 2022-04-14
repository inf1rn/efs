<template>
  <main class="content content_cabinet">
    <section class="region-detail region-detail-cabinet page__section">
      <ul class="breadcrumbs page__breadcrumbs">
        <li class="breadcrumbs__item">
          <a href="#" class="breadcrumbs__link">Организации</a>
        </li>
        <li class="breadcrumbs__item">
          <router-link to="/cabinet/subjects" class="breadcrumbs__link"
            >Субъекты</router-link
          >
        </li>
        <li class="breadcrumbs__item">
          <span href="#" class="breadcrumbs__link breadcrumbs__link_current">{{
            regionName
          }}</span>
        </li>
      </ul>

      <div class="users__top">
        <h1 class="section-title">{{ regionName }}</h1>
        <router-link
          :to="`/cabinet/subjects/${regionId}/new-organization`"
          class="users__add"
          >+ создать организацию</router-link
        >
      </div>
      <div class="spollers _spoller-init mt-4 w-75">
        <div class="spollers__item">
          <button
            type="button"
            class="spollers__title"
            :class="isFieldActive ? '_spoller-active' : ''"
            @click="isFieldActive = !isFieldActive"
          >
            <span>Описание региона</span>
          </button>
          <div
            class="spollers__body"
            :hidden="!isFieldActive"
            v-if="formDescription !== null"
          >
            <div class="spollers__body-wrap">
              <div class="spollers__body-line mb-4">
                <QuilEditor
                  :content="formDescription"
                  contentType="html"
                  @textChange="() => setFormDescription($refs.editor.getHTML())"
                  ref="editor"
                />
              </div>
              <div class="spollers__body-line">
                <button
                  class="button button_theme_green button_border_small"
                  @click="updateRegion()"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ul class="stat-panels region-detail__stat-panels">
        <data-block
          :title="statPart.title"
          :value="statPart.value"
          v-for="statPart in regionStat"
          :key="statPart.title"
        />
      </ul>
      <form class="form region-detail__search form-width-m">
        <input
          type="text"
          name="search"
          class="
            form__input-edit
            form__input-edit_type_search
            form__input-edit_width_full
          "
          id="search"
        />
      </form>
      <table class="table region-detail__table-orgs">
        <tr class="table__row table__row_head">
          <th class="table__header">Организация</th>
          <th class="table__header">Директор</th>
          <th class="table__header">Программы</th>
          <th class="table__header">Форм заполнено</th>
          <th class="table__header">Рейтинг по региону</th>
          <th class="table__header">Рейтинг по стране по региону</th>
          <th class="table__header">Удалить</th>
        </tr>
        <tr
          @click="
            $router.push(`/cabinet/subjects/${regionId}/${organization.id}`)
          "
          class="table__row"
          v-for="organization in organizations"
          :key="organization.id"
        >
          <td class="table__cell">{{ organization.title_short }}</td>
          <td class="table__cell">{{ organization.mainEmployee?.name }}</td>
          <td class="table__cell"></td>
          <td class="table__cell"></td>
          <td class="table__cell"></td>
          <td class="table__cell"></td>
          <td class="table__cell">
            <button
              class="button button_theme_red button_border_small"
              @click.stop="deleteHandler(organization.id)"
            >
              Удалить
            </button>
          </td>
        </tr>
      </table>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers(
  "subjects/organizationsRegionInfo"
);

export default {
  name: "CabinetRegionDetail",
  data() {
    return {
      isFieldActive: false,
    };
  },
  methods: {
    deleteHandler(organizationId) {
      this.setRemovableOrganizationId(organizationId);
      this.deleteOrganization();
    },
    ...mapActions([
      "getRegionStat",
      "getOrganizations",
      "getRegion",
      "updateRegion",
      "deleteOrganization",
    ]),
    ...mapMutations([
      "setRegionId",
      "setFormDescription",
      "setRemovableOrganizationId",
    ]),
  },
  computed: {
    ...mapState({
      organizations: (state) => state.organizations,
      regionStat: (state) => state.regionStat,
      regionId: (state) => state.regionId,
      region: (state) => state.region,
      formDescription: (state) => state.formDescription,
    }),
    title() {
      return this.regionName;
    },
    regionName: function () {
      return this.region?.title;
    },
  },
  created() {
    this.setRegionId(this.$route.params.regionId);
    this.getRegionStat();
    this.getOrganizations(true);
    this.getRegion();
  },
  beforeUnmount() {
    this.setFormDescription(null);
  },
};
</script>
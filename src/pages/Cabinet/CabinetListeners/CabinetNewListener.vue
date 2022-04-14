<template>
  <main class="content content_cabinet">
    <main class="new-listeners content content_cabinet">
      <section class="form-detail page__section">
        <ul class="breadcrumbs page__breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link to="/cabinet/listeners" class="breadcrumbs__link"
              >Слушатели</router-link
            >
          </li>
          <li class="breadcrumbs__item">
            <span href="#" class="breadcrumbs__link breadcrumbs__link_current"
              >добавить слушателя</span
            >
          </li>
        </ul>
        <div class="form-detail__top">
          <h1 class="section-title">новый слушатель</h1>
          <label
            for="downoloadCSV"
            class="button button_theme_green button_border_small"
          >
            Загрузить .CSV
          </label>
          <input
            type="file"
            id="downoloadCSV"
            @change="
              (e) => {
                setListenerCSV(e.target.files[0]);
                uploadListenerCSV();
              }
            "
            hidden
          />
        </div>

        <div class="form-detail__wrapper wrapper-max_width-m">
          <form class="new-listeners__body width_m from">
            <div class="new-listeners__block block_white">
              <div class="new-listeners_tabs-form__line form__item">
                <label for="newListenersSnils" class="form__label">СНИЛС</label>
                <input
                  type="text"
                  class="spollers-body__input form-input__border"
                  id="newListenersSnils"
                  placeholder="445-666-555 00"
                  :value="snils"
                  @input="(e) => setSnils(e.target.value)"
                />
                <span class="form__label-three">В формате XXX-XXX-XXX YY</span>
              </div>
            </div>
            <div class="new-listeners__block block_white">
              <div class="new-listeners_tabs-form__line form__item">
                <div class="form__item-block">
                  <label for="newListenersEditFullname" class="form__label"
                    >Субъект ДПО</label
                  >
                  <select
                    class="form-input__border"
                    @change="(e) => setOrganizationName(e.target.value)"
                    :value="organizationName"
                  >
                    <option
                      v-for="organization in organizations"
                      :key="organization.title"
                    >
                      {{ organization.title }}
                    </option>
                  </select>
                </div>

                <span class="form__label-three"
                  >Выбрать в выпадающем списке</span
                >
              </div>
            </div>
            <div class="new-listeners__block block_white">
              <div class="new-listeners_tabs-form__line form__item">
                <div class="form__item-block">
                  <label for="newListenersEditFullname" class="form__label"
                    >Тип населенного пункта</label
                  >
                  <select
                    class="form-input__border"
                    :value="localityType"
                    @change="(e) => setLocalityType(e.target.value)"
                  >
                    <option value="city">Город</option>
                  </select>
                </div>

                <span class="form__label-three"
                  >Выбрать в выпадающем списке</span
                >
              </div>
            </div>
            <div class="new-listeners__block block_white">
              <div class="new-listeners_tabs-form__line form__item">
                <div class="form__item-block">
                  <label for="newListenersEditFullname" class="form__label"
                    >Населенный пункт</label
                  >
                  <select
                    class="form-input__border"
                    :value="cityName"
                    @change="(e) => setCityName(e.target.value)"
                  >
                    <option
                      v-for="city in cities"
                      :key="city.title"
                      :value="city.title"
                    >
                      {{ city.title }}
                    </option>
                  </select>
                </div>

                <span class="form__label-three"
                  >Выбрать в выпадающем списке</span
                >
              </div>
            </div>
            <div class="new-listeners__block block_white">
              <div class="new-listeners_tabs-form__line form__item">
                <div class="form__item-block">
                  <label for="newListenersEditFullname" class="form__label"
                    >Уровень образования</label
                  >
                  <select
                    class="form-input__border"
                    :value="educationLevel"
                    @change="(e) => setEducationLevel(e.target.value)"
                  >
                    <option value="среднее-специальное">
                      среднее-специальное
                    </option>
                    <option value="неоконченное высшее">
                      неоконченное высшее
                    </option>
                    <option value="высшее">высшее</option>
                  </select>
                </div>

                <span class="form__label-three"
                  >Выбрать в выпадающем списке</span
                >
              </div>
            </div>
            <div class="new-listeners__block block_white">
              <div class="new-listeners_tabs-form__line form__item">
                <div class="form__item-block">
                  <label for="newListenersEditFullname" class="form__label"
                    >Должность</label
                  >
                  <select
                    class="form-input__border"
                    :value="positionName"
                    @change="(e) => setPositionName(e.target.value)"
                  >
                    <option v-for="position in positions" :key="position.id">
                      {{ position.title }}
                    </option>
                  </select>
                </div>

                <span class="form__label-three"
                  >Выбрать в выпадающем списке</span
                >
              </div>
            </div>
          </form>
          <div class="new-listeners__btn">
            <button
              type="submit"
              class="
                button
                button_theme_green--empty
                button_border_small
                form__submit
              "
            >
              Закрыть
            </button>
            <button
              type="submit"
              class="button button_theme_green button_border_small form__submit"
              @click="createListener()"
            >
              Добавить слушателя
            </button>
          </div>
        </div>
      </section>
    </main>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";

const {
  mapState: mapStateNewListener,
  mapMutations: mapMutationsNewListener,
  mapActions: mapActionsNewListener,
} = createNamespacedHelpers("listeners/newListener");

const { mapState: mapStateOrganizations } =
  createNamespacedHelpers("organizations");

const { mapState: mapStateLocation } = createNamespacedHelpers("location");

export default {
  name: "cabinet-new-listener",
  title: "Новый слушатель",
  methods: {
    ...mapMutationsNewListener([
      "setSnils",
      "setCityName",
      "setOrganizationName",
      "setEducationLevel",
      "setPositionName",
      "setEducationPlace",
      "setProgramCategory",
      "setLocalityType",
      "setListenerCSV",
    ]),
    ...mapActionsNewListener(["createListener", "uploadListenerCSV"]),
  },
  computed: {
    ...mapStateLocation({
      cities: (state) => state.cities,
    }),
    ...mapStateNewListener({
      snils: (state) => state.snils,
      cityName: (state) => state.cityName,
      organizationName: (state) => state.organizationName,
      educationLevel: (state) => state.educationLevel,
      positionName: (state) => state.positionName,
      educationPlace: (state) => state.educationPlace,
      programCategory: (state) => state.programCategory,
      localityType: (state) => state.localityType,
    }),
    ...mapStateOrganizations({
      organizations: (state) => state.organizations,
      positions: (state) => state.positions,
    }),
  },
};
</script>
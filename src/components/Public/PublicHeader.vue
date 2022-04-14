<template>
  <header class="header">
    <div class="header__inner">
      <button
        @click="toggleBurgerMenu"
        class="header__menu-burger-toogle"
      ></button>
      <div class="header__column">
        <router-link to="/" class="logo"></router-link>
      </div>

      <div class="header__column header__column_el_contacts">
        <p class="header__phone-text">Телефон горячей линии</p>
        <a href="tel:88002009185" class="header__phone-number"
          >8 (800) 200-91-85</a
        >
      </div>
      <div class="header__column header__column_el_auth">
        <a
          href="https://education.apkpro.ru/"
          class="button button_theme_green-invert button_border_rounded"
          >Вход для педагогов</a
        >
      </div>
    </div>
    <!-- открытое меню: .burger-menu.burger-menu_opened -->
    <div :class="burgerMenuObject" class="burger-menu">
      <div class="burger-menu__header">
        <a href="/" class="logo logo_type_white"></a>
        <button
          @click="toggleBurgerMenu"
          class="burger-menu__close-btn"
        ></button>
      </div>
      <nav class="burger-menu__links">
        <router-link to="/subjects" class="burger-menu__link"
          >Регионы</router-link
        >
        <router-link to="/news" class="burger-menu__link">Новости</router-link>
        <a
          @click="toggleTechnicalSupportPopup"
          href="#"
          class="burger-menu__link"
          >Техническая поддержка</a
        >
      </nav>
      <div class="burger-menu__mobile-area">
        <a
          href="https://education.apkpro.ru/"
          class="button button_theme_green-invert button_border_rounded"
          >Вход для педагогов</a
        >
        <router-link
          to="/auth"
          class="button button_theme_white-invert button_border_rounded"
          >Служебный раздел</router-link
        >
      </div>
    </div>
    <technical-support-popup v-if="isOpenedTechnicalSupport" />
  </header>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import TechnicalSupportPopup from "@/components/TechnicalSupportPopup.vue";

export default {
  name: "public-header",
  components: { TechnicalSupportPopup },
  data() {
    return {
      burgerMenuObject: {
        "burger-menu_opened": false,
      },
    };
  },
  computed: {
    ...mapState({
      isOpenedTechnicalSupport: (state) => state.technicalSupport.isOpened,
    }),
  },
  methods: {
    ...mapMutations({ setIsOpened: "technicalSupport/setIsOpened" }),
    toggleBurgerMenu() {
      this.burgerMenuObject["burger-menu_opened"] =
        !this.burgerMenuObject["burger-menu_opened"];
    },
    toggleTechnicalSupportPopup() {
      this.setIsOpened(true);
      this.toggleBurgerMenu();
    },
  },
};
</script>
<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__columns">
        <div class="footer__column">
          <nav class="footer__menu">
            <ul class="footer__links">
              <li class="footer__link-item">
                <router-link to="/news" class="footer__link"
                  >Новости</router-link
                >
              </li>
              <li class="footer__link-item">
                <router-link to="/subjects" class="footer__link">Регионы</router-link>
              </li>
              <li class="footer__link-item">
                <a
                  href="#"
                  class="footer__link"
                  @click="() => setIsOpened(true)"
                  >Техническая поддержка</a
                >
              </li>
            </ul>
          </nav>
          <router-link to="/auth" class="footer__admin-link"
            >Служебный раздел</router-link
          >
        </div>
        <div class="footer__column footer__column_text-align_center">
          <a href="https://edu.gov.ru/" target="_blank">
          <img
            src="@/assets/images/logo_footer.png"
            class="footer__logo"
            alt="Министерство просвещения Российской Федерации"
          />
          </a>
          <!-- <p class="footer__text">© Все права защищены. 2021</p> -->
        </div>
        <div class="footer__column footer__column_text-align_center">
          <ul class="social footer__social">
            <!-- <li class="social__item">
              <a
                href="javascript;"
                class="social__link social__link_icon_fb"
                target="_blank"
              ></a>
            </li>
            <li class="social__item">
              <a
                href="javascript;"
                class="social__link social__link_icon_instagram"
                target="_blank"
              ></a>
            </li> -->
            <li class="social__item">
              <a
                href="javascript;"
                class="social__link social__link_icon_vk"
                target="_blank"
              ></a>
            </li>
            <li class="social__item">
              <a
                href="https://rutube.ru/channel/23905527/videos/"
                class="social__link social__link_icon_youtube"
                target="_blank"
              ></a>
            </li>
          </ul>
          <p class="footer__text">Звонок бесплатный</p>
          <p class="footer__phone">8 (800) 200-91-85</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "public-footer",
  methods: {
    ...mapMutations({ setIsOpened: "technicalSupport/setIsOpened" }),
  },
};
</script>
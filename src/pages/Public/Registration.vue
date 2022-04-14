<template>
  <main class="content content_federal">
    <section class="interactive-map page__section page__section_margin-top-s">
      <h1 class="section-title">создать пользователя</h1>
      <div class="filter interactive-map__filter">
        <form class="tabs__body-form form account-form account-form--one">
          <div class="account-form-wrap">
            <div class="account-form__row">
              <div class="account-form__line">
                <div class="form__item">
                  <label for="accountMail" class="form__label">Email</label>
                  <input
                    type="mail"
                    class="form__input-edit form__input-edit_width_full"
                    id="accountMail"
                    placeholder="Введите email"
                  />
                </div>
                <div class="form__item">
                  <label for="accountRole" class="form__label">Роль</label>
                  <select
                    name="accountPosition"
                    class="form__select form__select_theme_white"
                  ></select>
                </div>
                <div class="form__item form-add_photo">
                  <a href="#" class="filter__add-link">добавить фото</a>
                </div>
              </div>
              <div class="account-form__line">
                <div class="form__item">
                  <label for="accountSecondName" class="form__label"
                    >Фамилия</label
                  >
                  <input
                    type="text"
                    class="form__input-edit form__input-edit_width_full"
                    id="accountSecondName"
                    placeholder="Введите фамилию"
                  />
                </div>
                <div class="form__item">
                  <label for="accountFirstName" class="form__label">Имя</label>
                  <input
                    type="text"
                    class="form__input-edit form__input-edit_width_full"
                    id="accountFirstName"
                    placeholder="Введите имя"
                  />
                </div>
                <div class="form__item">
                  <label for="accountLastName" class="form__label"
                    >Отчество</label
                  >
                  <input
                    type="text"
                    class="form__input-edit form__input-edit_width_full"
                    id="accountLastName"
                    placeholder="Введите отчество"
                  />
                </div>
              </div>
            </div>
            <div class="account-form__row row-d-flex">
              <div class="account-form__line">
                <div class="form__item">
                  <label for="accountRegion" class="form__label">Регион</label>
                  <select
                    name="accountPosition"
                    class="form__select form__select_theme_white"
                  ></select>
                </div>
              </div>
              <div class="account-form__line">
                <div class="form__item">
                  <label for="accountCity" class="form__label">Город</label>
                  <select
                    name="accountPosition"
                    class="form__select form__select_theme_white"
                  ></select>
                </div>
              </div>
            </div>
            <div class="account-form__row row-d-flex">
              <div class="account-form__line">
                <div class="form__item">
                  <label for="accountJob" class="form__label"
                    >Место работы</label
                  >
                  <select
                    name="accountPosition"
                    class="form__select form__select_theme_white"
                  ></select>
                </div>
              </div>
              <div class="account-form__line">
                <div class="form__item">
                  <label for="accountPosition" class="form__label"
                    >Должность</label
                  >
                  <select
                    name="accountPosition"
                    class="form__select form__select_theme_white"
                  ></select>
                </div>
              </div>
            </div>
            <div class="account-form__row row-d-flex">
              <div class="account-form__line">
                <div class="form__item">
                  <label for="accountPassword" class="form__label"
                    >Пароль</label
                  >
                  <input
                    type="password"
                    class="form__input-edit form__input-edit_width_full"
                    id="accountPassword"
                    placeholder="Введите пароль"
                  />
                </div>
              </div>
              <div class="account-form__line">
                <div class="form__item">
                  <label for="accountPasswordRepeat" class="form__label"
                    >Повторите пароль</label
                  >
                  <input
                    type="password"
                    class="form__input-edit form__input-edit_width_full"
                    id="accountPasswordRepeat"
                    placeholder="Повторите пароль"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="account-form__footer">
            <div class="checkbox form-group">
              <input type="checkbox" id="chk" />
              <label for="chk"
                >Даю согласие на обработку персональных данных в системе</label
              >
            </div>
            <div class="account-form__btn">
              <button
                type="submit"
                class="
                  button button_theme_green button_border_small
                  form__submit disabled
                "
                disabled
              >
                Регистрация временно не доступна
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  name: "registration",
  title: "Регистрация",
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      const store = vm.$store.state;
      if (store.auth.auth) {
        vm.$router.push("/cabinet");
      }
    });
  },
};
</script>
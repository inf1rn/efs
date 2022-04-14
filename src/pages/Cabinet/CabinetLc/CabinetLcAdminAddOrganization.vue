<template>
  <main class="content content_cabinet">
    <section class="add-news page__section">
      <!-- <ul class="breadcrumbs page__breadcrumbs">
          <li class="breadcrumbs__item">
            <a href="#" class="breadcrumbs__link">Организации</a>
          </li>
          <li class="breadcrumbs__item">
            <a href="#" class="breadcrumbs__link">Регионы</a>
          </li>
          <li class="breadcrumbs__item">
            <span href="#" class="breadcrumbs__link breadcrumbs__link_current">Республика Адыгея (Адыгея)</span>
          </li>
        </ul> -->

      <h1 class="section-title mb-50">Добавить организацию</h1>
      <form class="add-news__wrapper form">
        <div class="add-news__row">
          <div class="select-form select-form--mb40">
            <label for="listenersRegion" class="form__label"
              >Тип организации</label
            >
            <select name="listenersRegion" class="two">
              <option value="1" selected>Выберите тип организации</option>
              <option value="2">Пункт №1</option>
              <option value="3">Пункт №3</option>
              <option value="4">Пункт №4</option>
              <option value="4">Пункт №5</option>
              <option value="4">Пункт №6</option>
            </select>
          </div>
          <div class="select-form select-form--mb40">
            <label for="listenersRegion" class="form__label">Регион</label>
            <select name="listenersRegion" class="two">
              <option value="1" selected>Выберите регион</option>
              <option value="2">Пункт №1</option>
              <option value="3">Пункт №3</option>
              <option value="4">Пункт №4</option>
              <option value="4">Пункт №5</option>
              <option value="4">Пункт №6</option>
            </select>
          </div>
          <div class="new-listeners__block block_white block_white--w760">
            <div class="new-listeners_tabs-form__line form__item">
              <label for="newListenersSnils" class="form__label"
                >Название организации</label
              >
              <input
                type="text"
                class="spollers-body__input form-input__border"
                id="newListenersSnils"
                placeholder=""
              />
              <span class="form__label-three"></span>
            </div>
          </div>
          <div class="new-listeners__block block_white block_white--w760">
            <div class="new-listeners_tabs-form__line form__item">
              <label for="newListenersSnils" class="form__label"
                >Полное наименование организации (по Уставу)</label
              >
              <input
                type="text"
                class="spollers-body__input form-input__border"
                id="newListenersSnils"
                placeholder=""
              />
              <span class="form__label-three"></span>
            </div>
          </div>

          <div class="add-news__line form__item">
            <button
              type="submit"
              class="button button_theme_green button_border_small form__submit"
            >
              Далее
            </button>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

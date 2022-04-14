<template>
  <!--Добавить к popup-new  _active -->
  <div class="popup-new popup__master">
    <div class="popup__content">
      <div class="popup__body">
        <div class="popup__close"></div>
        <div class="popup__body-wrap body-wrap">
          <div class="body-wrap__content events-content form-block">
            <div class="events-content__item events-content__item--line">
              <div class="events-content__item-name">Название файла</div>
              <div class="events-title">
                Презентация выступления И.А. Рогалевич
              </div>
            </div>
            <div class="events-content__item events-content__item--line">
              <div class="events-content__item-name">Файл</div>
              <div class="events-content__item-file-box">
                <div class="events-title">1111111.ppt (7,6 МБ)</div>
                <span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4L4 12"
                      stroke="#BDBDBD"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4 4L12 12"
                      stroke="#BDBDBD"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div class="events-content__item-button">
              <button
                type="submit"
                class="
                  button button_theme_green button_border_small
                  form__submit
                  button_news
                "
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


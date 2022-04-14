<template>
  <div class="popup-new popup_events _active">
    <div class="popup__content">
      <div class="popup__body">
        <div class="popup__close"></div>
        <div class="popup__body-wrap body-wrap">
          <div class="body-wrap__content events-content">
            <div
              class="events-content__box-title events-content__box-title--wnot"
            >
              <h2 class="events-content__title events-title2">
                Отменить запись на урок?
              </h2>
            </div>
            <div class="events-content__item events-content__item--jc">
              <div class="events-content__item events-content__item--mbnone">
                <div class="events-content__item-name">дата</div>
                <div class="events-title">19.11</div>
              </div>
              <div class="events-content__item events-content__item--mbnone">
                <div class="events-content__item-name">время</div>
                <div class="events-title">9:00</div>
              </div>
              <div class="events-content__item events-content__item--mbnone">
                <div class="events-content__item-name">урок</div>
                <div class="events-title">Русская литература</div>
              </div>
              <div class="events-content__item events-content__item--mbnone">
                <div class="events-content__item-name">класс</div>
                <div class="events-title">7 класс</div>
              </div>
              <div class="events-content__item events-content__item--mbnone">
                <div class="events-content__item-name">кабинет</div>
                <div class="events-title">203</div>
              </div>
            </div>
            <div
              class="
                events-content__item-time events-content__item-time--width50
                item-time
              "
            >
              <div class="events-content__item-name">формат посещения</div>
              <div class="events-content__item-radio-wr box-radio">
                <label class="wr-radio">
                  <input
                    type="radio"
                    name="запись на урок"
                    value="Очно"
                    class="real-radio"
                    checked
                  />
                  <span class="custom-radio"></span>
                  <span class="text-radio">Очно</span>
                </label>
                <label class="wr-radio">
                  <input
                    type="radio"
                    name="запись на урок"
                    value="Дистанционно"
                    class="real-radio"
                  />
                  <span class="custom-radio"></span>
                  <span class="text-radio">Дистанционно</span>
                </label>
              </div>
            </div>
          </div>
          <div class="events-content__item-btn events-content__item-btn--width">
            <button
              type="submit"
              class="
                button button_theme_green button_border_small
                form__submit
                button_news
              "
            >
              Отменить запись
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


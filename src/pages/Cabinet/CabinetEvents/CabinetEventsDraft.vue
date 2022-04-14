<template>
  <main class="content content_cabinet">
    <section class="page__section">
      <ul class="breadcrumbs page__breadcrumbs">
        <li class="breadcrumbs__item">
          <a href="#" class="breadcrumbs__link">мероприятия</a>
        </li>
        <li class="breadcrumbs__item">
          <a href="#" class="breadcrumbs__link">создать мероприятие</a>
        </li>
        <!-- <li class="breadcrumbs__item">
				<span href="#" class="breadcrumbs__link breadcrumbs__link_current">«Мастер-класс как эффективная форма повышения профессионального мастерства педагогов»</span>
			</li> -->
      </ul>
      <h1 class="section-title mb-50">Новое мероприятие</h1>
      <div class="content-inner">
        <div class="content__right events-content">
          <div class="events-content__item events-content__item--line">
            <div class="events-content__item-name">название мероприятия</div>
            <div class="events-title">
              Мастер-класс как эффективная форма повышения профессионального
              мастерства педагогов
            </div>
          </div>
          <div class="events-content__item">
            <div
              class="
                events-content__item-time events-content__item-time--width
                item-time
              "
            >
              <div class="events-content__item-name">
                Дата и время начала мероприятия
              </div>
              <div class="events-content__item-info">
                <div class="events-content__item-inp-date inp-date">
                  <select name="form[]" class="two">
                    <option value="1" selected>31.10.2020</option>
                    <option value="2">Пункт №2</option>
                    <option value="3">Пункт №3</option>
                    <option value="4">Пункт №4</option>
                  </select>
                </div>
                <div class="events-content__item-inp-date inp-date">
                  <select name="form[]" class="two">
                    <option value="1" selected>11:00 MSK</option>
                    <option value="2">Пункт №2</option>
                    <option value="3">Пункт №3</option>
                    <option value="4">Пункт №4</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              class="
                events-content__item-time events-content__item-time--width
                item-time
              "
            >
              <div class="item-time-wr">
                <div class="events-content__item-name">
                  Дата и время конца мероприятия
                </div>
                <div class="events__filter">
                  <div class="events__filter-item">
                    <div class="events__filter-box-arrow box-arrow">
                      <div class="arrow arrow-up">
                        <img
                          loading="lazy"
                          width="7"
                          height="5"
                          src="./images/arrow_up.svg"
                          alt="стрелка вверх"
                        />
                      </div>
                      <div class="arrow arrow-do">
                        <img
                          loading="lazy"
                          width="7"
                          height="5"
                          src="./images/arrow_down.svg"
                          alt="стрелка вниз"
                        />
                      </div>
                    </div>
                    <div class="events__filter-name">Дата</div>
                  </div>
                  <div class="events__filter-item">
                    <div class="events__filter-box-arrow box-arrow">
                      <div class="arrow arrow-up">
                        <img
                          loading="lazy"
                          width="7"
                          height="5"
                          src="./images/arrow_up.svg"
                          alt="стрелка вверх"
                        />
                      </div>
                      <div class="arrow arrow-do">
                        <img
                          loading="lazy"
                          width="7"
                          height="5"
                          src="./images/arrow_down.svg"
                          alt="стрелка вниз"
                        />
                      </div>
                    </div>
                    <div class="events__filter-name">Тип</div>
                  </div>
                </div>
              </div>
              <div class="events-content__item-info">
                <div class="events-content__item-inp-date inp-date">
                  <select name="form[]" class="two">
                    <option value="1" selected>31.10.2020</option>
                    <option value="2">Пункт №2</option>
                    <option value="3">Пункт №3</option>
                    <option value="4">Пункт №4</option>
                  </select>
                </div>
                <div class="events-content__item-inp-date inp-date">
                  <select name="form[]" class="two">
                    <option value="1" selected>11:00 MSK</option>
                    <option value="2">Пункт №2</option>
                    <option value="3">Пункт №3</option>
                    <option value="4">Пункт №4</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              class="
                events-content__item-time
                item-time
                events-content__item-time--width
              "
            >
              <div class="events-content__item-name">
                максимальное количество мест
              </div>
              <div class="events-content__item-info">
                <div class="form__item">
                  <input
                    type="number"
                    class="form__item-input"
                    id="form-detailStatus"
                    placeholder="500"
                  />
                </div>
              </div>
            </div>
            <div
              class="
                events-content__item-time
                item-time
                events-content__item-time--width
              "
            >
              <div class="events-content__item-name">Форма мероприятия</div>
              <div class="events-content__item-info">
                <div class="events-content__item-box-radio box-radio">
                  <label class="wr-radio">
                    <input
                      type="radio"
                      name="Форма мероприятия"
                      value="Онлайн"
                      class="real-radio"
                      checked
                    />
                    <span class="custom-radio"></span>
                    <span class="text-radio">Онлайн</span>
                  </label>
                  <label class="wr-radio">
                    <input
                      type="radio"
                      name="Форма мероприятия"
                      value="Оффлайн"
                      class="real-radio"
                    />
                    <span class="custom-radio"></span>
                    <span class="text-radio">Оффлайн</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="events-content__item events-content__item--line">
            <div class="events-content__item-name">ссылка на мероприятия</div>
            <div class="events-content__item-link events-title">
              https://www.google.com/webhp?hl=ru&sa=X&ved
            </div>
          </div>
          <div class="events-content__item events-content__item--line">
            <div class="events-content__item-name">Описание мероприятия</div>
            <div class="events-title">
              Тема «Педагогическое взаимодействие в структуре методической
              работы как условие совершенствования профессионально-личностных
              компетенций педагога»
            </div>
          </div>
          <div class="events-content__item">
            <div class="events-content__item-name">материалы мероприятия</div>
            <ol class="events-content__item-list">
              <li class="events-content__item-box">
                <a
                  href="#"
                  class="
                    events-content__item-box-link
                    events-content__item-box-link--binone
                  "
                  >Презентация выступления И.А. Рогалевич
                  <span>(.ppt 7,6 MБ)</span></a
                >
                <div class="events-content__item-box-icons form__item-btn">
                  <div class="form__item-close"></div>
                  <div class="form__item-pen"></div>
                </div>
              </li>
              <li class="events-content__item-box">
                <a
                  href="#"
                  class="
                    events-content__item-box-link
                    events-content__item-box-link--binone
                  "
                  >Презентация к игре «Осторожно! Критика»
                  <span>(.ppt 511 КБ)</span></a
                >
                <div class="events-content__item-box-icons form__item-btn">
                  <div class="form__item-close"></div>
                  <div class="form__item-pen"></div>
                </div>
              </li>
              <li class="events-content__item-box">
                <a
                  href="#"
                  class="
                    events-content__item-box-link
                    events-content__item-box-link--binone
                  "
                  >Сценарий проведения деловой игры <span>(.doc 33 КБ)</span></a
                >
                <div class="events-content__item-box-icons form__item-btn">
                  <div class="form__item-close"></div>
                  <div class="form__item-pen"></div>
                </div>
              </li>
            </ol>
            <a href="#" class="events-content__add thing__add"
              >+ добавить материал</a
            >
          </div>
        </div>
        <div class="content__left">
          <div class="content__left-title">Участники - 0</div>
          <div class="content__left-list list"></div>
        </div>
      </div>
      <div class="events-content__item-button">
        <button
          type="submit"
          class="
            button button--mr button_theme_green button_border_small
            form__submit
            button_news
          "
        >
          Опубликовать
        </button>
        <button
          type="submit"
          class="
            button
            button_theme_green--empty
            button_border_small
            form__submit
            button_news
          "
        >
          Сохранить в черновик
        </button>
        <button
          type="submit"
          class="
            button button_theme_red button_border_small
            form__submit
            button_news
          "
        >
          Удалить мероприятие
        </button>
      </div>
    </section>
  </main>
</template>

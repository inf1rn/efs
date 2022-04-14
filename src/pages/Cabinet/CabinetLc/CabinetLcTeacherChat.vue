<template>
  <main class="content content_cabinet">
    <section class="users page__section">
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
      <div class="users__top">
        <h1 class="section-title">Сообщения</h1>
      </div>
      <div class="chat chat--flex">
        <div class="chat-message">
          <div class="chat-message__user message-user">
            <div class="message-user__avatar">
              <img
                loading="lazy"
                width="75"
                height="75"
                src="./upload/icon_user_75.png"
                alt="аватар пользователя"
              />
              <div class="message-user__avatar-online"></div>
            </div>
            <div class="message-user__info">
              <div class="message-user__info-name">
                Крупская Екатерина Валерьевна
              </div>
              <div class="message-user__info-text">Online</div>
            </div>
            <div class="message-user__icon">
              <svg
                width="5"
                height="25"
                viewBox="0 0 5 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 5C3.88071 5 5 3.88071 5 2.5C5 1.11929 3.88071 0 2.5 0C1.11929 0 0 1.11929 0 2.5C0 3.88071 1.11929 5 2.5 5Z"
                  fill="#303F95"
                />
                <path
                  d="M2.5 15C3.88071 15 5 13.8807 5 12.5C5 11.1193 3.88071 10 2.5 10C1.11929 10 0 11.1193 0 12.5C0 13.8807 1.11929 15 2.5 15Z"
                  fill="#303F95"
                />
                <path
                  d="M2.5 25C3.88071 25 5 23.8807 5 22.5C5 21.1193 3.88071 20 2.5 20C1.11929 20 0 21.1193 0 22.5C0 23.8807 1.11929 25 2.5 25Z"
                  fill="#303F95"
                />
              </svg>
            </div>
          </div>
          <div class="chat-message__place chat-place">
            <div class="chat-place__row chat-place__row--left">
              <div class="chat-place__row-box-message">
                <div class="chat-place__row-text">Здравствуйте!</div>
                <div class="chat-place__row-time">10:24</div>
              </div>
            </div>
            <div class="chat-place__row chat-place__row--left">
              <div class="chat-place__row-box-message">
                <div class="chat-place__row-text">
                  Что с новыми программами?
                </div>
                <div class="chat-place__row-time">10:24</div>
              </div>
            </div>
            <div class="chat-place__row chat-place__row--right">
              <div class="chat-place__row-box-message">
                <div class="chat-place__row-text">Добрый день.</div>
                <div class="chat-place__row-time">10:25</div>
              </div>
            </div>
            <div class="chat-place__row chat-place__row--right">
              <div class="chat-place__row-box-message">
                <div class="chat-place__row-text">Уже завершаем описание</div>
                <div class="chat-place__row-time">10:25</div>
              </div>
            </div>
            <div class="chat-place__row chat-place__row--left">
              <div class="chat-place__row-box-message">
                <div class="chat-place__row-text">
                  Отлично! Значит я смогу увидеть результат завтра?
                </div>
                <div class="chat-place__row-time">10:26</div>
              </div>
            </div>
            <div class="chat-place__row chat-place__row--right">
              <div class="chat-place__row-box-message">
                <div class="chat-place__row-text">Конечно!</div>
                <div class="chat-place__row-time">10:27</div>
              </div>
            </div>
          </div>
          <div class="chat-message__sendler">
            <textarea class="chat-message__sendler-field"></textarea>
            <button class="chat-message__sendler-btn">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.1368 4.97811L18.1368 17.9747C18.1368 21.2903 15.449 23.9781 12.1334 23.9781C8.81789 23.9781 6.1301 21.2903 6.1301 17.9747L6.1301 4.97811C6.1301 2.76775 7.92196 0.975889 10.1323 0.975889C12.3427 0.975889 14.1346 2.76775 14.1346 4.97811L14.1275 17.9818C14.1275 19.087 13.2316 19.9829 12.1264 19.9829C11.0212 19.9829 10.1253 19.087 10.1253 17.9818L10.1323 5.98221"
                  stroke="#F2F2F2"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="chat-message__sendler-hide">
                <a href="#" class="chat-message__sendler-hide-text">Файл</a>
                <a href="#" class="chat-message__sendler-hide-text">Курс</a>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>


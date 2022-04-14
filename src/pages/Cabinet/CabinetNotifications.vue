<template>
  <main class="content content_cabinet">
    <section class="cabinet-notification page__section">
      <h1 class="section-title mb-50">
        уведомления ({{ notOpenedMessagesCount }})
      </h1>
      <div class="cabinet-notification__wrapper wrapper-max_width-m">
        <div class="cabinet-notification__body">
          <div class="cabinet-notification__left left-notification">
            <div class="left-notification__all">
              Все уведомления ({{ messages.length }})
            </div>
            <div class="left-notification__row">
              <div
                class="left-notification__line notification"
                @click="
                  (e) => {
                    setCurrentMessageId(message.id);
                    fetchMessageById();
                  }
                "
                :class="{ new: !message.opened }"
                v-for="message in messages"
                :key="message.id"
              >
                <div class="notification__body">
                  <div class="notification__header">
                    <a href="#" class="notification__title">
                      {{ message.title }}
                    </a>
                    <div class="notification__date">
                      {{
                        new Date(message.created_at)
                          .toLocaleString("ru-RU")
                          .slice(0, 10)
                      }}
                    </div>
                  </div>

                  <div class="notification__text">
                    {{ message.message.split(" ").slice(0, 10).join(" ") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="cabinet-notification__right right-notification"
            v-if="currentMessageData"
          >
            <div class="right-notification__body">
              <div class="right-notification__header">
                <div class="right-notification__theme">
                  <span>Тема:</span>
                  <strong>{{ currentMessageData.title }} </strong>
                </div>
                <div class="right-notification__date">
                  <span>Дата:</span>
                  <p>
                    {{
                      new Date(currentMessageData.created_at)
                        .toLocaleString("ru-RU")
                        .slice(0, 10)
                    }}
                  </p>
                </div>
              </div>
              <div
                class="right-notification__text"
                v-html="currentMessageData.message"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions, mapMutations, mapGetters } =
  createNamespacedHelpers("messages/messagesAll");

export default {
  name: "cabinet-notifications",
  title: "Уведомления",
  computed: {
    ...mapState({
      messages: (state) => state.messages,
      currentMessageData: (state) => state.currentMessage.data,
    }),
    notOpenedMessagesCount() {
      return this.getNotOpenedMessagesCount();
    },
  },
  methods: {
    ...mapActions(["fetchMessageById"]),
    ...mapMutations(["setCurrentMessageId"]),
    ...mapGetters(["getNotOpenedMessagesCount"]),
  },
};
</script>
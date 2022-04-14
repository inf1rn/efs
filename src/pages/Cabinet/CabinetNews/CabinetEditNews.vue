<template>
  <main class="content content_cabinet">
    <section class="add-news page__section">
      <h1 class="section-title mb-50">
        {{ post?.title }}
      </h1>
      <form class="add-news__wrapper form" @submit.prevent>
        <div class="add-news__row">
          <div class="add-news__line form__item form__item_select-wr">
            <label for="addNewsSelect" class="add-news__caption form__label"
              >Тип новости</label
            >
            <select
              class="form__input-edit form__input-edit_select"
              id="addNewsSelect"
            >
              <option value="">Общая</option>
              <option value="">1</option>
              <option value="">2</option>
            </select>
          </div>
          <div class="add-news__line form__item">
            <label for="addNewsTheme" class="add-news__caption form__label"
              >Тема статьи</label
            >
            <textarea
              id="addNewsTheme"
              class="form__input-edit form__input-edit_textarea"
              placeholder="Подходит срок заполнения формы №3456 за 30 (тридцать) календарных дней"
              :value="formPost?.title"
              @input="setTitle($event.target.value)"
            >
            </textarea>
          </div>
          <div class="add-news__line form__item">
            <label for="addNewsFale" class="add-news__caption form__label"
              >Фото превью
            </label>
            <div class="form__item-block">
              <div class="form__item-img">
                <img
                  loading="lazy"
                  width="320"
                  height="214"
                  :src="imageSrc"
                  alt="фото"
                />
              </div>
              <div class="form__item-btn">
                <div class="form__item-close"></div>
                <div
                  @click="this.$refs.fileLoader.click()"
                  class="form__item-pen"
                ></div>
                <input
                  hidden
                  type="file"
                  ref="fileLoader"
                  @change="setImage($event.target.files[0])"
                />
              </div>
            </div>
          </div>
          <div class="add-news__line form__item" v-if="formPost">
            <label for="addNewsDate" class="add-news__caption form__label"
              >Дата публикации</label
            >
            <input
              type="date"
              class="form__input-edit add-news__form_date"
              id="addNewsDate"
              :value="formPost?.published_at.slice(0, 10)"
              @input="setDate($event.target.value)"
            />
          </div>
          <div class="add-news__line form__item" v-if="formPost">
            <label for="addNewsText" class="add-news__caption form__label"
              >Текст статьи
            </label>
            <QuilEditor
              :content="formPost.detail_text"
              contentType="html"
              @textChange="
                () => {
                  setDetailText($refs.editor.getText());
                  setDetailTextHTML($refs.editor.getHTML())
                }
              "
              ref="editor"
              theme="snow"
            />
          </div>
          <div class="add-news__line form__item form__item-line_add_news">
            <div class="form__item-left">
              <label for="addNewsTags" class="add-news__caption form__label"
                >Категория</label
              >
            </div>
            <div class="form__item-tags">
              <input
                type="text"
                class="form__input-edit"
                id="addNewsTags"
                placeholder="Введите категорию и нажмите Enter"
                @keydown.enter.prevent="addCategory($event.target.value)"
              />
              <ul class="tags tags_direct_row news-detail__categories">
                <li
                  class="tags__item"
                  v-for="category of formPost?.categories"
                  :key="category.id"
                >
                  {{ category.title }}
                  <a href="#">
                    <img
                      @click.prevent="deleteCategory(category.id)"
                      src="@/assets/images/close_tags.svg"
                      alt="svg_close"
                  /></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="add-news__wrapper-btn-box">
            <div class="add-news__line form__item">
              <button
                class="
                  button button_theme_green button_border_small
                  form__submit
                "
                @click="updatePost()"
              >
                Опубликовать
              </button>
            </div>
            <div class="add-news__line form__item">
              <button
                class="button button_theme_red button_border_small form__submit"
                @click="deletePostHandler()"
              >
                Удалить новость
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: mapStateEditNews,
  mapActions: mapActionsEditNews,
  mapMutations: mapMutationsEditNews,
} = createNamespacedHelpers("news/editNews");

export default {
  name: "cabinet-edit-news",
  computed: {
    ...mapStateEditNews({
      formPost: (state) => state.formPost,
      post: (state) => state.post,
    }),
    imageSrc() {
      const image = this.formPost?.preview_image;

      return image instanceof Blob ? URL.createObjectURL(image) : image;
    },
  },
  methods: {
    ...mapActionsEditNews(["getPostById", "deletePost", "updatePost"]),
    ...mapMutationsEditNews([
      "setPostId",
      "setDetailText",
      "setDetailTextHTML",
      "setDate",
      "setTitle",
      "addCategory",
      "deleteCategory",
      "setImage",
      "clear"
    ]),

    deletePostHandler() {
      this.deletePost();
      this.$router.push("/cabinet/news");
    },
  },
  created() {
    this.setPostId(this.$route.params.newsId);
    this.getPostById();
  },
  unmounted() {
    this.clear()
  }
};
</script>
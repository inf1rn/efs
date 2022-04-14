import _, { cloneDeep } from "lodash"
import { newsAPI } from "../../../API/news"

export const editNewsModule = {
    state() {
        return {
            post: null,
            formPost: null,
            postId: null
        }
    },
    mutations: {
        setPost(state, post) {
            state.post = post
            state.formPost = cloneDeep(post)
        },
        setPostId(state, postId) {
            state.postId = postId
        },
        setTitle(state, title) {
            state.formPost = {
                ...state.formPost,
                title
            }
        },
        setDate(state, date) {
            state.formPost = {
                ...state.formPost,
                published_at: date
            }
        },
        setDetailText(state, detailText) {
            state.formPost = {
                ...state.formPost,
                preview_text: detailText
            }
        },
        setDetailTextHTML(state, detailTextHTML) {
            state.formPost = {
                ...state.formPost,
                detail_text_html: detailTextHTML
            }
        },
        addCategory(state, categoryTitle) {
            console.log(categoryTitle)
            const maxId = _.maxBy(state.formPost.categories, "id")?.id
            const newCategoryId = maxId ? maxId + 1 : 1

            state.formPost = {
                ...state.formPost,
                categories: [...state.formPost.categories, { id: newCategoryId, title: categoryTitle }]
            }
        },
        deleteCategory(state, categoryId) {
            state.formPost = {
                ...state.formPost,
                categories: state.formPost.categories.filter(category => category.id !== categoryId)
            }
        },
        setImage(state, image) {
            state.formPost = {
                ...state.formPost,
                preview_image: image
            }
        },
        clear(state) {
            state.formPost = null
            state.post = null
            state.postId = null
        }
    },
    actions: {
        getPostById: async function ({ commit, state }) {
            const { data: { data: post } } = await newsAPI.fetchPostById(state.postId.split("-")[0])
            commit("setPost", post)
        },
        updatePost: async function ({ commit, state }) {
            await newsAPI.updateNews(state.postId.split("-")[0], state.formPost)
            alert("Обновлено")
        },
        deletePost: async function ({ state }) {
            await newsAPI.deleteNews(state.postId.split("-")[0])
            alert("Удалено")
        }
    },
    namespaced: true
}
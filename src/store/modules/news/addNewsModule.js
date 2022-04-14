import { newsAPI } from "@/API/news"
import { dateFormat } from "@/utils/dateFormat"

export const addNewsModule = {
    state() {
        return {
            news: {
                contentHTML: "",
                contentText: "",
                title: "",
                categories: [],
                date: "",
                type: "",
                region: "",
                previewImage: null
            }
        }
    },
    mutations: {
        setNewsContentHTML(state, contentHTML) {
            state.news = {
                ...state.news,
                contentHTML
            }
        },
        setNewsContentText(state, contentText) {
            state.news = {
                ...state.news,
                contentText
            }
        },
        setNewsTitle(state, title) {
            state.news = {
                ...state.news,
                title
            }
        },
        setNewsDate(state, date) {
            state.news = {
                ...state.news,
                date
            }
        },
        setNewsCategory(state, category) {
            state.news = {
                ...state.news,
                categories: [
                    ...state.news.categories,
                    category
                ]
            }
        },
        setNewsType(state, type) {
            state.news = {
                ...state.news,
                type
            }
        },
        setNewsRegion(state, region) {
            state.news = {
                ...state.news,
                region
            }
        },
        setNewsPreviewImage(state, previewImage) {
            state.news = {
                ...state.news,
                previewImage
            }
        },
        deleteCategory(state, removableCategory) {
            state.news = {
                ...state.news,
                categories: state.news.categories.filter(category => removableCategory !== category)
            }
        },
        clearNews(state) {
            state.news = {
                contentHTML: "",
                contentText: "",
                title: "",
                categories: [],
                date: "",
                type: "",
                region: "",
                previewImage: null
            }
        }
    },
    actions: {
        async saveNews({ state }) {
            await newsAPI.saveNews(state.news)
            alert("Новость была опубликована")
        }
    },
    namespaced: true
}
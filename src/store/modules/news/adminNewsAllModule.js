import { newsAPI } from "@/API/news";
import { dateFormat } from "@/utils";

export const adminNewsAllModule = {
    state() {
        return {
            posts: [],
            pagination: {
                newsPerPage: 9,
                newsCurrentCount: 0,
                newsTotalCount: null
            },
            filters: {
                date: "",
                keyword: ""
            }
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setCategories(state, categories) {
            state.categories = categories
        },
        setDate(state, date) {
            state.filters = {
                ...state.filters,
                date
            }
        },
        setKeyword(state, keyword) {
            state.filters = {
                ...state.filters,
                keyword
            }
        },
        clearFilters(state) {
            state.filters = {
                keyword: "",
                date: ""
            }
        },
        setNewsTotalCount(state, newsTotalCount) {
            state.pagination = {
                ...state.pagination,
                newsTotalCount
            }
        },
        setNewsCurrentCount(state, newsCurrentCount) {
            state.pagination = {
                ...state.pagination,
                newsCurrentCount
            }
        }
    },
    actions: {
        getPosts: async function ({ commit, state }) {
            let { keyword, date } = state.filters

            if (date) {
                date = dateFormat(date)
            }

            const { data: { data: { data: posts, pagination } } } = await newsAPI.fetchPosts({
                count: state.pagination.newsPerPage + state.pagination.newsCurrentCount,
                page: state.currentPage,
                dateFrom: date,
                // dateTo: date,
                keyword
            })

            commit("setPosts", posts)
            commit("setNewsTotalCount", pagination.total)
            commit("setNewsCurrentCount", pagination.count)
            return {
              total: pagination.total,
              count: pagination.count
            }
        },
        setDate({ commit, dispatch }, date) {
            commit("setDate", date)
            dispatch("getNewPosts")
        },
        getNewPosts({ commit, dispatch }) {
            commit("setNewsCurrentCount", 0)
            dispatch("getPosts")
        },
        setKeyword({ commit, dispatch }, keyword) {
            commit("setKeyword", keyword)
            dispatch("getNewPosts")
        },
        clearFilters({ commit, dispatch }) {
            commit("clearFilters")
            dispatch("getNewPosts")
        }
    },
    namespaced: true
}


import { newsAPI } from "@/API/news";
import { dateFormat } from "@/utils";

export const newsAllModule = {
    state() {
        return {
            posts: [],
            pagination: {
                newsPerPage: 12,
                newsCurrentCount: 0,
                newsTotalCount: null
            },
            categories: [],
            filters: {
                dateFrom: "",
                dateTo: "",
                categoryId: "",
                regionId: "",
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
        setDateFrom(state, dateFrom) {
            state.filters = {
                ...state.filters,
                dateFrom
            }
        },
        setDateTo(state, dateTo) {
            state.filters = {
                ...state.filters,
                dateTo
            }
        },
        setRegionId(state, regionId) {
            state.filters = {
                ...state.filters,
                regionId
            }
        },
        setCategoryId(state, categoryId) {
            state.filters = {
                ...state.filters,
                categoryId
            }
        },
        setKeyword(state, keyword) {
            state.filters = {
                ...state.filters,
                keyword
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
            let { keyword, regionId, categoryId, dateFrom, dateTo } = state.filters
            if (dateFrom) {
                dateFrom = dateFormat(dateFrom)
            }
            if (dateTo) {
                dateTo = dateFormat(dateTo)
            }

            const { data: { data: { data: posts, pagination } } } = await newsAPI.fetchPosts({
                count: state.pagination.newsPerPage + state.pagination.newsCurrentCount,
                page: state.currentPage,
                dateFrom,
                dateTo,
                regionId,
                categoryId,
                keyword
            })

            commit("setPosts", posts)
            commit("setNewsTotalCount", pagination.total)
            commit("setNewsCurrentCount", pagination.count)
        },
        getCategories: async function ({ commit }) {
            const { data: { data: categories } } = await newsAPI.fetchCategories()
            commit("setCategories", categories)
        },
        getNewPosts({ commit, dispatch }) {
            commit("setNewsCurrentCount", 0)
            dispatch("getPosts")
        },
        setDateFrom({ commit, dispatch }, dateFrom) {
            commit("setDateFrom", dateFrom)
            dispatch("getNewPosts")
        },
        setDateTo({ commit, dispatch }, dateTo) {
            commit("setDateTo", dateTo)
            dispatch("getNewPosts")
        },
        setRegionId({ commit, dispatch }, regionId) {
            commit("setRegionId", regionId)
            dispatch("getNewPosts")
        },
        setCategoryId({ commit, dispatch }, categoryId) {
            commit("setCategoryId", categoryId)
            dispatch("getNewPosts")
        },
        setKeyword({ commit, dispatch }, keyword) {
            commit("setKeyword", keyword)
            dispatch("getNewPosts")
        }
    },
    namespaced: true
}


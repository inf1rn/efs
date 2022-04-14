import { adsAPI } from "@/API/ads";
import { partnersAPI } from "@/API/partners";
import { newsAPI } from "@/API/news";

export const mainPageModule = {
    state() {
        return {
            posts: [],
            partners: [],
            ads: [],
            mapFilters: {
                regionName: ""
            }
        }
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },
        setPartners(state, partners) {
            state.partners = partners
        },
        setAds(state, ads) {
            state.ads = ads.map(ad => ({
                ...ad,
                image: ad.image
            }))
        },
        setMapFiltersRegionName(state, regionName) {
            state.mapFilters = {
                ...state.mapFilters,
                regionName
            }
        }
    },
    getters: {
        getPosts(state) {
            return state.posts
        }
    },
    actions: {
        getPosts: async function ({ commit }) {
            const { data } = await newsAPI.fetchPosts({ count: 3 })
            commit("setPosts", data.data.data)
        },
        getPartners: async function ({ commit }) {
            const { data } = await partnersAPI.fetchPartners()
            commit("setPartners", data.data.data)
        },
        getAds: async function ({ commit }) {
            const { data } = await adsAPI.fetchAds()
            commit("setAds", data.data)
        }
    },
    namespaced: true
}
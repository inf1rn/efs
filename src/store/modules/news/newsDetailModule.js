import { newsAPI } from "@/API/news";

export const newsDetailModule = {
    state() {
        return {
            mainPost: null,
            postId: null,
            pagination: null,
            otherPosts: [],
        }
    },
    mutations: {
        setMainPost(state, mainPost) {
            state.mainPost = mainPost
        },
        addOtherPosts(state, posts) {
            state.otherPosts = posts
        },
        setPostId(state, postId) {
            state.postId = postId
        }
    },
    actions: {
        getPostById: async function ({ commit, state }) {
            const { data: { data: mainPost } } = await newsAPI.fetchPostById(state.postId.split("-")[0])

            commit("setMainPost", mainPost)
        },
        getOtherPosts: async function ({ commit, state }) {
            const { data: { data: { data: otherPosts } } } = await newsAPI.fetchPosts({ exclude: state.postId.split("-")[0], count: 3 })

            commit("addOtherPosts", otherPosts)
        },
    },
    namespaced: true
}
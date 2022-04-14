import { baseAPI } from "./axios";
const baseURL = "/articles"

export const newsAPI = {
    fetchPosts: ({ exclude = "", count = "", dateFrom = "", dateTo = "", regionId = "", categoryId = "", keyword = "", page = "" }) =>
        baseAPI.get(`${baseURL}?
        per_page=${count}&page=${page}&filter[published_after]=${dateFrom}&
        filter[published_before]=${dateTo}&filter[region_id]=${regionId}&
        filter[category_id]=${categoryId}&filter[title]=${keyword}&filter[id_exclude]=${exclude}`),
    fetchPostById: postId => baseAPI.get(`${baseURL}/${postId}?include=categories`),
    fetchCategories: () => baseAPI.get(`${baseURL}/filter-categories`),
    saveNews: ({ contentHTML, contentText, title, categories, date, type, region, previewImage }) => {
        const newsFormData = new FormData()
        newsFormData.append("title", title)
        newsFormData.append("preview_image", previewImage)
        newsFormData.append("detail_text", contentHTML)

        const previewTextArr = contentText.slice(0, 51).split(" ")
        newsFormData.append("preview_text", previewTextArr.slice(0, previewTextArr.length - 1).join(" ") + "...")

        region && newsFormData.append("regions[0]", region)

        for (let i = 0; i < categories.length; i++) {
            newsFormData.append(`categories[${i}]`, categories[i])
        }
        newsFormData.append("published_at", date)

        return baseAPI.post(baseURL, newsFormData)
    },
    updateNews: (postId, { detail_text_html, preview_text, title, categories, published_at, type, region, preview_image }) => {
        const newsFormData = new FormData()
        newsFormData.append("title", title)
        if (preview_image instanceof Blob) {
            newsFormData.append("preview_image", preview_image)
        }
        newsFormData.append("detail_text", detail_text_html)

        const previewTextArr = preview_text.slice(0, preview_text.length - 3).slice(0, 51).split(" ")
        newsFormData.append("preview_text", previewTextArr.slice(0, previewTextArr.length - 1).join(" ") + "...")

        region && newsFormData.append("regions[0]", region)

        for (let i = 0; i < categories.length; i++) {
            newsFormData.append(`categories[${i}]`, categories[i].title)
        }
        newsFormData.append("published_at", published_at)
        return baseAPI.post(`${baseURL}/${postId}`, newsFormData)
    },
    deleteNews: (postId) => {
        return baseAPI.delete(`${baseURL}/${postId}`)
    }
}
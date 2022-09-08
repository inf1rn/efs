export const getCookie = name => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

export const setCookie = (name, value) => {
    document.cookie = `${name}=${value};max-age=${3600 * 24 * 30};Path=/;`

}
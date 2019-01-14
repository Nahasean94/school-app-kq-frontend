export function fetchOptionsOverride(options) {
    options.url = 'http://68.183.29.191:8080/graphql'
    const token = localStorage.getItem('SchoolSystem')
    if (token) options.headers.Authorization = `Bearer ${token}`
}

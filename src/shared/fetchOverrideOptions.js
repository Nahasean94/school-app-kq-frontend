export function fetchOptionsOverride(options) {
    options.url = 'http://localhost:8080/graphql'
    const token = localStorage.getItem('SchoolSystem')
    if (token) options.headers.Authorization = `Bearer ${token}`
}

export const baseurl = "https://vincinemaApi.pythonanywhere.com";

export const login = (username, password) => {
    return fetch(`${baseurl}/login?username=${username}&password=${password}`, {method: 'POST'})
}
export const checkToken = (username, token) => {
    return fetch(`${baseurl}/checkToken?username=${username}&token=${token}`)
}
export const userInfo = (username, token) => {
    return fetch(`${baseurl}/userinfo?username=${username}&token=${token}`)
}

export const register = (username, password) => {
    return fetch(`${baseurl}/register?username=${username}&password=${password}`, {method: 'POST'})
}
export const schedule = () => {
    return fetch(`${baseurl}/schedule`)
}
export const checktoken = (username, token) => {
    return fetch(`${baseurl}/checkToken?username=${username}&token=${token}`)
}
export const getSessionInfo = (ses_id) => {
    return fetch(`${baseurl}/getSession?ses_id=${ses_id}`)
}
export const buyTicket = (ses, username, token, seats) => {
    return fetch(`${baseurl}/buyTikets?sessions_id=${ses}`, {method: 'POST', headers: {
        username: username,
        token: token,
        seats: "[" + seats + "]"
        }})
}

export const getFilms = () => {
    return fetch(`${baseurl}/getFilms`)
}

export const forgotPasswordConfirm = (username) => {
    return fetch(`${baseurl}/forgot-password?username=${username}`, {method: 'POST'})
}

export const ResetPassword = (username, code, password ) => {
    return fetch(`${baseurl}/reset-password?username=${username}&secret_code=${code}&password=${password}`, {method: 'POST'})
}
export const getSessions = (film_id) => {
    return fetch(`${baseurl}/getSessions?film_id=${film_id}`)
}

export const confirmPayment = (payment_id) => {
    return fetch(`${baseurl}/confirmPayment?payment_id=${payment_id}`)
}
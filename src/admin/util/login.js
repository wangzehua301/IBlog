export const getLoginStatus = () => {
    let login
    const { token , tokenExpiredAt } = window.localStorage
    const currentTime = (new Date()).getTime()
    const expireTime = (new Date(tokenExpiredAt)).getTime()
    if(token && (currentTime <= expireTime)){
        login = true
    }
    if(! login){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('tokenExpiredAt')
        window.localStorage.removeItem('photo')
    }
    return login
}
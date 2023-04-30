import { http, setAuthToken } from '../modules/http'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGGED_IN = 'auth::logged_in'
export const LOGGED_OFF = 'auth::logged_off'
export const SET_LOGIN_ERROR = 'auth::set_login_error'
export const SET_REGISTER_ERROR = 'auth::set_register_error'
export const RESET_CAPTCHA = 'auth::reset_captcha'
export const SET_IS_LOADING = 'auth::set_is_loading'

// ------------------------------------
// Actions
// ------------------------------------
const loggedIn = (data) => (dispatch) => {
    dispatch({ type: LOGGED_IN, payload: data })
}

const loggedOff = () => (dispatch) => {
    dispatch({ type: LOGGED_OFF })
}

const setLoginError = (value) => (dispatch) => {
    dispatch({ type: SET_LOGIN_ERROR, payload: value })
}

const setRegisterError = (success, message) => (dispatch) => {
    dispatch({
        type: SET_REGISTER_ERROR,
        payload: {
            success,
            message,
        },
    })
}

const login = (email, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        dispatch(setLoginError(false))
        dispatch(setIsLoading(true))

        http.post('/auth/login', {
            email,
            password,
        })
            .then((response) => {
                dispatch(loggedIn(response.data.data.user))
                setAuthToken(response.data.data.user.token)
                dispatch(setIsLoading(false))
                resolve(response.data.data.user)
            })
            .catch(
                ({
                    response: {
                        data: { message },
                    },
                }) => {
                    dispatch(setIsLoading(false))
                    reject({ message })
                },
            )
    })
}
const register = (values) => (dispatch) => {
    return new Promise((resolve, reject) => {
        http.post('/auth/register', values)
            .then((response) => {
                resolve(response.data)
            })
            .catch((e) => {
                reject(e)
            })
    })
}
const activateAccount = (token) => (dispatch) => {
    return new Promise((resolve, reject) => {
        http.post(`/auth/activate_account`, {
            token,
        })
            .then((response) => {
                resolve(response.data)
            })
            .catch((e) => {
                reject(e)
            })
    })
}

const logoff = () => (dispatch) => {
    return new Promise((resolve) => {
        http.post('/auth/logout').then(() => {
            dispatch(loggedOff())
            setAuthToken('')
            resolve(true)
        })
    })
}

const resetCaptcha = () => (dispatch) => {
    dispatch({
        type: RESET_CAPTCHA,
    })
}

const setIsLoading = (value) => (dispatch) => {
    dispatch({ type: SET_IS_LOADING, payload: value })
}

export const actions = {
    loggedIn,
    loggedOff,
    setLoginError,
    login,
    logoff,
    register,
    setRegisterError,
    resetCaptcha,
    setIsLoading,
    activateAccount,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [LOGGED_IN]: (state, { payload }) => {
        return {
            ...state,
            isLoggedIn: true,
            user: payload,
        }
    },
    [LOGGED_OFF]: (state) => {
        return {
            ...state,
            isLoggedIn: false,
            user: {},
        }
    },
    [SET_LOGIN_ERROR]: (state, { payload }) => {
        return {
            ...state,
            loginError: payload,
        }
    },
    [SET_REGISTER_ERROR]: (state, { payload: { success, message } }) => {
        return {
            ...state,
            registerError: {
                success,
                message,
            },
        }
    },
    [RESET_CAPTCHA]: (state) => {
        return {
            ...state,
            captcha: Math.random(),
        }
    },
    [SET_IS_LOADING]: (state, { payload }) => {
        return {
            ...state,
            isLoading: payload,
        }
    },
}

// ------------------------------------
// Reducer
// ------------------------------------

const getInitialState = () => ({
    isLoggedIn: false,
    user: {},
    loginError: false,
    registerError: {},
    captcha: Math.random(),
    isLoading: false,
})

export default function userReducer(state = getInitialState(), action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['auth']
const getIsLoggedIn = (state) => getState(state)['isLoggedIn']
const getLoginError = (state) => getState(state)['loginError']
const getUser = (state) => getState(state)['user']
const getRegisterError = (state) => getState(state)['registerError']
const getCaptcha = (state) => getState(state)['captcha']
const getIsLoading = (state) => getState(state)['isLoading']

export const selectors = {
    getState,
    getIsLoggedIn,
    getLoginError,
    getUser,
    getRegisterError,
    getCaptcha,
    getIsLoading,
}

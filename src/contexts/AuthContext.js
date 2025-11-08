import { createContext, useContext, useReducer } from "react";
import { getUsers } from "../services/api";

const AuthContext = createContext();

const initAuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null
}

const actions = {
    LOGIN_START: 'LOGIN_START',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',
    LOGOUT: 'LOGOUT',
    CLEAR_ERROR: 'CLEAR_ERROR',
}

const authReducer = (state, action) => {
    switch (action.type) {
        case actions.LOGIN_START:
            return { ...state, isLoading: true, error: null }
        case actions.LOGIN_SUCCESS:
            localStorage.setItem("user", JSON.stringify(action.payload))
            return { ...state, isLoading: false, isAuthenticated: true, user: action.payload, error: null }
        case actions.LOGIN_FAIL:
            return { ...state, isLoading: false, error: action.payload }
        case actions.LOGOUT:
            localStorage.removeItem("user")
            return initAuthState;
        case actions.CLEAR_ERROR:
            return { ...state, error: null }
        case actions.SET_AUTH:
            return { ...state, isAuthenticated: true, user: JSON.parse(localStorage.getItem("user")), error: null }
        default:
            break;
    }
}

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initAuthState);

    const clearError = () => {
        dispatch({ type: actions.CLEAR_ERROR })
    }

    const setAuth = () => {
        dispatch({ type: actions.SET_AUTH })
    }

    const login = async ({ identifier, password }) => {
        dispatch({ type: actions.LOGIN_START })
        try {
            const accounts = await getUsers();
            const user = accounts.find((acc) => (acc.email === identifier || acc.username === identifier) && acc.password === password)
            if (user) {
                // Validate role and status
                if (user.role !== "admin" || user.status !== "active") {
                    const errorMsg = "Tài khoản bị khóa, bạn không có quyền truy cập";
                    dispatch({ type: actions.LOGIN_FAIL, payload: errorMsg })
                    return { success: false, message: errorMsg }
                }
                dispatch({ type: actions.LOGIN_SUCCESS, payload: user })
                return { success: true, user }
            }
            const errorMsg = "Invalid username/email or password";
            dispatch({ type: actions.LOGIN_FAIL, payload: errorMsg })
            return { success: false, message: errorMsg }
        } catch (error) {
            const errorMsg = "Login failed due to network error";
            dispatch({ type: actions.LOGIN_FAIL, payload: errorMsg })
            return { success: false, message: errorMsg }
        }
    }

    const logout = () => {
        dispatch({ type: actions.LOGOUT })
    }

    const contextValue = {
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.isLoading,
        error: state.error,
        clearError,
        login,
        logout,
        setAuth
    }

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
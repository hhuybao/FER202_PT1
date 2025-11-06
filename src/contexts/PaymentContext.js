import { createContext, useContext, useReducer } from "react";
import { getPayments } from "../services/api";

const PaymentContext = createContext();

const initPaymentState = {
    data: null,
    isLoading: false,
}

const actions = {
    PAYMENTS_LOADING: 'PAYMENTS_LOADING',
    PAYMENTS_SUCCESS: 'PAYMENTS_SUCCESS',
    PAYMENTS_FAIL: 'PAYMENTS_FAIL',
}

const paymentReducer = (state, action) => {
    switch (action.type) {
        case actions.PAYMENTS_LOADING:
            return { ...state, isLoading: true }
        case actions.PAYMENTS_SUCCESS:
            return { ...state, isLoading: false, data: action.payload }
        case actions.PAYMENTS_FAIL:
            return { ...state, isLoading: false, error: action.payload }
        default:
            break;
    }
}

export const PaymentProvider = ({ children }) => {
    const [state, dispatch] = useReducer(paymentReducer, initPaymentState);

    const getListPayment = async (sortby, search, semester, course) => {
        dispatch({ type: actions.PAYMENTS_LOADING })
        try {
            const payements = await getPayments({ sortby, search, semester, course });
            dispatch({ type: actions.PAYMENTS_SUCCESS, payload: payements })
            return { success: true, payements }
        } catch (error) {
            const errorMsg = "Network error";
            dispatch({ type: actions.PAYMENTS_FAIL, payload: errorMsg })
            return { success: false, message: errorMsg }
        }
    }

    const contextValue = {
        data: state.data,
        loading: state.isLoading,
        getListPayment
    }

    return <PaymentContext.Provider value={contextValue}>{children}</PaymentContext.Provider>
}

export const usePayment = () => useContext(PaymentContext)
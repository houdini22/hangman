import * as React from 'react'

// constants
export const CONNECTION_ERROR_MODAL_VISIBLE =
    'common::connection_error_modal_visible'

// actions

const setConnectionErrorModalVisible = (visible, error) => (dispatch) => {
    dispatch({
        type: CONNECTION_ERROR_MODAL_VISIBLE,
        payload: { visible, error },
    })
}

export const actions = {
    setConnectionErrorModalVisible,
}

// action handlers

const ACTION_HANDLERS = {
    [CONNECTION_ERROR_MODAL_VISIBLE]: (
        state,
        { payload: { visible, error } },
    ) => {
        return {
            ...state,
            connectionErrorModalVisible: visible,
            connectionError: error,
        }
    },
}

// reducers

const initialState = {
    connectionErrorModalVisible: false,
    connectionError: null,
}

export default function userReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['common']
const getIsConnectionErrorModalVisible = (state) =>
    getState(state)['connectionErrorModalVisible']
const getConnectionError = (state) => getState(state)['connectionError']

export const selectors = {
    getState,
    getIsConnectionErrorModalVisible,
    getConnectionError,
}

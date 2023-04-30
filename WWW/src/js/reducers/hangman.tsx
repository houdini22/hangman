import * as React from 'react'
import { clearInterval } from 'timers'

// game helpers

const transformWordToGuessWord = (word) => {
    return word
        .trim()
        .toLowerCase()
        .split('')
        .map((letter) => {
            if (letter.match(/[a-ząćęńółźż]+/)) {
                return '_'
            }
            return ' '
        })
        .join('')
}

// constants
export const SET_WORD = 'hangman::set_word'
export const SET_WORD_MODAL_VISIBLE = 'hangman::set_word_modal_visible'
export const SET_GUESS_WORD = 'hangman::set_guess_word'
export const INC_MISTAKES = 'hangman::inc_mistakes'
export const INC_DURATION = 'hangman::inc_duration'
export const END_GAME = 'hangman::end_game'
export const RESET = 'hangman::reset'

// actions
let gameTimer = null
const setWord = (value) => (dispatch, state) => {
    dispatch({ type: SET_WORD, payload: value })
    dispatch({ type: SET_GUESS_WORD, payload: transformWordToGuessWord(value) })
    if (!gameTimer) {
        gameTimer = setInterval(() => {
            const { guessWord, won } = state()['hangman']
            if (guessWord && won === null) {
                dispatch(incDuration())
            }
        }, 1000)
    }
}
const setWordModalVisible = (value) => (dispatch) => {
    dispatch({ type: SET_WORD_MODAL_VISIBLE, payload: value })
}
const incMistakes = () => (dispatch) => {
    dispatch({ type: INC_MISTAKES })
}
const endGame = (win) => (dispatch) => {
    dispatch({ type: END_GAME, payload: win })
}

const incDuration = () => (dispatch) => {
    dispatch({ type: INC_DURATION })
}
const reset = () => (dispatch) => {
    dispatch({ type: RESET })
}
const guessLetter = (letter) => (dispatch, state) => {
    const word = state()['hangman']['word']
    const guessWord = state()['hangman']['guessWord']

    if (!guessWord.match(new RegExp(`${letter.toLowerCase()}`, 'g'))) {
        if (!word.match(new RegExp(`${letter.toLowerCase()}`, 'g'))) {
            dispatch(incMistakes())

            const mistakes = state()['hangman']['mistakes']
            if (mistakes === 8) {
                dispatch(endGame(false))
            }
        } else {
            const newGuessWord = word
                .split('')
                .map((l, i) => {
                    if (letter.toLowerCase() === l) {
                        return letter
                    }
                    return guessWord[i]
                })
                .join('')
            dispatch({ type: SET_GUESS_WORD, payload: newGuessWord })
            if (newGuessWord.toLowerCase() === word.toLowerCase()) {
                dispatch(endGame(true))
            }
        }
    }
}
export const actions = {
    setWord,
    setWordModalVisible,
    incMistakes,
    incDuration,
    guessLetter,
    reset,
}

// action handlers

const ACTION_HANDLERS = {
    [SET_WORD]: (state, { payload }) => {
        return {
            ...state,
            word: payload,
        }
    },
    [SET_WORD_MODAL_VISIBLE]: (state, { payload }) => {
        return {
            ...state,
            wordModalVisible: payload,
        }
    },
    [SET_GUESS_WORD]: (state, { payload }) => {
        return {
            ...state,
            guessWord: payload,
        }
    },
    [INC_MISTAKES]: (state) => {
        return {
            ...state,
            mistakes: state.mistakes + 1,
        }
    },
    [INC_DURATION]: (state) => {
        return {
            ...state,
            gameDuration: state.gameDuration + 1,
        }
    },
    [END_GAME]: (state, { payload }) => {
        return {
            ...state,
            won: payload,
            guessWord: '',
        }
    },
    [RESET]: (state) => {
        return {
            ...state,
            won: null,
            guessWord: '',
            word: '',
            mistakes: 1,
            gameDuration: 0,
            wordModalVisible: true,
        }
    },
}

// reducers
const initialState = {
    word: '',
    wordModalVisible: true,
    guessWord: '',
    mistakes: 1,
    gameDuration: 0,
    won: null,
}

export default function userReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}

// selectors

const getState = (state) => state['hangman']
const getWord = (state) => getState(state)['word']
const getWordModalVisible = (state) => getState(state)['wordModalVisible']
const getGuessWord = (state) => getState(state)['guessWord']
const getMistakes = (state) => getState(state)['mistakes']
const getDuration = (state) => getState(state)['gameDuration']
const getWon = (state) => getState(state)['won']

export const selectors = {
    getState,
    getWord,
    getWordModalVisible,
    getGuessWord,
    getMistakes,
    getDuration,
    getWon,
}

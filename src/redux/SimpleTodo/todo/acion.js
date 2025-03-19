import { ADDED, ALLCLEAR, ALLCOMPLETED, COLORSELECTED, DELETED, LOADED, TOGGLED } from "./actionTypes"

export const loadTodo = (todos) => {
    return {
        type: LOADED,
        payload: todos
    }
}


export const addTodo = (todoText) => {
    return {
        type: ADDED,
        payload: todoText
    }
}

export const toggleTodo = (todoId) => {
    return {
        type: TOGGLED,
        payload: todoId
    }
}

export const colorSelected = (todoId, todoColor) => {
    return {
        type: COLORSELECTED,
        payload: {
            todoId,
            todoColor
        }
    }
}

export const deletedTodo = (todoId) => {
    return {
        type: DELETED,
        payload: todoId
    }
}

export const allCompleted = () => {
    return {
        type: ALLCOMPLETED
    }
}


export const allClear = () => {
    return {
        type: ALLCLEAR
    }
}
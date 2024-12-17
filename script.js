const counterEl = document.getElementById('counter');
const incrementEl = document.getElementById('increment');
const decrementEl = document.getElementById('decrement');


// Initial State 
const initialState = {
    count: 0,
}


// create a reducer function
const counterReducer = (state = initialState, action) => {
    if (action.type === 'increment') {
        return { ...state, value: state.value + 1}
    } else if (action.type === 'decrement') {
        return {...state, value: state.value - 1}
    } else {
        return state
    }
}



// create a redux store
const store = Redux.createStore(counterReducer)


// add button listener

incrementEl.addEventListener("click", () => {
    store.dispatch({
        type: 'increment'
    })
})

decrementEl.addEventListener("click", () => {
    store.dispatch({
        type: 'decrement'
    })
})
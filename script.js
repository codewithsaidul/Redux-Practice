const counterEl = document.getElementById('counter');
const incrementEl = document.getElementById('increment');
const decrementEl = document.getElementById('decrement');


// Initial State 
const initialState = {
    value: 0,
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


const render = () => {
    const state = store.getState();
    counterEl.innerText = state.value.toString()
}


store.subscribe(render)

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
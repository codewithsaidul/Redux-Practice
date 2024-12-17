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
        return { ...state, value: state.value + action.payload}
    } else if (action.type === 'decrement') {
        return {...state, value: state.value - action.payload}
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
render();

// add button listener

incrementEl.addEventListener("click", () => {
    store.dispatch({
        type: 'increment',
        payload: 6
    })
})

decrementEl.addEventListener("click", () => {
    store.dispatch({
        type: 'decrement',
        payload: 3
    })
})
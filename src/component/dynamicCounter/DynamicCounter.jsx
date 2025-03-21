import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../../rtk/features/counter/counterSlice';


const DynamicCounter = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.counter.count)

  const handleIncrement = () => {
    dispatch(counterActions.increment(5))
  }
  const handleDecrement = () => {
    dispatch(counterActions.decrement(2))
  }
    
    return (
        <div className="p-4 h-auto flex flex-col items-center justify-center space-y-5 bg-white rounded shadow">
          <div className="text-2xl font-semibold">{count}</div>
          <div className="flex space-x-3">
            <button
              className="bg-indigo-400 text-white px-3 py-2 rounded shadow"
              onClick={handleIncrement}
            >
              Increment
            </button>
            <button
              className="bg-red-400 text-white px-3 py-2 rounded shadow"
              onClick={handleDecrement}
            >
              Decrement
            </button>
          </div>
        </div>
      );
}

export default DynamicCounter
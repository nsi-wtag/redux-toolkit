import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);
  const addValue = Number(incrementAmount) || 0;

  const handleInputChange = (e) => {
    setIncrementAmount(e.target.value);
  };

  const handleAddAmount = () => {
    dispatch(incrementByAmount(addValue))
  };

  const handleResetAll = () => {
    setIncrementAmount(0);
    dispatch(reset());
  };

  return (
    <section>
      <p>{count}</p>
      
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>

      <input type="text" value={incrementAmount} onChange={handleInputChange} />

      <div>
        <button onClick={handleAddAmount}>Add Amount</button>
        <button onClick={handleResetAll}>Reset All</button>
      </div>
    </section>
  )
}

export default Counter;

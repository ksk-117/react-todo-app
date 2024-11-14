import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  const countUp = () => {
    const newCount = count + 1;
    setCount(newCount);
  };
  return (
    <div>
      <h1>TodoApp</h1>
      <button onClick={countUp}>count is {count}</button>
    </div>
  );
};

export default App;
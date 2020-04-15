import React, { useDeferredValue, useState } from "react";
import SlowList from "./SlowList";

export default function() {
  const [text, setText] = useState("hello");

  const deferredText = useDeferredValue(text, {
    timeoutMs: 5000
  });

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="App">
      <h1>React With Concurrent Mode</h1>
      <label>
        Type into the input:{" "}
        <input
          value={text}
          onChange={handleChange}
        />
      </label>
      {/* Pass the "lagging" value to the list */}
      <SlowList text={deferredText} />
    </div>
  );
}

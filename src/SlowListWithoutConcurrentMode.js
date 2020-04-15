import React, { useState } from "react";
import SlowList from "./SlowList";

export default function() {
  const [text, setText] = useState("hello");

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="App">
      <h1>React Without Concurrent Mode</h1>
      <label>
        Type into the input:{" "}
        <input
          value={text}
          onChange={handleChange}
        />
      </label>
      <hr />
      <SlowList text={text} />
    </div>
  );
}

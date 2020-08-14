import React, { useState, Suspense, useTransition } from "react";

import { fetchTranslation } from "./fakeApi";

const initialQuery = "Hello, world";
const initialResource = fetchTranslation(
  initialQuery
);

export default function () {
  const [query, setQuery] = useState(
    initialQuery
  );
  const [resource, setResource] = useState(
    initialResource
  );
  const [
    startTransition,
    isPending
  ] = useTransition({
    timeoutMs: 5000
  });

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    
    startTransition(() => {
      setResource(fetchTranslation(value));
    });
  }

  return (
    <>
      <input
        value={query}
        onChange={handleChange}
      />
      <Suspense fallback={<p>Loading...</p>}>
        <div style={{ color: isPending ? "#777" : "#222" }}>
          <Translation resource={resource} />
        </div>
      </Suspense>
    </>
  );
}

function Translation({ resource }) {
  return (
    <p>
      <b>{resource.read()}</b>
    </p>
  );
}

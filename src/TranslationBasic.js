import React, { useState, Suspense } from "react";

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

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    setResource(fetchTranslation(value));
  }

  return (
    <>
      <input
        value={query}
        onChange={handleChange}
      />
      <Suspense fallback={<p>Loading...</p>}>
        <Translation resource={resource} />
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

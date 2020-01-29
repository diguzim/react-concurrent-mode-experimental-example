import React from 'react';
import FetchOnRender from './FetchOnRender';
import FetchThenRender from './FetchThenRender';
import FetchThenRenderParallel from './FetchThenRenderParallel';
import FetchThenRenderParallelHarder from './FetchThenRenderParallelHarder';
import RenderAsYouFetch from './RenderAsYouFetch';
import './App.css';

export function LoadingComponent() {
  return <p>Loading</p>;
}

function App() {
  return (
    <div className="App">
      <FetchThenRenderParallel />
    </div>
  );
}

export default App;

import React from 'react';
import FetchOnRender from './FetchOnRender';
import FetchThenRender from './FetchThenRender';
import FetchThenRenderParallel from './FetchThenRenderParallel';
import FetchThenRenderParallelHarder from './FetchThenRenderParallelHarder';
import RenderAsYouFetch from './RenderAsYouFetch';
import RenderAsYouFetchBasedOnProps from './RenderAsYouFetchBasedOnProps';
import './App.css';

function App() {
  return (
    <div className="App">
      <RenderAsYouFetchBasedOnProps />
    </div>
  );
}

export default App;

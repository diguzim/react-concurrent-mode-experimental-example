import React from 'react';
import FetchOnRender from './FetchOnRender';
import FetchThenRender from './FetchThenRender';
import FetchThenRenderParallel from './FetchThenRenderParallel';
import FetchThenRenderParallelHarder from './FetchThenRenderParallelHarder';
import RenderAsYouFetch from './RenderAsYouFetch';
import RenderAsYouFetchBasedOnProps from './RenderAsYouFetchBasedOnProps';
import RaceConditionWithUseEffect from './RaceConditionWithUseEffect';
import HandlingErrors from './HandlingErrors';
import StartTransition from './StartTransition';
import StartTransitionWithIsPending from './StartTransitionWithIsPending';
import './App.css';

function App() {
  return (
    <div className="App">
      <StartTransitionWithIsPending />
    </div>
  );
}

export default App;

import React from 'react';
// import FetchOnRender from './FetchOnRender';
// import FetchThenRender from './FetchThenRender';
// import FetchThenRenderParallel from './FetchThenRenderParallel';
// import FetchThenRenderParallelHarder from './FetchThenRenderParallelHarder';
// import RenderAsYouFetch from './RenderAsYouFetch';
import RenderAsYouFetchBasedOnProps from './RenderAsYouFetchBasedOnProps';
// import RaceConditionWithUseEffect from './RaceConditionWithUseEffect';
// import HandlingErrors from './HandlingErrors';
// import StartTransition from './StartTransition';
// import StartTransitionWithIsPending from './StartTransitionWithIsPending';
// import RefreshWithoutTransition from './RefreshWithoutTransition';
// import RefreshWithTransition from './RefreshWithTransition';
// import ButtonWithTransition from './ButtonWithTransition';
// import RecededSkeletonComplete from './RecededSkeletonComplete';
// import PendingSkeletonComplete from './PendingSkeletonComplete';
import './App.css';

function App() {
  return (
    <div className="App">
      <RenderAsYouFetchBasedOnProps />
    </div>
  );
}

export default App;

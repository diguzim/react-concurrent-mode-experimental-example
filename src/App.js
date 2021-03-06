import React from 'react';
// import FetchOnRender from './FetchOnRender';
// import FetchThenRender from './FetchThenRender';
// import FetchThenRenderParallel from './FetchThenRenderParallel';
// import FetchThenRenderParallelHarder from './FetchThenRenderParallelHarder';
// import RenderAsYouFetch from './RenderAsYouFetch';
// import RenderAsYouFetchBasedOnProps from './RenderAsYouFetchBasedOnProps';
// import RaceConditionWithUseEffect from './RaceConditionWithUseEffect';
// import HandlingErrors from './HandlingErrors';
// import StartTransition from './StartTransition';
// import StartTransitionWithIsPending from './StartTransitionWithIsPending';
// import RefreshWithoutTransition from './RefreshWithoutTransition';
// import RefreshWithTransition from './RefreshWithTransition';
// import ButtonWithTransition from './ButtonWithTransition';
// import RecededSkeletonComplete from './RecededSkeletonComplete';
// import PendingSkeletonComplete from './PendingSkeletonComplete';
// import LazyFeature from './LazyFeature';
// import LazyFeatureWrappedOnSuspense from './LazyFeatureWrappedOnSuspense';
// import RevealTrain from './RevealTrain';
// import DelayingPendingIndicator from './DelayingPendingIndicator';
// import TranslationBasic from './TranslationBasic';
// import TranslationProblematic from './TranslationProblematic';
// import TranslationElegant from './TranslationElegant';
// import SlowProfileSwitcher from './SlowProfileSwitcher';
// import FastProfileSwitcher from './FastProfileSwitcher';
// import SlowListWithoutConcurrentMode from './SlowListWithoutConcurrentMode';
// import SlowListWithConcurrentMode from './SlowListWithConcurrentMode';
// import WithoutSuspenseList from './WithoutSuspenseList';
// import WithoutSuspenseListSuspendedTogether from './WithoutSuspenseListSuspendedTogether';
import WithSuspenseList from './WithSuspenseList';
import './App.css';

function App() {
  return (
    <div className="App">
      <WithSuspenseList />
    </div>
  );
}

export default App;

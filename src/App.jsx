import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WorkoutStats from './components/WorkoutStats';
import CanvasMap from './components/CanvasMap';
import Tips from './components/Tips';
import useGeolocation from './hooks/useGeolocation';
import useNetworkStatus from './hooks/useNetworkStatus';

const App = () => {
  const { distance, time, startWorkout, canvasRef } = useGeolocation();
  const network = useNetworkStatus();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <Header />
      <div style={{ padding: '1rem' }}>
        <button onClick={startWorkout}>Start Workout</button>
        <WorkoutStats distance={distance} time={time} network={network} />
        <CanvasMap canvasRef={canvasRef} />
        <Tips />
      </div>
    </div>
  );
};

export default App;
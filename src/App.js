// src/App.js
import React from 'react';
import './App.css';
import RaceTrack from './components/RaceTrack/RaceTrack';

const participants = [
  { id: 1, name: 'Alice', tickets: 10 },
  { id: 2, name: 'Bob', tickets: 20 },
  { id: 2, name: 'Bob', tickets: 20 },
  { id: 2, name: 'Bob', tickets: 20 },
  { id: 2, name: 'Bob', tickets: 20 },
  { id: 2, name: 'Bob', tickets: 20 },
  { id: 2, name: 'Bob', tickets: 20 },
  { id: 2, name: 'Bob', tickets: 20 },
  { id: 2, name: 'Bob', tickets: 20 },
  { id: 2, name: 'Bob', tickets: 20 },
  { id: 2, name: 'Bob', tickets: 20 },
  { id: 2, name: 'Bob', tickets: 20 },
  { id: 2, name: 'Bob', tickets: 20 },
  { id: 2, name: 'Bob', tickets: 20 },
  // Add more mock participants as needed
];

function App() {
  return (
    <div className="App">
      <RaceTrack participants={participants} />
    </div>
  );
}

export default App;

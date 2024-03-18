// src/components/RaceTrack/RaceTrack.jsx
import React from 'react';
import Car from '../Car/Car'; // Adjust the path as needed
import './RaceTrack.css';

const RaceTrack = ({ participants }) => {
  // Assuming participants is an array of objects { id, name, tickets }
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#F33FF5', '#F5F33F', /* More colors as needed */];

  return (
    <div className="race-track">
      {participants.map((participant, index) => (
        <div key={participant.id} className="lane">
          <Car
            name={participant.name}
            tickets={participant.tickets}
            color={colors[index % colors.length]} // Cycle through colors
          />
        </div>
      ))}
    </div>
  );
};

export default RaceTrack;

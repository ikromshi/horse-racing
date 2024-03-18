// src/components/Car/Car.js
import React from 'react';
import './Car.css';

const Car = ({ name, tickets, color }) => {
  return (
    <div className="car" style={{ backgroundColor: color }}>
      {/* This div represents the car. Customize as needed. */}
      <div className="car-details">
        {/* Optionally display name or ticket count here */}
        <span className="name">{name}</span>
      </div>
    </div>
  );
};

export default Car;

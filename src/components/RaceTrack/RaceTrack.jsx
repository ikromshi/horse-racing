import React from 'react';
import styled from 'styled-components';
import carImage from '../../assets/car-yellow.png';

const Track = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: black;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
`;


const Lane = styled.div`
  height: calc((100vh - 40px) / ${props => props.numberOfLanes}); /* 40px accounts for the padding */
  width: 90%; /* Adjust width as needed */
  border-bottom: 2px dashed yellow;
  position: relative;
  &:last-child {
    border-bottom: none;
  }
`;

const Car = styled.img`
  height: 20px; // Adjust based on your preference
  position: absolute;
  // Adjust this value to center the car, it could be positive or negative
  // You might need to tweak this after inspecting the actual rendered output
  top: 50%;
  transform: translateY(-50%); // This ensures the car is centered regardless of its height
  right: ${props => props.position}%; /* Position based on tickets */
  filter: ${props => `hue-rotate(${props.color}deg)`}; // Change color through hue rotation
  transition: bottom 0.5s ease-in-out; // Smooth transition for the movement
`;


const carsData = [
  { name: "Alex", ticket_amount: 20 },
  { name: "Jordan", ticket_amount: 5 },
  { name: "Casey", ticket_amount: 50 },
  { name: "Morgan", ticket_amount: 30 },
  { name: "Taylor", ticket_amount: 10 },
  { name: "Jamie", ticket_amount: 80 },
  { name: "Quinn", ticket_amount: 45 },
  { name: "Reese", ticket_amount: 0 },
  { name: "Skyler", ticket_amount: 9 },
  { name: "Drew", ticket_amount: 50 },
  { name: "Cameron", ticket_amount: 12 },
  { name: "Riley", ticket_amount: 70 },
  { name: "Avery", ticket_amount: 23 },
  { name: "Peyton", ticket_amount: 75 },
  { name: "Harper", ticket_amount: 11 },
  { name: "Charlie", ticket_amount: 7 },
  { name: "Dakota", ticket_amount: 9 },
  { name: "Emerson", ticket_amount: 35 },
  { name: "Finley", ticket_amount: 25 },
  { name: "Elliot", ticket_amount: 15 },
  { name: "Jordan", ticket_amount: 5 },
  { name: "Logan", ticket_amount: 140 },
  { name: "Logan", ticket_amount: 36 },
  { name: "Spencer", ticket_amount: 44 },
  { name: "Spencer", ticket_amount: 150 }
];


// Calculate position based on ticket amount (Example: linear scale, you might need to adjust this)
const calculatePosition = (ticket_amount) => {
  // Assuming 100 tickets places the car at 90% towards the top, adjust as needed
  const maxTickets = Math.max(...carsData.map(car => car.ticket_amount));
  return (ticket_amount / maxTickets) * 90;
};

// Calculate horizontal position based on ticket amount
const calculateHorizontalPosition = (ticket_amount) => {
  const maxTickets = 200; // Define the maximum number of tickets
  return (96-(ticket_amount / maxTickets) * 100).toFixed(2); // Calculate the percentage
};


const RaceTrack = () => {
  return (
    <Track>
      {carsData.map((car, index) => (
        <Lane key={index} numberOfLanes={carsData.length}>
          <Car
            src={carImage} 
            position={calculateHorizontalPosition(car.ticket_amount)}
            color={(index * 360) / carsData.length} // Distribute colors across the spectrum
            alt={`Car driven by ${car.name}`}
          />
        </Lane>
      ))}
    </Track>
  );
};


export default RaceTrack;

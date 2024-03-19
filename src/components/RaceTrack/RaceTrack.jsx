import React from 'react';
import carImage from '../../assets/car-yellow.png';
import styled, { keyframes } from 'styled-components';
import carsData from "../../data/carsData.json"


const bobbing = keyframes`
  0%, 100% {
    transform: translateY(-50%) scale(1);
  }
  50% {
    transform: translateY(-55%) scale(1.05);
  }
`;


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
  right: 4.5%;
  &:last-child {
    border-bottom: none;
  }
`;

const smoke = keyframes`
  0% {
    transform: scale(0.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const CarWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: ${props => props.position}%;
  transform: translateY(-50%);
  height: 50px; /* Match the car's height */
`;

const ExhaustSmoke = styled.div`
  position: absolute;
  bottom: 10px; /* Adjust to position the smoke at the car's exhaust */
  left: -20px; /* Start the smoke behind the car */
  width: 20px; /* Adjust size as needed */
  height: 20px; /* Adjust size as needed */
  background: rgba(155, 155, 155, 0.8); /* Smoke color */
  border-radius: 50%;
  animation: ${smoke} 2s ease-out infinite;
`;

const Car = styled.img`
  height: 20px; // Adjust based on your preference
  position: absolute;
  top: 50%;
  transform: translateY(-50%); // This ensures the car is centered regardless of its height
  // right: ${props => props.position}%; /* Position based on tickets */
  filter: ${props => `hue-rotate(${props.color}deg)`}; // Change color through hue rotation
  transition: bottom 0.5s ease-in-out; // Smooth transition for the movement
  animation: ${bobbing} 1.5s ease-in-out infinite;

`;

const NameTag = styled.div`
  position: absolute;
  top: 50%; /* Align vertically with the car */
  transform: translateY(-50%); /* Center the name tag vertically with the car */
  left: calc(100% + 10px); /* Place it just to the right of the car, adjust as needed */
  white-space: nowrap; /* Keep the name in a single line */
  color: #fff; /* Text color, choose as needed */
  font-size: 12px; /* Choose an appropriate size for the name tag */
  font-weight: bold; /* Optional: make it bold */
  text-shadow: 1px 1px 2px rgba(0,0,0,0.6); /* Optional: text shadow for better readability */
`;

const Name = styled.h3`
  margin-top: 0;
`

// Calculate horizontal position based on ticket amount
const calculateHorizontalPosition = (ticket_amount) => {
  const maxTickets = 200; // Define the maximum number of tickets
  return (96-(ticket_amount / maxTickets) * 100).toFixed(2); // Calculate the percentage
};


const RaceTrack = () => {

  return (
    <Track>
    <Name>SD ticket race</Name>
      {carsData.map((car, index) => (
        <Lane key={index} numberOfLanes={carsData.length}>
          <CarWrapper position={calculateHorizontalPosition(car.ticket_amount)}>
            <ExhaustSmoke /> {/* Add the smoke component here */}
            <Car
              src={carImage} 
              position={calculateHorizontalPosition(car.ticket_amount)}
              color={(index * 360) / carsData.length} // Distribute colors across the spectrum
              alt={`Car driven by ${car.name}`}
            />
          </CarWrapper>
          <NameTag>{`${car.name.split(" ")[0]}: ${car.ticket_amount}`}</NameTag>
        </Lane>
      ))}
    </Track>
  );
};


export default RaceTrack;

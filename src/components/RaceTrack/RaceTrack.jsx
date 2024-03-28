import React from 'react';
import carImage from '../../assets/car-yellow.png';
import styled, { keyframes, css } from 'styled-components';
import carsData from "../../data/carsData.json";
import hornSound from "../../assets/honk.mp3";

const audioRef = React.createRef();

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
  height: calc((100vh - 10px) / ${props => props.numberOfLanes}); 
  width: 100%; 
  border-bottom: 1px dashed rgba(235, 235, 107, 0.3);
  position: relative;
  // right: 4.5%; -->
  // width: 90%; in case there's something to be added to the left
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
  left: ${props => props.position}%;
  transform: translateY(-50%);
  height: 50px; 
`;

const ExhaustSmoke = styled.div`
  position: absolute;
  bottom: 10px; 
  left: -20px; 
  width: 20px; 
  height: 20px; 
  background: rgba(155, 155, 155, 0.8); 
  border-radius: 50%;
  animation: ${smoke} 2s ease-out infinite;
`;

const Car = styled.img`
  height: 20px; // Adjust based on your preference
  position: absolute;
  top: 50%;
  transform: translateY(-50%); // This ensures the car is centered regardless of its height
  // right: ${props => props.position}%; 
  filter: ${props => `hue-rotate(${props.color}deg)`}; // Change color through hue rotation
  transition: bottom 0.5s ease-in-out; // Smooth transition for the movement
  animation: ${bobbing} 1.5s ease-in-out infinite;

`;

const NameTag = styled.div`
  position: absolute;
  top: 50%; 
  transform: translateY(-50%); 
  left: calc(100% + 10px); 
  white-space: nowrap; 
  color: #b7995e; 
  filter: ${props => `hue-rotate(${props.color}deg)`}; // Change color through hue rotation
  font-size: 12px; 
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.6); 
  left: 0;
  margin-left: 
`;

const glowing = keyframes`
  0% { color: #9b5de5;  }
  20% { color: #f72585; }
  40% { color: #b5179e; }
  60% { color: #3f37c9; }
  80% { color: #00bbf9; }
  100% { color: #00f5d4; }
`;

const LapIndicator = styled.div`
  position: absolute;
  // bottom: 0;
  top: 16%;
  left: calc(100% - 50px); -->> CHANGE THE PIXEL AMOUNT TO MOVE THE LAP INDICATOR BEHIND OR AHEAD OF THE CAR <<--
  white-space: nowrap; 
  color: ${props => props.lapsFinished > 0 ? `rgba(255, 255, 255, 0.7)` : `transparent`};;
  font-weight: bold;
  padding: 2px 5px;
  font-style: italic;
  font-size: 1.5rem;
  border-radius: 5px;
  // background-color: ${props => props.lapsFinished > 0 ? `rgba(255, 255, 255, 0.7)` : `transparent`};
  animation: ${props => props.lapsFinished > 0 ? css`${glowing} 2s infinite` : 'none'};
  
`;
const Name = styled.h3`
  margin-top: 0;
  color: white;
`


const CreditFooter = styled.div`
  width: 100%;
  padding: 10px 0;
  text-align: left;
  padding-left: 10px;
  bottom: 0;
  color: #2d8882;

  a {
    color: #2d8882;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const TicketAxis = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  align-items: center;
  color: grey;
  font-style: italic;
  font-weight: bold;
`;

const Milestone = styled.div`
  text-align: center;
  flex-grow: 1;

  &:first-child {
    text-align: left;
  }

  &:last-child {
    text-align: right;
  }
`;

const AxisLine = styled.div`
  height: 1px;
  background-color: grey;
  flex-grow: 30;
`;

const FinishLine = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 10px; /* Adjust the width of the finish line as needed */
  background-image: linear-gradient(
    45deg,
    #0091ad 25%,
    transparent 25%,
    transparent 50%,
    #0091ad 50%,
    #0091ad 75%,
    transparent 75%,
    transparent
  );
  background-size: 30px 30px; /* Adjust the size of the chequers */
`;


const maxTickets = 95; 

// Calculate horizontal position based on ticket amount
const calculateHorizontalPosition = (ticket_amount) => {
  const effectiveTickets = ticket_amount % maxTickets;
  // return (96-(ticket_amount / maxTickets) * 100).toFixed(2); // Calculate the percentage
  return effectiveTickets; // calculate the eddective tickets based on max tickets;
};

const calculateLapsFinished = (ticket_amount) => {
  return (Math.floor(ticket_amount / maxTickets)); // calculate how many times the race has been finished;
}

// Function to play horn sound
const playHornSound = () => {
  audioRef.current.play();
};

const RaceTrack = () => {

  return (
    <Track>
    <audio ref={audioRef} src={hornSound} />
    <Name>SD ticket race</Name>
    <TicketAxis>
        <Milestone>0</Milestone>
        <AxisLine />
        <Milestone>50</Milestone>
        <AxisLine />
        <Milestone>100</Milestone>
    </TicketAxis>
      {carsData.map((car, index) => (
        (car.name.split(" ")[1] !== "Duffus" &&  car.name.split(" ")[1] !== "Ducic" && car.name.split(" ")[1] !== "Campolongo")
        &&
        <Lane key={index} numberOfLanes={carsData.length}>
          <CarWrapper position={calculateHorizontalPosition(car.ticket_amount)}>
          {calculateLapsFinished(car.ticket_amount) > 0 && (
            <LapIndicator lapsFinished={calculateLapsFinished(car.ticket_amount)}>
              x{calculateLapsFinished(car.ticket_amount) + 1}
            </LapIndicator>
          )}
            <ExhaustSmoke />
            <Car
              src={carImage} 
              position={calculateHorizontalPosition(car.ticket_amount)}
              color={(index * 360) / carsData.length} // Distribute colors across the spectrum
              alt={`Car driven by ${car.name}`}
              onClick={playHornSound}
            />
            <NameTag 
              color={(index * 360) / carsData.length} // Distribute colors across the spectrum
              style={{ left: `${calculateHorizontalPosition(car.ticket_amount)}%`, marginLeft: '50px' }}>{car.name.split(" ")[0]}
              </NameTag>
          </CarWrapper>
          <FinishLine />
        </Lane>
      ))}
      
      <CreditFooter>
        <a href="https://ikromshi.com" target="_blank" rel="noopener noreferrer">
          &#169;ikromshi.com
        </a>
      </CreditFooter>
    </Track>
  );
};


export default RaceTrack;

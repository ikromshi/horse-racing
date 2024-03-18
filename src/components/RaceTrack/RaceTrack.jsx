import React from 'react';
import styled from 'styled-components';

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



const RaceTrack = ({ numberOfLanes }) => {
  return (
    <Track>
      {Array.from({ length: numberOfLanes }, (_, index) => (
        <Lane key={index} numberOfLanes={numberOfLanes} />
      ))}
    </Track>
  );
};


export default RaceTrack;

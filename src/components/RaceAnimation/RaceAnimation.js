// src/components/RaceAnimation/RaceAnimation.js
import React from 'react';
import { scaleLinear } from 'd3-scale';
import { useSprings, animated } from 'react-spring';
import ticketsData from '../data/ticketsData';
import './styles.css';

const neonColors = ['#FF3F8E', '#04C2C9', '#3B8BEB', '#F5A623']; // Add more colors as needed

const RaceAnimation = () => {
  // Find the max ticket count to scale heights accordingly
  const maxTickets = Math.max(...ticketsData.map(d => d.tickets));

  // Create a linear scale for the ticket counts to height
  const heightScale = scaleLinear()
                        .domain([0, maxTickets]) // Input range: min to max ticket count
                        .range([50, 300]); // Output range: min to max height in pixels

  const springs = useSprings(
    ticketsData.length,
    ticketsData.map(item => ({
      from: { opacity: 0, height: 0 },
      to: { opacity: 1, height: heightScale(item.tickets) },
    }))
  );

    // return (
    //     <div className="race-container">
    //       {springs.map((props, index) => {
    //         const color = neonColors[index % neonColors.length];
    //         return (
    //           <div className="trail-wrapper" key={ticketsData[index].name}>
    //             <div className="trail-name">{ticketsData[index].name}</div>
    //             <animated.div
    //               style={{
    //                 ...props,
    //                 boxShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`,
    //                 background: `repeating-linear-gradient(
    //                               45deg,
    //                               ${color},
    //                               ${color} 10px,
    //                               #000000 10px,
    //                               #000000 20px
    //                             )`
    //                 // Add your other dynamic styles here
    //               }}
    //               className="trail"
    //             />
    //           </div>
    //         );
    //       })}
    //     </div>
    //   );

// const springs = useSprings(
//     ticketsData.length,
//     ticketsData.map(item => ({
//       from: { opacity: 0.5, transform: 'scale(1)' },
//       to: async next => {
//         while (1) {
//           await next({ opacity: 1, transform: 'scale(1.05)', config: { duration: 500 } });
//           await next({ opacity: 0.5, transform: 'scale(0.95)', config: { duration: 500 } });
//         }
//       }
//     }))
//   );
  return (
    <div className="race-container">
      {springs.map((props, index) => {
        const color = neonColors[index % neonColors.length]; // Cycle through neon colors array
        return (
          <animated.div
            key={ticketsData[index].name}
            style={{
              ...props,
              boxShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 40px ${color}, 0 0 80px ${color}`,
              textShadow: `0 0 5px ${color}, 0 0 10px ${color}`,
              background: `repeating-linear-gradient(
                            45deg,
                            ${color},
                            ${color} 10px,
                            #000000 10px,
                            #000000 20px
                          )` // Adjust the background pattern as desired
            }}
            className="trail"
          >
            {ticketsData[index].name}
          </animated.div>
        );
      })}
    </div>
  );
};

export default RaceAnimation;

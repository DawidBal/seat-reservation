import React from 'react';
import { useSelector } from 'react-redux';
import { selectSeats } from '../../Redux/seatsSlice';
import useSeatsProposer from '../Hooks/useSeatsProposer';
import Message from '../Utilities/Message';
import Seat from './Seat';

const SeatsLayout = () => {
  const seats = useSelector(selectSeats);
  const rows = seats[seats.length - 1]?.cords.x;
  const cols = seats[seats.length - 1]?.cords.y;
  const { result, message } = useSeatsProposer();

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols + 1}, 1fr)`,
        gridTemplateRows: `repeat(${rows + 1}, 1fr)`,
        gap: '10px',
      }}
    >
      {result === null ? null : <Message type={result} content={message} />}
      {seats.map((seat) => (
        <Seat key={seat.id} data={seat} seats={seats} />
      ))}
    </div>
  );
};

export default SeatsLayout;

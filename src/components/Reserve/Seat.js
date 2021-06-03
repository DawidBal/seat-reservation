import React from 'react';
import { useDispatch } from 'react-redux';
import { setProposedSeats, toggleProposed } from '../../Redux/seatsSlice';

const Seat = ({ data }) => {
  const dispatch = useDispatch();

  const handleSeatChange = () => {
    dispatch(toggleProposed(data.id));
    dispatch(setProposedSeats());
  };

  return (
    <button
      aria-label={
        data.proposed
          ? 'Miejsce wybrane'
          : data.reserved
          ? 'Miejsce zarezerwowane'
          : 'Miejsce wolne'
      }
      className="btn"
      type="button"
      style={{
        gridColumn: `${data.cords.y + 1} / ${data.cords.y + 1}`,
        gridRow: `${data.cords.x + 1} / ${data.cords.x + 1}`,
        background: `${
          data.proposed
            ? 'var(--proposed, hsl(38, 96%, 53%))'
            : data.reserved
            ? 'var(--reserved, hsl(0, 0%, 20%))'
            : 'var(--free, hsl(0, 0%, 100%))'
        }`,
      }}
      onClick={handleSeatChange}
      disabled={data.reserved}
    />
  );
};

export default Seat;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAdjacent,
  selectReserveNumber,
  selectSeats,
  setProposedSeats,
  toggleProposed,
} from '../../Redux/seatsSlice';

const useSeatsProposer = () => {
  // Redux state ref
  const adjacentSeats = useSelector(selectAdjacent);
  const reserveNumber = useSelector(selectReserveNumber);
  const seats = useSelector(selectSeats);
  const dispatch = useDispatch();

  // Local State
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState(null);

  const freeSeats = seats.filter((seat) => !seat.reserved);

  const updateStates = (resultValue, messageValue) => {
    setResult(resultValue);
    setMessage(messageValue);
  };

  const proposeEmptySeats = () => {
    let seatsNumber = reserveNumber;
    const selectedSeats = [];

    if (reserveNumber > freeSeats.length) {
      seatsNumber = freeSeats.length;
      updateStates(
        'warning',
        'Brak wystarczającej ilości wolnych miejsc, wybrano maksymalną ilość'
      );
    }

    for (let i = 0; i < seatsNumber; i += 1) {
      selectedSeats.push(freeSeats[i]);
    }
    return selectedSeats;
  };

  const proposeAdjacentSeats = () => {
    // Set initial values
    const selectedSeats = [];
    let selectedIndex = 0;
    let firstElement = true;

    // Iterate over all free seats to obtain array with adjacent seats
    for (let i = 0; i < freeSeats.length; i += 1) {
      if (selectedSeats.length >= reserveNumber) break;
      // If there are no elements in array, push first element to compare it with next element
      if (firstElement) {
        selectedSeats.push(freeSeats[i]);
        firstElement = false;
        continue;
      }
      if (freeSeats[i].cords.y - selectedSeats[selectedIndex].cords.y === 1) {
        selectedSeats.push(freeSeats[i]);
        selectedIndex += 1;
      } else {
        selectedSeats.length = 0;
        firstElement = true;
        selectedIndex = 0;
        i -= 1;
      }
    }

    return selectedSeats;
  };

  const applyProposedSeats = (proposedSeats) => {
    proposedSeats.forEach((seat) => {
      dispatch(toggleProposed(seat.id));
    });
    dispatch(setProposedSeats());
  };

  useEffect(() => {
    updateStates('success', 'Wybrano wolne miejsca');
    let proposedSeats = null;
    if (adjacentSeats) {
      proposedSeats = proposeAdjacentSeats();
      if (proposedSeats.length < reserveNumber) {
        updateStates(
          'error',
          `Nie znaleziono ${reserveNumber} wolnych miejsc obok siebie`
        );
        return;
      }
    } else {
      proposedSeats = proposeEmptySeats();
    }
    applyProposedSeats(proposedSeats);
  }, []);

  return {
    result,
    message,
  };
};

export default useSeatsProposer;

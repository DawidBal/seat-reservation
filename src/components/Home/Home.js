import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearData, selectReserveNumber } from '../../Redux/seatsSlice';
import ReservationForm from './ReservationForm';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const reserveNumber = useSelector(selectReserveNumber);

  const redirectOnSuccess = () => {
    if (reserveNumber) {
      history.push('/reserve');
    }
  };

  // Clear state data when back from browser history
  useEffect(() => {
    dispatch(clearData());
  }, []);

  return (
    <ReservationForm
      reserveNumber={reserveNumber}
      onSubmit={redirectOnSuccess}
    />
  );
};

export default Home;

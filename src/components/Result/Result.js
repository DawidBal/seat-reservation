import { List, Result as ResultBox, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectProposedSeats } from '../../Redux/seatsSlice';

const Result = () => {
  const reservedSeats = useSelector(selectProposedSeats);
  const history = useHistory();
  const { Paragraph } = Typography;

  useEffect(() => {
    if (reservedSeats.length < 1) {
      history.push('/');
    }

    return () => history.push('/');
  }, []);

  return (
    <ResultBox
      status="success"
      title="Twoja rezerwacja przebiegła pomyślnie!"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      extra={[
        <Paragraph> Wybrałeś miejsca: </Paragraph>,
        <List
          size="small"
          bordered
          dataSource={reservedSeats}
          renderItem={(seat) => (
            <List.Item key={seat.id}>
              rząd {seat.cords.x + 1}, miejsce {seat.cords.y + 1}
            </List.Item>
          )}
        />,
        <Paragraph strong style={{ marginTop: '1em' }}>
          Dziękujemy! W razie problemów prosimy o kontakt z działem
          administracji
        </Paragraph>,
      ]}
    />
  );
};

export default Result;

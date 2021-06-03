import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Col, Row, Typography } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import {
  selectProposedSeats,
  selectReserveNumber,
  selectSeats,
  setSeats,
} from '../../Redux/seatsSlice';
import SeatsLayout from './SeatsLayout';
import useFetch from '../Hooks/useFetch';
import Loading from '../Utilities/Loading';
import Error from '../Utilities/Error';

const Reserve = () => {
  const { loading, error } = useFetch('http://localhost:3000/seats', setSeats);

  const seats = useSelector(selectSeats);
  const proposedSeatsNumber = useSelector(selectProposedSeats).length;
  const { Paragraph, Text } = Typography;
  const history = useHistory();
  const reserveNumber = useSelector(selectReserveNumber);

  const correctEndings = () => {
    if (proposedSeatsNumber === 1) return 'miejsce';
    if (proposedSeatsNumber >= 2 && proposedSeatsNumber <= 4) return 'miejsca';
    if (proposedSeatsNumber >= 5 || proposedSeatsNumber === 0) return 'miejsc';
  };

  useEffect(() => {
    if (!reserveNumber) {
      history.push('/');
    }
  }, []);

  return (
    <Row>
      <Col span={24}>
        {error && <Error message={error} />}

        {loading ? (
          <Row justify="center" align="middle" style={{ height: '100vh' }}>
            <Loading />
          </Row>
        ) : (
          seats && (
            <div
              style={{
                display: 'grid',
                gridTemplateRows: '1fr auto',
                height: '100vh',
                padding: '2rem',
                gap: '2rem',
              }}
            >
              <SeatsLayout />
              <Row justify="space-between">
                <Col span={6}>
                  <Row align="middle" style={{ height: '100%' }}>
                    <Col
                      span={6}
                      style={{
                        height: '100%',
                        border: '1px solid #000',
                        backgroundColor: 'var(--free, hsl(0, 0%, 100%))',
                      }}
                    />
                    <Text style={{ flex: '1', marginLeft: 8 }}>
                      Miejsca dostępne
                    </Text>
                  </Row>
                </Col>
                <Col span={6}>
                  <Row align="middle" style={{ height: '100%' }}>
                    <Col
                      span={6}
                      style={{
                        height: '100%',
                        border: '1px solid #000',
                        backgroundColor: 'var(--reserved, hsl(0, 0%, 20%))',
                      }}
                    />
                    <Text style={{ flex: '1', marginLeft: 8 }}>
                      Miejsca zarezerwowane
                    </Text>
                  </Row>
                </Col>
                <Col span={6}>
                  <Row align="middle" style={{ height: '100%' }}>
                    <Col
                      span={6}
                      style={{
                        height: '100%',
                        border: '1px solid #000',
                        backgroundColor: 'var(--proposed, hsl(38, 96%, 53%))',
                      }}
                    />
                    <Text style={{ flex: '1', marginLeft: 8 }}>Twój wybór</Text>
                  </Row>
                </Col>
                <Col span={6}>
                  <Row align="middle" style={{ flexDirection: 'column' }}>
                    <Paragraph>
                      Wybrano: {`${proposedSeatsNumber} ${correctEndings()}`}
                    </Paragraph>
                    <Button
                      type="primary"
                      block
                      disabled={proposedSeatsNumber < 1 ? true : null}
                    >
                      <Link to="/result">Rezerwuj</Link>
                    </Button>
                  </Row>
                </Col>
              </Row>
            </div>
          )
        )}
      </Col>
    </Row>
  );
};

export default Reserve;

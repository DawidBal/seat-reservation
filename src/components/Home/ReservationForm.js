import React from 'react';
import { Button, InputNumber, Form, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import {
  selectAdjacent,
  setReserveNumber,
  toggleAdjacent,
} from '../../Redux/seatsSlice';

const ReservationForm = ({ onSubmit, reserveNumber }) => {
  const isAdjacent = useSelector(selectAdjacent);
  const dispatch = useDispatch();

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Form name="reservation" onFinish={onSubmit} className="reservation-form">
        <Form.Item
          label="Liczba miejsc"
          name="seatNumber"
          rules={[
            {
              required: true,
              message: 'Podaj liczbę miejsc',
            },
          ]}
        >
          <InputNumber
            min={1}
            onChange={(value) => dispatch(setReserveNumber(value))}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name="isAdjacent">
          <Checkbox
            onChange={(e) => dispatch(toggleAdjacent(e.target.checked))}
            checked={isAdjacent ? 'checked' : null}
            style={{ width: '100%' }}
          >
            Czy miejsca mają być obok siebie?
          </Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          {reserveNumber > 1 ? 'Wybierz miejsca' : 'Wybierz miejsce'}
        </Button>
      </Form>
    </Row>
  );
};

export default ReservationForm;

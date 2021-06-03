import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const Error = ({ message }) => (
  <Result
    status="500"
    title={message}
    extra={
      <Button type="primary">
        <Link to="/">Strona główna</Link>
      </Button>
    }
  />
);

export default Error;

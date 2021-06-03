import { message } from 'antd';
import { useEffect } from 'react';

const Message = ({ type, content }) => {
  useEffect(() => {
    switch (type) {
      case 'error':
        message.error(content);
        break;
      case 'success':
        message.success(content);
        break;
      case 'warning':
        message.warning(content);
        break;
      default: {
        console.log('Default');
      }
    }
  }, []);

  return null;
};

export default Message;

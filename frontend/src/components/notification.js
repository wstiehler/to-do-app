// Em src/components/notification.js

import React, { useState } from 'react';
import { Button, Popconfirm, notification } from 'antd';

const openNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

export const showSuccessNotification = (message, description) => {
  openNotification('success', message, description);
};

export const showErrorNotification = (message, description) => {
  openNotification('error', message, description);
};

export const CustomPopconfirm = ({ title, description, onConfirm }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);

    try {
      await onConfirm();
      notification.success({
        message: 'Operação concluída',
        description: 'A operação foi bem-sucedida!',
      });
      setOpen(false);
    } catch (error) {
      notification.error({
        message: 'Erro na operação',
        description: 'Houve um erro ao realizar a operação.',
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <Popconfirm
      title={title}
      description={description}
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <Button type="primary"
onClick={showPopconfirm}>
        Open Popconfirm with async logic
      </Button>
    </Popconfirm>
  );
};

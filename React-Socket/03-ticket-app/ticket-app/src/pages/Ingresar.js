import React from 'react'

import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { useHideMenu } from '../hooks/useHideMenu';

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 14 },
};

export const Ingresar = () => {

  const history = useHistory();
  useHideMenu(false);

  const onFinish = (values) => {
    console.log('Success:', values);

    history.push('/escritorio');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Title level={2}>Login</Title>
      <Text>Input your name and desktop number</Text>
      <Divider />

      <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="User name"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Desktop number"
          name="desktop"
          rules={[{ required: true, message: 'Please input your desktop number!' }]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
              type="primary"
              htmlType="submit"
              shape="round"
          >
            <SaveOutlined />
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

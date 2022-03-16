import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = () => {
    axios.post('http://localhost:3000/users/register', {
      name,
      email,
      username,
      password,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.token.token);
        localStorage.setItem('userid', res.data.user._id);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <Form
      className="login-form"
      name="register"
      scrollToFirstError
    >
      <h2>Signup Here,</h2>
      <Form.Item
        name="name"
        label="Name"
      >
        <Input 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" onClick={() => onFinish()} className="login-form-button">
          Signup
        </Button>
        Or <a href="/login">Login now!</a>
      </Form.Item>
    </Form>
  );
};

export default Signup;
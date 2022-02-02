import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Space } from 'antd';
import styles from "./login.module.css";
import { InfoCircleOutlined, UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { Header } from 'antd/lib/layout/layout';
import axios from 'axios';
import { getAccessToken, setToken } from '../../helpers/auth';


export default function login_form() {

  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const onFinish = (values) => {
    axios.post(
      `${process.env.API_URL}/login`,
      values
    ).then((r) => {
      const response  = r.data;
      if(response.accomplished){
        setToken(response.response)
        console.log(getAccessToken());
        Router.push('/dashboard');
      }
    }).catch((err) => {
      alert(err);
    })
  };
  
  return (
    <div className={styles.container}>
      <Col span={8} className={styles.login_box}>
      <Form
        name="normal_login"
        
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
      {!forgotPassword ?
        <>
        <h1 style={{textAlign : 'center'}}>Welcome back!</h1>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter your email.',
            },
          ]}
        >
          <Input 
          prefix={<UserOutlined 
          className="site-form-item-icon" />} 
          value={email}
          onChange={val => setEmail(val)}
          placeholder="Email" 
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter your password.',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            value='Reset123!'
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>  
          <a className="login-form-forgot" style={{textDecoration : "underline"}} onClick={() => setForgotPassword(true)}>
            Forgot password
          </a>
        </Form.Item>
  
        <Form.Item>
          <Space align='center' style={{width: '100%', justifyContent: 'center'}}>
          <Button type="primary" htmlType="submit" className={styles.login_button}>
            Log in
          </Button>
          </Space>
        </Form.Item>
        </>
      :
      <>
      <h2 style={{textAlign : 'center'}}>Forgot Password</h2>
      <p>Please enter your email address, an OTP will be sent to help reset your password.</p>
      <Form.Item
          name="otp"
         
        >
          <Input 
          prefix={<MailOutlined 
          className="site-form-item-icon" />} 
          value={otp}
          onChange={val => setOtp(val)}
          placeholder="OTP" 
          />
        </Form.Item>
      </>
      }
      </Form>
      </Col>
    </div>
  );
};


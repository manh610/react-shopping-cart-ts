import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Image } from 'antd';
import 'antd/dist/antd.css';
import './Header.css'
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  return (
    <Row className="style" >
      <Col className='a' span={3}>
        <Image onClick={() => navigate('/shop')} width={98} height={86} preview={false} src='/image/Logo 1.png' />
      </Col>
      <Col span={18}>
        <p className='b'> Mobile Shopping </p>
      </Col>
      <Col className='ava' span={2}>
        <Image height={69} width={69} preview={false} src='/image/avatar.png' />
      </Col>
    </Row>
  )
}

export default Header;

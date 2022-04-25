import React, { Component } from 'react'
import { Row, Col } from 'antd';
import { Image } from 'antd';
import 'antd/dist/antd.css';
import './Header.css'

export default class Header extends Component {
  render() {
    return (
      <Row className='style' >
        <Col className='a' span={3}>
          <Image width={98} height={86} preview={false} src='/image/Logo 1.png' />
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
}

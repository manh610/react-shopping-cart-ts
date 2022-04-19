import React, { useEffect, useState } from 'react'
import { Row, Col, DatePicker, Menu, Dropdown } from 'antd';
import { Image } from 'antd';
import './style.css'
import 'antd/dist/antd.css'; 
import moment from 'moment';
import { DownOutlined } from '@ant-design/icons';
import Header from '../../Header';
import Toolbar from '../../Toolbar';
import axios from 'axios';
import { useSelector } from 'react-redux';

const dateFormat = 'DD/MM/YYYY';

const menu = (
  <Menu>
    <Menu.Item key="1">Male</Menu.Item>
    <Menu.Item key="2">Female</Menu.Item>
  </Menu>
);

const Profile = () => {

  const [user,setUser] = useState({});

  const userId = useSelector(state => state.root.userId);

  const getInfoUser = async () => {
    let response;
    await axios.get(`http://localhost:3006/user?id=${userId}`)
      .then( res => {
        response = res.data;
        console.log(response[0]);
        setUser(response[0]);
        console.log(user)
      })
      .catch(error => console.log(error));
  }

  useEffect( () => {
    getInfoUser();
  }, [])

  return ( 
    <div>
          <header >
            <Header/>
          </header>
          <div>
            <Row>
                <Col span={4}>
                  <Toolbar/>
                </Col>
                <Col span={20}>
                <div className='profile'>
                    <div>
                      <p className='header'>My Profile</p>
                    </div>
                    <div className='content'>
                      <Row className='title'>
                        <Col span={5}>
                          <Image className='avatar' src='/image/avatar.png'/>
                        </Col>
                        <Col span={17}>
                          <Row>
                            <p className='name'>MR USER</p>
                          </Row>
                          <Row>
                            <p className='email'>Email: user@gmail.com</p>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={5}>
                          <p>Date of birth:</p>
                        </Col>
                        <Col span={19}>
                          <DatePicker defaultValue={moment('01/01/2018', dateFormat)} format={dateFormat} />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={5}>
                          <p>Sex: </p>
                        </Col>
                        <Col span={12}>
                          <Dropdown.Button icon={<DownOutlined />} overlay={menu} >
                            Male
                          </Dropdown.Button>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={5}>
                          <p>Address Company: </p>
                        </Col>
                        <Col span={12}>
                          <p>15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={5}>
                          <p>Address Home: </p>
                        </Col>
                        <Col span={12}>
                          <p>15, Duy Tan, Dich Vong Hau, Cau Giay, Ha Noi</p>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>  
            </Row>
          </div>
        </div>
    
  );
}
 
export default Profile;

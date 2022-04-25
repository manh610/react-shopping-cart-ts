import React, { useEffect, useState } from 'react'
import { Row, Col, DatePicker, Menu, Dropdown, Button } from 'antd';
import { Image } from 'antd';
import './style.css'
import 'antd/dist/antd.css';
import moment from 'moment';
import { DownOutlined } from '@ant-design/icons';
import Header from '../../Header';
import Toolbar from '../../Toolbar';
import axios from 'axios';
import { useSelector, RootStateOrAny } from 'react-redux';

const dateFormat = 'DD/MM/YYYY';

const menu = (
  <Menu>
    <Menu.Item key="1">Male</Menu.Item>
    <Menu.Item key="2">Female</Menu.Item>
  </Menu>
);

interface User {
  username: string,
  password: string
}

const Profile = () => {

  const initUser: User = {
    username: "",
    password: ""
  }

  const [user, setUser] = useState<User>(initUser);

  const userId = useSelector((state: RootStateOrAny) => state.root.userId);

  console.log(userId)

  const getInfoUser = async () => {
    let response: any;
    await axios.get(`http://localhost:3006/user?id=${userId}`)
      .then(res => {
        response = res.data;

      })
      .catch(error => console.log(error));
    setUser(response[0]);
  }

  const logout = (): void => {
    localStorage.clear();
    window.location.href = '/';
  }

  useEffect(() => {
    getInfoUser();
  }, [])

  return (
    <div>
      <header >
        <Header />
      </header>
      <div>
        <Row>
          <Col span={4}>
            <Toolbar />
          </Col>
          <Col span={20}>
            <div className='profile'>
              <Row>
                <Col span={21}>
                  <p className='header'>My Profile</p>
                </Col>
                <Col span={3}>
                  <Button onClick={logout} className='btn-logout'>Log out</Button>
                </Col>
              </Row>

              <div className='content'>
                <Row className='title'>
                  <Col span={5}>
                    <Image className='avatar' src='/image/avatar.png' />
                  </Col>
                  <Col span={17}>
                    <Row>
                      <p className='name'>MR {(user!==undefined)?(user.username):""}</p>
                    </Row>
                    <Row>
                      <p className='email'>Email: {(user!==undefined)?(user.username):""}@gmail.com</p>
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

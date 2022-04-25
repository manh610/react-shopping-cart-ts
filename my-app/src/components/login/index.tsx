import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { Image, Form, Input, Button, Checkbox } from 'antd';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectUserId, updateUserId } from '../../redux/reducer';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    toast.configure();

    const userId = useSelector(selectUserId);

    const checkLogin = async () => {
        let response: any;
        await axios.get(`http://localhost:3006/user?username=${username}&password=${password}`)
            .then(res => {
                response = res.data;
                console.log(response);
            })
            .catch(error => console.log(error));
        if (response.length !== 0) {
            notify('success');
            const user = response[0].id;
            dispatch(updateUserId(user));
            navigate("/shop");
        } else {
            notify("fail");
        }
        return response;
    }

    useEffect(() => {
    }, [userId])

    const notify = (info: string) => {
        switch (info) {
            case 'success':
                toast.success('Login success');
                break;
            case 'fail':
                toast.error('username or password incorrect');
                break;
            default:

        }
    }

    const onFinish = (values: any) => {
    };

    const onFinishFailed = (errorInfo: any) => {
    };

    return (
        <>
            < div className='Login' >
                <Image className='logo' src='image/Logo.jpg' />
            </div>
            <div>
                <Form className='form'
                    name="basic"
                    labelCol={
                        {
                            span: 8,
                        }
                    }
                    wrapperCol={
                        {
                            span: 15,
                        }
                    }
                    initialValues={
                        {
                            remember: true,
                        }
                    }
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off" >
                    <Form.Item label="Username" name="username"
                        rules={
                            [{
                                required: true,
                                message: 'Please input your username!',
                            },]
                        } >
                        <Input onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>

                    <Form.Item label="Password"
                        name="password"
                        rules={
                            [{
                                required: true,
                                message: 'Please input your password!',
                            },]
                        }>
                        <Input.Password onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>

                    <Form.Item name="remember"
                        valuePropName="checked"
                        wrapperCol={
                            {
                                offset: 8,
                                span: 16,
                            }
                        } >
                        <Checkbox> Remember me </Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={
                        {
                            offset: 8,
                            span: 16,
                        }
                    }>
                        <Button className='btn'
                            type="primary"
                            htmlType="submit"
                            onClick={() => checkLogin()}
                        // href='/shop'
                        > Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default Login;
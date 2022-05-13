import React, { useState } from 'react';
import { Form, Input, Select, Checkbox, Button, Image } from 'antd';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const register = () => {
        const data = {
            username: username,
            password: password,
            confirmPassword : confirmPassword,
            firstname: firstname,
            lastname: lastname
        }
        axios.post("https://localhost:7019/Users/register", data)
            .then( res => {
                if ( res.data.message==="Dang ki thanh cong" ) {
                    notify("success","");
                    navigate("/")
                } else {
                    notify("fail", res.data.message);
                }
            })
            .catch( err => console.log(err));
    }

    const notify = (info: string, message : string) => {
        switch (info) {
            case 'success':
                toast.success('Register success');
                break;
            case 'fail':
                toast.error(message);
                break;
            default:

        }
    }

    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
    };

    return (
        <>
            < div className='Login' >
                <Image className='logo' src='image/Logo.jpg' />
            </div>
            <div>
                <Form className='form'
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item label="Username" name="username"
                        rules={
                            [{
                                required: true,
                                message: 'Please input your username!',
                            },]
                        } >
                        <Input onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Firstname" name="firstname"
                        rules={
                            [{
                                required: true,
                                message: 'Please input your firstname!',
                            },]
                        } >
                        <Input onChange={(e) => setFirstname(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Lastname" name="lastname"
                        rules={
                            [{
                                required: true,
                                message: 'Please input your lastname!',
                            },]
                        } >
                        <Input onChange={(e) => setLastname(e.target.value)} />
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
                        <Input.Password onChange={(e) => setPassword(e.target.value)} />
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
                        <Input.Password onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button className='btn' type="primary" htmlType="submit" onClick={() => register()}>
                            Register
                        </Button>
                        <Button className='btn' type="primary" htmlType="submit" onClick={() => navigate("/")}>
                            Back to Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default () => <Register />;
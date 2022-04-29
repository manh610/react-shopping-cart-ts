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
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const register = () => {
        const data = {
            username: username,
            email: email,
            password: password,
            passwordConfirmation: confirmPassword,
            fullName: "string",
            phone: "string",
            roleId: "string",
            active: 0,
            defaultFarm: "string",
            additionalProp1 : {}
        }
        axios.post("http://178.128.19.31:3002/users/register", data)
            .then( res => {
                if ( res.data.statusCode==="OK" ) {
                    notify("success");
                    navigate("/")
                } else {
                    notify("fail");
                }
            })
            .catch( err => console.log(err));
    }

    const notify = (info: string) => {
        switch (info) {
            case 'success':
                toast.success('Register success');
                break;
            case 'fail':
                toast.error('Register fail');
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
                        <Input onChange={(e) => setEmail(e.target.value)} />
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
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default () => <Register />;
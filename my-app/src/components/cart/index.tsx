import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';
import { Image } from 'antd';
import './style.css'
import 'antd/dist/antd.css';
import { PlusOutlined, MinusOutlined, CloseCircleFilled } from '@ant-design/icons';
import Header from '../../Header';
import Toolbar from '../../Toolbar';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import axios from 'axios';
import { updateCart } from '../../redux/reducer';

type Item = {
    amount: number;
    price: number;
    title: string;
    cartId: number;
    image: string;
    des: string;
}

const Cart = () => {

    // redux
    const cart = useSelector((state: RootStateOrAny) => state.root.cart);

    const dispatch = useDispatch();

    const [items, setItems] = useState<Item[]>([]);

    const getAllItem = async () => {
        let items2: any = [];
        if (cart) {
            for (let i = 0; i < cart.length; i++) {
                await axios.get(`http://localhost:3006/items?id=${cart[i].itemId}`)
                    .then(res => {
                        const productInfo = res.data;
                        productInfo[0].amount = cart[i].amount;
                        productInfo[0].cartId = cart[i].id;
                        items2.push(productInfo[0]);
                    })
                    .catch(error => console.log(error));
            }
            /*
            bat dong bo
            await cart.map( async (item) => {
                await axios.get(`http://localhost:3006/items?id=${item.itemId}`)
                    .then( res => {
                        const productInfo = res.data;
                        productInfo[0].amount = item.amount;
                        items2.push(productInfo[0]);
                    })
                    .catch(error => console.log(error));
            })
            */
            setItems(items2);
        }
    }

    useEffect(() => {
        getAllItem();
    }, [cart])

    useEffect(() => {
    }, [items])

    const SubTotal = () => {
        var sum = 0;
        items.map(item => sum += item.price * item.amount);
        return sum;
    }

    const sum = SubTotal();

    const onAddAmount = (cartId: number) => {
        // let items1 = [...items];
        let cartTmp = JSON.parse(JSON.stringify(cart));
        for (let i = 0; i < cartTmp.length; i++) {
            if (cartTmp[i].id === cartId) {
                cartTmp[i].amount++;
                break;
            }
        }
        dispatch(updateCart(cartTmp));
    }

    const onSubAmount = (cartId: number) => {
        let cartTmp = JSON.parse(JSON.stringify(cart));
        for (let i = 0; i < cartTmp.length; i++) {
            if (cartTmp[i].id === cartId) {
                cartTmp[i].amount--;
                if (cartTmp[i].amount === 0) {
                    cartTmp.splice(i, 1);
                }
                break;
            }
        }
        dispatch(updateCart(cartTmp));
    }

    const onCancelItem = (cartId: number) => {
        let cartTmp = JSON.parse(JSON.stringify(cart));
        for (let i = 0; i < cartTmp.length; i++) {
            if (cartTmp[i].id === cartId) {
                cartTmp.splice(i, 1);
                break;
            }
        }
        dispatch(updateCart(cartTmp));
    }

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
                        <div className="cart">
                            <div>
                                <Row>
                                    <p className='header'>Cart</p>
                                </Row>
                                <Row>
                                    <p className='sl'>{items.length} {items.length>1?"items":"item"} in bag</p>
                                </Row>
                            </div>
                            <div className="content">
                                {
                                    items.map((item, index) => {
                                        return (
                                            <div className='item'>
                                                <div>
                                                    <hr className='cancel hr'></hr>
                                                    <CloseCircleFilled className='cancel' onClick={() => onCancelItem(item.cartId)} />
                                                </div>
                                                <Row>
                                                    <Col span={6}>
                                                        <Image width={188} height={239} src={item.image} />
                                                    </Col>
                                                    <Col span={13}>
                                                        <Row>
                                                            <b>Điện thoại {item.title}</b>
                                                        </Row>
                                                        <Row>
                                                            <p>{item.des}</p>
                                                        </Row>
                                                        <Row>
                                                            <b>{item.price} VND</b>
                                                        </Row>
                                                    </Col>
                                                    <Col span={5}>
                                                        <Row className='amount'>
                                                            <PlusOutlined onClick={() => onAddAmount(item.cartId)} />
                                                            {item.amount}
                                                            <MinusOutlined onClick={() => onSubAmount(item.cartId)} />
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )
                                    })
                                }
                                <hr></hr>
                                <div className='total'>
                                    <Row>
                                        <Col span={17}> </Col>
                                        <Col span={7}>
                                            <Row>
                                                <Col span={9}>
                                                    <b>SubTotal</b>
                                                </Col>
                                                <Col span={15}>
                                                    <p>{sum} VND</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={9}>
                                                    <b>Tax</b>
                                                </Col>
                                                <Col span={15}>
                                                    <p>{sum * 0.1} VND</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={9}>
                                                    <b>Total</b>
                                                </Col>
                                                <Col span={15}>
                                                    <p>{Math.round(sum * 1.1)} VND</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>

    );
}

export default Cart;
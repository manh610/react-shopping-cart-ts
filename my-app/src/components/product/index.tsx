import React, { useEffect, useState } from 'react'
import { Row, Col, Button, Image } from 'antd';
import './style.css'
import 'antd/dist/antd.css';
import Header from '../../Header';
import Toolbar from '../../Toolbar';
import { StarFilled } from '@ant-design/icons';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom';
import { addToCart, updateCart } from '../../redux/reducer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Item = {
    id: number;
    star: number;
    price: number;
    title: string;
    capture: string;
    image: string;
    des: string;
}

const ProductDetail = () => {

    const dispatch = useDispatch();

    let initItem: Item = {
        id: 0,
        star: 0,
        price: 0,
        title: "",
        capture: "",
        image: "",
        des: ""
    };

    const [item, setItem] = useState<Item>(initItem);

    let { productId } = useParams();

    const navigate = useNavigate();

    const cart = useSelector((state: RootStateOrAny) => state.root.cart);

    const getItem = async () => {
        let response;
        await axios.get(`http://localhost:3006/items/${productId}`)
            .then(res => {
                response = res.data;
            })
            .catch(error => console.log(error));
        return response;
    }

    useEffect(() => {
        const getProduct = async () => {
            const item = await getItem();
            if (item) setItem(item);
        }
        getProduct();
    }, [])

    const add = () => {
        let cartTmp = JSON.parse(JSON.stringify(cart));
        for (let i = 0; i < cartTmp.length; i++) {
            if (cartTmp[i].itemId === item.id) {
                cartTmp[i].amount++;
                dispatch(updateCart(cartTmp));
                navigate("/cart");
                return;
            }
        }
        const request = {
            id: uuidv4(),
            itemId: item.id,
            amount: 1
        }
        dispatch(addToCart(request));
        navigate("/cart");
    }

    const printStar = () => {
        var rows = [];
        for (var i = 0; i < item.star; i++) {
            rows.push(<StarFilled className='star1' />);
        }
        return <tbody>{rows}</tbody>;
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
                        <div className="product-detail">
                            <div>
                                <Row>
                                    <p className='aa'>Shop</p>
                                </Row>
                                <Row>
                                    <Col span={13}>
                                        <p className='bb'>Shop / Product</p>
                                    </Col>
                                    <Col span={10}>

                                    </Col>
                                    <Col span={1}>
                                        <Image onClick={() => navigate('/cart')} width={32} height={32} src='/image/cart.png' />
                                    </Col>
                                </Row>
                            </div>
                            <div className="content">
                                <Row>
                                    <Col span={9}>
                                        <Image width={408} height={478} src={item.image} />
                                    </Col>
                                    <Col span={13}>
                                        <Row>
                                            <p className='bb'>Điện thoại {item.title}</p>
                                        </Row>
                                        <Row>
                                            <p className='b'>{item.des}</p>
                                        </Row>
                                        <Row>
                                            <p className='c'>{item.price} VND</p>
                                        </Row>
                                        <Row className='sao'>
                                            {printStar()}
                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                                <Button className='btn-buy'>Mua hàng</Button>
                                            </Col>
                                            <Col span={12}>
                                                <Button onClick={add} className='btn-add'>Thêm vào giỏ hàng</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={7}>
                                        <Image src={item.capture} className='capture' />
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

export default ProductDetail;
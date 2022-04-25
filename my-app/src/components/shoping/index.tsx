import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';
import { Image } from 'antd';
import './style.css'
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { StarFilled } from '@ant-design/icons';
import Header from '../../Header';
import Toolbar from '../../Toolbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Item {
    id: number;
    star: number;
    price: number;
    title: string;
    capture: string;
    image: string;
    des: string;
}

const Shop = () => {

    const [products, setProducts] = useState<Item[]>([]);

    const getIems = async () => {
        let response;
        await axios.get(`http://localhost:3006/items/`)
            .then(res => {
                response = res.data;
            })
            .catch(err => console.log(err));
        return response;
    }

    const navigate = useNavigate();

    const [filter, setFilter] = useState("");

    const search = async () => {
        const allProducts: Item[] | any = await getIems();
        let productsAfterFilter: Item[] = [];
        if (allProducts) {
            productsAfterFilter = allProducts.filter((product: Item) => {
                return (product.title).toLowerCase().includes(filter.toLowerCase());
            })
            setProducts(productsAfterFilter);
        }
    }

    useEffect(() => {
        search()
        console.log(products);
    }, [filter])

    const getAllItems = async () => {
        const allProducts = await getIems();
        if (allProducts) {
            setProducts(allProducts);
        }
    }

    useEffect(() => {
        getAllItems();
        console.log(products);
    }, []);

    const printStar = (product: Item) => {
        var rows = [];
        for (var i = 0; i < product.star; i++) {
            rows.push(<StarFilled className='star' />);
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
                        <div className="shop">
                            <div>
                                <Row>
                                    <p className='a' >Shop</p>
                                </Row>
                                <Row>
                                    <Col span={14}>
                                        <p className='b'>Shop</p>
                                    </Col>
                                    <Col span={8}>
                                        <Input.Search width={469} allowClear placeholder="Search..." onChange={(e) => setFilter(e.target.value)} />
                                    </Col>
                                    <Col span={2}>
                                        <Image width={40} height={32} src='image/filter.png' />
                                    </Col>
                                </Row>
                            </div>
                            <div className="content">
                                <Row>
                                    {
                                        products.map((product, index) => {
                                            return (
                                                <Col className='product-info' span={9}>
                                                    <Row>
                                                        <Col span={4}>
                                                            <Image onClick={() => navigate(`/product/${product.id}`)} width={100} height={130} src={product.image} />
                                                        </Col>
                                                        <Col span={2}>
                                                        </Col>
                                                        <Col span={10}>
                                                            <Row>
                                                                <p className='c1'> {product.title} </p>
                                                            </Row>
                                                            <Row>
                                                                <p className='c1'> {product.price} VND </p>
                                                            </Row>
                                                            <Row>
                                                                {printStar(product)}
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            )
                                        })
                                    }
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Shop;
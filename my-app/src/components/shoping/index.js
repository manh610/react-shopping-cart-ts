import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd';
import { Image } from 'antd';
import './style.css'
import 'antd/dist/antd.css'; 
import { Input } from 'antd';
import {StarFilled} from '@ant-design/icons';
import Header from '../../Header';
import Toolbar from '../../Toolbar';
import api from '../../api/data';
import { useNavigate } from 'react-router-dom';

const Shop = () => {

    const [products, setProducts] = useState([]);

    const getIems = async () => {
        const response = await api.get("/items");
        return response.data;
    }

    const navigate = useNavigate();

    const [filter, setFilter] = useState("");

    const search = async () => {
        const allProducts = await getIems();
        let productsAfterFilter = {};
        if (allProducts) {
            productsAfterFilter = allProducts.filter( (product) => {
                return product.title.includes(filter);
            })
            setProducts(productsAfterFilter);
        }
    }

    useEffect( () => {
        search()
    }, [])

    const getAllItems = async () => {
        const allProducts = await getIems();
        if (allProducts) {
            setProducts(allProducts);
        }
    }

    useEffect( () => {
        getAllItems();
    }, []);

    const printStar = (product) => {
        var rows = [];
        for (var i = 0; i < product.star; i++) {
            rows.push(<StarFilled className='star'/>);
        }
        return <tbody>{rows}</tbody>;
    }
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
                                    products.map( (product) => {
                                        return (
                                            <Col className='product-info' span={9}>
                                                <Row>
                                                    <Col span={4}>
                                                        <Image onClick={() => navigate(`/product/${product.id}`)} width={100} height={130} src={product.image}/>
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
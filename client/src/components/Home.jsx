import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

import bg_img from '../assest/img/bookshelf.jpg'
import lib_img from '../assest/img/library.png'
import './Home.css'

function Home() {
    return (
        <div className="home-screen" style={{backgroundImage: `url(${bg_img})`}}>
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <div className="title">
                            Welcome to the world's largest collection of books
                        </div>
                        <img src={lib_img} alt="Library" className="lib-img"/>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
            
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home

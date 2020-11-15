import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

import bg_img from '../assest/img/bookshelf.jpg'
import lib_img from '../assest/img/library.png'
import './Home.css'

function Home() {

    function changeBackground(e) {
        let x = (251-e.clientX)/8;
        let y = (299-e.clientY)/8;
        e.target.style.willChange = "transform";
        e.target.style.transformStyle = "preserve-3d";
        e.target.style.transform = `translate3d(${x}px, ${y}px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;
      }
    
    return (
        <div className="home-screen" style={{backgroundImage: `url(${bg_img})`}}>
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <div className="title">
                            Welcome to the world's largest collection of books
                        </div>
                        <img src={lib_img} alt="Library" className="lib-img" onMouseMove={changeBackground}/>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
            
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home

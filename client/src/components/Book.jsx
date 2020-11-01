import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col, Button } from 'react-bootstrap'

import book_img from '../assest/img/book.png'

import './book.css'

function Book(props) {
  return (
    <React.Fragment>
      <div className='book-wrapper'>
        <Container>
          <Row>
            <Col xs={12} sm={12} md={3} lg={3}>
              <img src={book_img} alt='Book' />
            </Col>
              <Col xs={12} sm={12} md={9} lg={9}>
            <div className='book-info'>
                <div style={{ display: 'none' }}>{props.book._id}</div>
                <div>
                  <strong>Title: </strong>
                  {props.book.title}
                </div>
                <div>
                  <strong>Author: </strong>
                  {props.book.author}
                </div>
                <div>
                  <strong>Description: </strong>
                  {props.book.description}
                </div>
                <div>
                  <strong>Pages: </strong>
                  {props.book.pages}
                </div>
                <div>
                  <strong>Copies: </strong>
                  {props.book.copies}
                </div>
                    <Button variant='primary' onClick={props.onClickProcess} disabled={props.disabled}>{props.type}</Button>
            </div>
              </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

Book.propTypes = {
  books: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.string,
  onClickProcess: PropTypes.func.isRequired,
}

export default Book

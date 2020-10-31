import {render, screen} from '@testing-library/react'
import Book from './Book'

const book = {
    _id: 'qawsedrf',
    title: 'Programming JavaScript Applications',
    author: 'Eric Elliott',
    description: "Take advantage of JavaScript's power to build robust web-scale or enterprise applications that are easy to extend and maintain. By applying the design patterns outlined in this practical book, experienced JavaScript developers will learn how to write flexible and resilient code that's easier-yes, easier-to work with as your code base grows.",
    pages: 254,
    copies: 2
}

test('Testing the Book component', () => {
    render(<Book book={book}/>)
    const titleElement = screen.getByText(/Title:/i)
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.parentElement).toHaveTextContent('Title: '+book.title)
    expect(screen.getByText(/Author:/i).parentElement).toHaveTextContent('Author: '+book.author)
    expect(screen.getByText(/Description:/i).parentElement).toHaveTextContent('Description: '+book.description)
    expect(screen.getByText(/Pages:/i).parentElement).toHaveTextContent('Pages: '+book.pages)
    expect(screen.getByText(/Copies:/i).parentElement).toHaveTextContent('Copies: '+book.copies)
})

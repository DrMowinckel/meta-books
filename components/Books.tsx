import { GetStaticProps } from "next";
import styled from "styled-components";
import Book, { IBook } from "./Book";

interface BooksProps {
  books: IBook[];
  amountOfBooks?: number;
  booksPerRow?: number;
}


const Books: React.FC<BooksProps> = ({ books, amountOfBooks, booksPerRow }) => {
  const StyledBooks = styled.section`
    display: grid;
    grid-template-columns: repeat(${booksPerRow ?? '3'}, 1fr);
    row-gap: 2em;
    column-gap: 1em;
    justify-items: center;
    margin: 0 auto;
    margin-top: 2em;
  `
  
  return (
    <StyledBooks>
      { books && books.slice(0, amountOfBooks).map(book =>
        <Book key={book.coverID} goTo={true} { ...book }  />
      )}
    </StyledBooks>
  );
}

export default Books;

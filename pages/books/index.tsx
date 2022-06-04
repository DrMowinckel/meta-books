import { GetStaticProps } from "next";
import { IBook } from "../../components/Book";
import Wrapper from "../../components/Wrapper";
import Books from '../../components/Books';

interface BooksPageProps {
  books: IBook[];
}

const BooksPage: React.FC<BooksPageProps> = ({ books }) => {
  
  return (
    <Wrapper>
      <Books books={ books } amountOfBooks={10} booksPerRow={5} />
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch('https://openlibrary.org/search.json?q=subject%3Aweb+development');
  const results = await response.json();

  const books = results.docs.slice(0, 10).map((work: any) => 
    ({
      coverID: work.cover_i,
      title: work.title,
      author: work.author_name,
      firstPublished: work.first_publish_year,
      id: work.key.replace('/works/', ''),
    })
  );
  
  return {
    props: {
      books
    }
  }
}

export default BooksPage;

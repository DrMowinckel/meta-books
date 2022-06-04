import { GetStaticPaths, GetStaticProps } from "next";
import styled from "styled-components";
import { IBook } from "../../components/Book";
import Wrapper from "../../components/Wrapper";

interface BookDisplayProps {
  book: IBook;
}

const StyledBook = styled.section`
  display: grid;
  grid-template-columns: 300px 1fr;
  flex-direction: column;
  width: 100%;
  position: relative;
  column-gap: 30px;
  margin-top: 30px;
  
  p {
    margin-top: 0;
  }
`

const StyledImage = styled.img`
  height: auto;
  width: 100%;
  object-fit: contain;
`

const BookDisplay: React.FC<BookDisplayProps> = ({ book }) => {
  return (
    <Wrapper>
      <h2>{ book.title }</h2>
      <StyledBook>
        <StyledImage src={`https://covers.openlibrary.org/b/id/${book.coverID}-L.jpg`} alt={`Cover image for '${book.title}'`} />
        <section>
          <p>By <b>{book.author}</b></p>
          { book.firstPublishDate &&
            <p><b>First publish:</b> {book.firstPublishDate}</p>
          }
          <p><b>Subjects:</b> { book.subjects?.slice(0, 10).join(', ') }</p>
        </section>
      </StyledBook>
    </Wrapper>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://openlibrary.org/search.json?q=subject%3Aweb+development');
  const results = await response.json();

  const ids = results.docs.slice(0, 10).filter((work: any) => !!work.cover_i && !!work.author_name).map((work: any) => 
    ({
      id: work.key.replace('/works/', ''),
    })
  );
  
  const paths = ids.map((id: {id: string}) => ({ params: { id: `${id.id}` } }))
  
  return {
    paths,
    fallback: 'blocking' // false or 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id;
  
  const response = await fetch(`https://openlibrary.org/works/${id}.json`);
  const result = await response.json();
  
  const authorResponse = await fetch(`https://openlibrary.org${result.authors[0].author.key}.json`);
  const author = await authorResponse.json();
  
  const book: IBook = {
    coverID: result.covers[0],
    title: result.title,
    author: author.name,
    id: id ?? result.key.replace('/works/', ''),
    firstPublishDate: result.first_publish_date ?? '',
    subjects: result.subjects,
  }
  
  return {
    props: {
      book
    }
  }
};

export default BookDisplay;

import type { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router';
import { ChangeEventHandler, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IBook } from '../components/Book';
import Books from '../components/Books';
import Search from '../components/Search';
import Wrapper from '../components/Wrapper';

interface HomeProps {
  books: IBook[];
}

interface SearchResults {
  results: IBook[];
}

const TitleAndSearch = styled.header`
  display: grid;
  grid-template-columns: 1fr 350px;
  align-items: end;
`

const Home: NextPage<HomeProps> = ({ books }) => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResults>();
  const router = useRouter();
  
  const queryHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setQuery(event.target.value);
    setSearchResult({ results: books.filter(book => book.author.join('').toLowerCase().includes(query.toLowerCase()) || book.title.toLowerCase().includes(query.toLowerCase()))})
  };
  
  useEffect(() => {
    if (!query) {
      router.replace('/', undefined, { shallow: true });
      setSearchResult({ results: [] });
    } else {
      router.push({
        pathname: '/',
        query: { search: query}
      });
    }
  }, [query])
  
  
  return (
    <Wrapper>
      <section>
        <TitleAndSearch>
          <div>
            { !query && !searchResult?.results.length
              ? <h1>Welcome to Meta Books</h1>
              :  <>
                  <h1>Searching for {query}</h1>
                </>
            }
          </div>
          <Search query={query} queryHandler={queryHandler} />
        </TitleAndSearch>
        { !query && !searchResult?.results.length
          ?  <>
              <p>Below you can see the three latest books, but you can also search by title or author</p>
              <Books books={books} amountOfBooks={3} />
            </>
          : <>
              <p>Showing {searchResult?.results.length} results</p>
              <Books books={searchResult?.results ?? []} booksPerRow={5} />
            </>
        }
      </section>
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch('https://openlibrary.org/search.json?q=subject%3Aweb+development');
  const results = await response.json();

  const books = results.docs.slice(0, 100).filter((work: any) => !!work.cover_i && !!work.author_name).map((work: any) => 
    ({
      coverID: work.cover_i,
      title: work.title,
      author: work.author_name,
      id: work.key.replace('/works/', ''),
    })
  );
  
  return {
    props: {
      books
    }
  }
}

export default Home

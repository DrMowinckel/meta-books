import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export interface IBook {
  title: string;
  coverID: number;
  author: string[];
  id: string;
  firstPublishDate?: string;
  subjects?: string[];
}

interface BookProps extends IBook {
  goTo?: boolean;
}

const StyledImage = styled(Image)`
  height: 100%;
  width: 100%;
  object-fit: contain;
`

const StyledBook = styled(Link)`
  display: grid;
  grid-template-rows: 200px 1fr;
  row-gap: 1em;
  justify-content: center;
  width: 100%;
`

const H4 = styled.h4`
  text-align: center;
`


const Book: React.FC<BookProps> = (props) => {
  const StyledLink = styled.a`
    transition: all 0.2s ease-in;
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 15px;
    
    &:hover {
      cursor: pointer;
      transform: scale(1.1);
    }
  `
  
  return (
    <StyledBook href={`/books/${props.id}`}>
      <StyledLink>
        <StyledImage src={`https://covers.openlibrary.org/b/id/${props.coverID}-L.jpg`} alt={`Cover image for '${props.title}'`} width={300} height={300} />
        
        <H4>{ props.title }</H4>
      </StyledLink>
    </StyledBook>
  )
}

export default Book;

import { ChangeEventHandler } from "react";
import styled from "styled-components";

interface SearchProps {
  query: string;
  queryHandler: ChangeEventHandler<HTMLInputElement>;
}

const Input = styled.input`
  max-height: 5em;
  padding: 1em;
  font-size: 1em;
  border-radius: 4px;
  background-color: var(--color-background);
  border: 1px solid grey;
  font-style: italic;
  font-family: var(--font-family-content);
  outline: none;
  font-weight: 700;
  transition: all 0.3s ease-in-out;
  
  &:focus {
    background-color: white;
  }
`

const Search: React.FC<SearchProps> = ({ query, queryHandler }) => {
  return (
    <Input type="text" placeholder="Search for any book or author in the catalogue..." defaultValue={query} onChange={queryHandler} />
  )
}

export default Search;

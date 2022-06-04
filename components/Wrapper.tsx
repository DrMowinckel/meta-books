import Link from "next/link"
import styled from "styled-components"

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 35px;
  background-color: var(--color-primary);
  color: var(--color-background);
  
  nav {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    font-size: 1.5em;
  }
  
  a {
    color: var(--color-background);
  }
  
  .logo {
    font-size: 2em;
    font-family: var(--font-family-heading);
  }
`

const Wrapper: React.FC<{ children?: React.ReactNode }> = (props) =>
  <>
    <Header>
      <nav>
        <Link href="/">
          <a className='logo'>META BOOKS</a>
        </Link>
        
        <Link href="/books">
          Books
        </Link>
      </nav>
    </Header>
    
    { props.children }
  </>

export default Wrapper

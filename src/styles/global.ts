import { createGlobalStyle } from 'styled-components';
import githubBackground from '../assets/github-bg.svg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

  }

  body {
    background: #f0f0f5  url(${githubBackground}) no-repeat 70% top;
  }

  body,
  button,
  input {
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
  }

  img {
    max-width: 100%;
  }

  a {
    text-decoration: none;
    color: black;
  }

  #root {
    max-width: 60rem;
    margin: 0 auto;
    padding: 2.5rem 1.25rem;
  }

  button {
    cursor: pointer;
  }
`;

/* eslint-disable react/function-component-definition */
import React from 'react';

// import { Container } from './styles';

const Comments: React.FC = () => {
  return (
    <section
      ref={elem => {
        if (!elem) {
          return;
        }
        const scriptElem = document.createElement('script');
        scriptElem.src = 'https://utteranc.es/client.js';
        scriptElem.async = true;
        scriptElem.crossOrigin = 'anonymous';
        scriptElem.setAttribute('repo', 'areasflavio/desafio-reactjs-blog');
        scriptElem.setAttribute('issue-term', 'pathname');
        scriptElem.setAttribute('label', 'blog-comment');
        scriptElem.setAttribute('theme', 'github-dark');
        elem.appendChild(scriptElem);
      }}
    />
  );
};

export default Comments;

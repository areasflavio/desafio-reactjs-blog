import React from 'react';

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
        scriptElem.setAttribute('repo', 'areasflavio/reactjs-blog');
        scriptElem.setAttribute('issue-term', 'pathname');
        scriptElem.setAttribute('label', 'blog-comment');
        scriptElem.setAttribute('theme', 'dark-blue');
        elem.appendChild(scriptElem);
      }}
    />
  );
};

export default Comments;

import React from 'react';
import { useRouteData } from 'react-static';
import { Link } from 'components/Router';

export default () => {
  const { currentPage, posts, totalPages } = useRouteData()
  return (
    <div>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/${post.id}/`}>{post.title}</Link>
            <p>{post.date}</p>
          </li>
        ))}
      </ul>
      <p>{currentPage} - {totalPages}</p>
    </div>
  )
};

import React from 'react'
import { useRouteData } from 'react-static'
//
import { Link } from 'components/Router'

export default function Post() {
  const { post } = useRouteData()
  return (
    <div>
      <Link to="/">{'<'} Back</Link>
      <br />
      <h3>{post.title}</h3>
      <p>{post.fecha}</p>
      <p>{post.date}</p>
      <p>{post.pubDate}</p>
      <p>{post.file}</p>
      <p>{post.filesize}</p>
      <p>{post.episode}</p>
      <p>{post.season}</p>
      <p>{post.duration}</p>
    </div>
  )
}

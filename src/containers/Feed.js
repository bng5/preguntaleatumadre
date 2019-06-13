import { useRouteData } from 'react-static';

export default function Feed() {
  const { posts } = useRouteData()
  return JSON.stringify(posts)
}

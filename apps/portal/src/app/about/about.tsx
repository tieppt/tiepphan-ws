import React from 'react';
import { RoundButton } from '../components/round-button/RoundButton.styled';
import { useAsync } from "@tpws/react-web/hooks";
import { createHttpInstance } from "@tpws/common/http";

/* eslint-disable-next-line */
export interface AboutProps {}

async function fetchPostList() {
  const http = createHttpInstance('https://jsonplaceholder.typicode.com');
  const response = await http.get('/posts');
  return response.data;
}

export function About(props: AboutProps) {
  const { value: posts, status, execute } = useAsync(fetchPostList, false);
  return (
    <div>
      <h1>Welcome to about!</h1>
      <div>
        <RoundButton className="btn-blue" onClick={execute}>Fetch Post</RoundButton>
      </div>
      {status === 'success' ? posts.map(post => <article key={post.id}>{post.title}</article>) : null}
    </div>
  );
}

export default About;

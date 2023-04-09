import React, { useState, useEffect } from 'react';
import './myPost.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


export default function MyPost() {
  const [postData, setPostData] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        Navigate('/SignIn');
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axios.get('http://localhost:3001/myPosts', {
          headers,
        });
        if (response.data.status === true) {
          setPostData(response.data.data);
          console.log(response.data.data);
        } else {
          window.alert(response.data.message);
        }
      } catch (error) {
        console.error(error);
        window.alert('An error occurred while fetching the data.');
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className='Response'>
      {postData.map((post) => (
        <div key={post.id}>
          {post.html?
          <>
          <h2>{post.title}</h2>
          <p>Author: {post.author_name}</p>
          <p>Provider: {post.provider_name}</p>
          <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
          </>
          :
        <>
          <h2>{post.ogTitle}</h2>
          <p>Description:{post.ogDescription}</p>
          <p>ImageUrlUrl: {post.ogImage.url}</p>

        </>
}
</div>
      ))}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import './myPost.css';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon } from "react-share";

export default function MyPost() {
  const Navigate = useNavigate();
  const { userId } = useParams(); 
  const [postData, setPostData] = useState([]);
  const token = localStorage.getItem('token');
  const [page, setPage] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        Navigate('/signIn');
        return;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axios.get(`http://localhost:3001/myPosts/${userId}`, { 
          headers,
        });
        setPostData(response.data.data);
      } catch (err) {
        window.alert(err.response.data.message);
      }
    };

    fetchData();
  }, [token, userId]); 

  const handleDeletePost = async (postId) => {
    if (!postId) {
      return;
    }

    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    try {
      await axios.delete(`http://localhost:3001/post/${postId}`, { headers, });
      setPostData((prevData) => prevData.filter((post) => post._id !== postId));
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };


  const nextPage = () => {
    if ((page + 1) * 10 < postData.length) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const maxPage = Math.ceil(postData.length / 10);

  const displayedPosts = postData.slice(page * 10, (page + 1) * 10);


  return (
    <div >
      {displayedPosts.map((post) => (
        <div className='Response' key={post._id}> 
          {post.html ? (
            <li>
              <h2>{post.title}</h2>
              <p>Author: {post.author_name}</p>
              <p>Provider: {post.provider_name}</p>
              <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
            </li>
          ) : (
            <Link to={post.ogUrl} target="_blank">
              <li>
                <h2>{post.ogTitle}</h2>
                <p>Description: {post.ogDescription}</p>
                {post.ogImage?.url && <img src={post.ogImage?.url} alt="image" />}
              </li>
            </Link>
          )}
           <div className="shareButtons">
                  <FacebookShareButton url={post.ogUrl||post.url}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <WhatsappShareButton url={post.ogUrl||post.url}>
                    <WhatsappIcon size={32}round />
                  </WhatsappShareButton>
                  <TwitterShareButton url={post.ogUrl||post.url}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton url={post.ogUrl||post.url}>
                     <LinkedinIcon size={32} round/>
                  </LinkedinShareButton>
                </div>
          <MdDelete className='delete-Icon'  onClick={() => handleDeletePost(post._id)} />
          </div>
      ))}
        <div className='prevNext'>
        <GrPrevious className='prev' disabled={page === 0} onClick={prevPage}/>
        <span className="pageNo">{page + 1} of {maxPage}</span>
        <GrNext className='next' disabled={(page + 1) === maxPage} onClick={nextPage}/>
      </div>
    </div>
  );
}


             
// import React, { useState, useEffect } from 'react';
// import './myPost.css';
// import axios from 'axios';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { MdDelete } from 'react-icons/md';
// import { GrNext, GrPrevious } from 'react-icons/gr';
// import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon } from "react-share";

// export default function MyPost() {
//   const Navigate = useNavigate();
//   const { userId } = useParams(); 
//   const [postData, setPostData] = useState([]);
//   const token = localStorage.getItem('token');
//   const [page, setPage] = useState(0); 

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!token) {
//         Navigate('/signIn');
//         return;
//       }
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       };
//       try {
//         const response = await axios.get(`http://localhost:3001/myPosts/${userId}`, { 
//           headers,
//         });
//         setPostData(response.data.data);
//       } catch (err) {
//         window.alert(err.response.data.message);
//       }
//     };

//     fetchData();
//   }, [token, userId]); 

//   const handleDeletePost = async (postId) => {
//     if (!postId) {
//       return;
//     }

//     if (!window.confirm('Are you sure you want to delete this post?')) {
//       return;
//     }

//     const headers = {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     };
//     try {
//       await axios.delete(`http://localhost:3001/post/${postId}`, { headers, });
//       setPostData((prevData) => prevData.filter((post) => post._id !== postId));
//     } catch (err) {
//       window.alert(err.response.data.message);
//     }
//   };


//   const nextPage = () => {
//     if ((page + 1) * 10 < postData.length) {
//       setPage(page + 1);
//     }
//   };

//   const prevPage = () => {
//     if (page > 0) {
//       setPage(page - 1);
//     }
//   };
//   const maxPage = Math.ceil(postData.length / 10);

//   const displayedPosts = postData.slice(page * 10, (page + 1) * 10);


//   return (
//     <div >
//       {displayedPosts.map((post) => (
//         <div className='Response' key={post._id}> 
//           {post.html ? (
//             <li>
//               <h2>{post.title}</h2>
//               <p>Author: {post.author_name}</p>
//               <p>Provider: {post.provider_name}</p>
//               <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
//             </li>
//           ) : (
//             <Link to={post.ogUrl} target="_blank">
//               <li>
//                 <h2>{post.ogTitle}</h2>
//                 <p>Description: {post.ogDescription}</p>
//                 {post.ogImage?.url && <img src={post.ogImage?.url} alt="image" />}
//               </li>
//             </Link>
//           )}
        
//           <MdDelete className='delete-Icon'  onClick={() => handleDeletePost(post._id)} />

//           {/* Share buttons */}
//           <div className="share-buttons">
//             <FacebookShareButton url={window.location.href}>
//               <FacebookIcon size={32} round />

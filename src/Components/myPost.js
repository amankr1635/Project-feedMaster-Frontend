import React, { useState, useEffect } from 'react';
import './myPost.css';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { FaShare } from 'react-icons/fa';
import Swal from 'sweetalert2';


import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon } from "react-share";

export default function MyPost() {
  const Navigate = useNavigate();
  const { userId } = useParams(); 
  const [postData, setPostData] = useState([]);
  const [showShareButton, setShowShareButton] = useState(false);
 
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
        const response = await axios.get(`https://feed-master.onrender.com/myPosts/${userId}`, { 
          headers,
        });
        setPostData(response.data.data);
      } catch (err) {
        Swal.fire(err.response.data.message)
      }
    };

    fetchData();
    Navigate(`/myPosts/${userId}?page=${page}`);
  }, [token, userId,page]); 

  const handleDeletePost = async (postId) => {
    if (!postId) {
      return;
    }
    Swal.fire({
      title: 'Are you sure you want to delete this post?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7B014C',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
    
        try {
           axios.delete(`https://feed-master.onrender.com/post/${postId}`,{ headers});
          setPostData((prevData) => prevData.filter((post) => post._id !== postId));
        } catch (err) {
          Swal.fire(err.response.data.message);
        }
      };
      }
    )
  }


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
  const handleShareIconClick = () => {
    setShowShareButton(!showShareButton);
    setTimeout(() => {
      setShowShareButton(false);
    }, 10000);
  };

  return (
    <div >
      {displayedPosts.map((post) => (
        <div className='Response' key={post._id}> 
          {post.html ? (
            <Link to={post.url}>
              <ul>
            <li>
              <h2>{post.title}</h2>
              <p>Author: {post.author_name}</p>
              <p>Provider: {post.provider_name}</p>
              <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
            </li>
              </ul>
            </Link>
          ) : (
            <Link to={post.ogUrl} target="_blank">
              <ul>
              <li>
                <h2>{post.ogTitle}</h2>
                <p>Description: {post.ogDescription}</p>
                {post.ogImage?.url && <img src={post.ogImage?.url} alt={`productImage`} />}
              </li>
              </ul>
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
      <FaShare className="shareIcon"size={24} onClick={handleShareIconClick} />
      {showShareButton && (
        <div className="homeShareButton">
          <FacebookShareButton url={window.location.href}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <WhatsappShareButton url={window.location.href}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <TwitterShareButton url={window.location.href}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={window.location.href}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
      )}
        <div className='prevNext'>
        <GrPrevious className='prev' disabled={page === 0} onClick={prevPage}/>
        <span className="pageNo">{page+1} of {maxPage}</span>
        <GrNext className='next' disabled={(page + 1) === maxPage} onClick={nextPage}/>
      </div>
    </div>
  );
}

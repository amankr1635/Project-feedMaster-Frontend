import React, { useState, useEffect } from 'react';
import './Home.css';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import { GrNext,GrPrevious } from 'react-icons/gr';
import { FaShare } from 'react-icons/fa';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon } from "react-share";
import Swal from 'sweetalert2';



export default function Home() {
  const Navigate = useNavigate();

  const [url, setUrl] = useState('');
  const [htmlData, setHtmlData] = useState('');
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [providerName, setProviderName] = useState('');
  const [ogTitle, setOgTitle] = useState('');
  const [ogDescription, setOgDescription] = useState('');
  const [ogUrl,setOgUrl] = useState("")
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [showShareButton, setShowShareButton] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');


  
  const fetchAllPosts = async () => {
    try {
      let response;
      if(userId){
         response =await axios.get(`${process.env.REACT_APP_API_URL}allPost?userId=${userId}`);
      }
      else{
        response = await axios.get(`${process.env.REACT_APP_API_URL}allPost`);
      }
      setAllPosts(response.data.data);
    } catch (error) {
      Swal.fire({
        title: error.response.data.message,
        icon: 'error',
        confirmButtonColor: '#ad104a',
      });
    }
  };

  useEffect(() => {
    fetchAllPosts();
    Navigate(`/?page=${page}`)
  }, []);

  const postUrl = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Navigate("/SignIn");
    } else if (!url) {
      Swal.fire({
        icon: 'error',
        title:'url cannot be Empty',
        confirmButtonColor: '#ad104a',
      })
    } else {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}post`,{ url },{ headers } );
        setHtmlData(response.data.data.html);
        setTitle(response.data.data.title);
        setAuthorName(response.data.data.author_name);
        setProviderName(response.data.data.provider_name);
        fetchAllPosts(); 
        setUrl('');
        setOgTitle(response.data.data.ogTitle);
        setOgDescription(response.data.data.ogDescription);
        setOgUrl(response.data.data.ogUrl);
        setOgImageUrl(response.data.data.ogImage.url);
        fetchAllPosts(); 
        setUrl('');
      } catch (error) {
        Swal.fire({
          title: error.response.data.message,
          icon: 'error',
          confirmButtonColor: '#ad104a',
        });
      }
    }
  };
  const nextPage = () => {
    if ((page + 1) * 10 < allPosts.length) {
      setPage(page + 1);
      searchParams.set('page', page + 1);
      Navigate(`/?${searchParams.toString()}`);
      fetchAllPosts();
    }
  };
  
  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
      searchParams.set('page', page - 1);
      Navigate(`/?${searchParams.toString()}`);
      fetchAllPosts();
    }
  };

  const maxPage = Math.ceil(allPosts.length / 10);

  const displayedPosts = allPosts.slice(page * 10, (page + 1) * 10);
  const handleShareIconClick = () => {
    setShowShareButton(!showShareButton);
    setTimeout(() => {
      setShowShareButton(false);
    }, 10000);
  };
  

  return (
    <div className="Input">
      <input
        className="Url"
        type="url"
        value={url}
        placeholder="Url"
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      <button className="SubmitButton" type="submit" onClick={postUrl}>
        Submit
      </button>
      <div className="Response">
        {htmlData ? (
          <Link to={url} target='_blank'>
            <ul>
          <li>
            {title && <h2>{title}</h2>}
            {authorName && <p>Author: {authorName}</p>}
            {providerName && <p>Provider: {providerName}</p>}
            {htmlData && (
              <div  dangerouslySetInnerHTML={{ __html: htmlData }}></div>
              )}
          </li>
              </ul>
          </Link>
        ) : (
          <Link to={ogUrl} target='_blank'>
            <ul>
          <li>
            {ogTitle && <h2>{ogTitle}</h2>}
            {ogDescription && <p>Description : {ogDescription}</p>}
            {ogImageUrl && <img src={ogImageUrl} alt={`image`} />}
          </li>
            </ul>
          </Link>
        )}
      </div>
      <div className="AllPosts">
        <h2>All Posts :</h2>
        {displayedPosts.map((post) => (
          <div key={post._id}>
            {post.html ? (
              <Link to= {post.url} target='_blank'>
                <ul>

              <li className="post-item">
                <h2>{post.title}</h2>
                <p>Author: {post.author_name}</p>
                <p>Provider: {post.provider_name}</p>
                <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
              </li>
                </ul>
              </Link>
            ) : (
              <Link to ={post.ogUrl} target='_blank'>
                <ul>
              <li className="post-item">
                <h2>{post.ogTitle}</h2>
                <p>Description:{post.ogDescription}</p>
                {post.ogImage?.url && (
                  <img src={post.ogImage?.url} alt={`productImage`} />
                  )}
              </li>
              </ul>
              </Link>
            )}
          </div>
        ))}

        <FaShare className="shareIcon"size={24}  onClick={handleShareIconClick} />
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
        <GrPrevious className='prev' disabled={page === 1} onClick={prevPage}/>
        <span className="pageNo">{page + 1} of {maxPage}</span>
        <GrNext className='next' id="next-page-btn"disabled={(page + 1) === maxPage} onClick={nextPage}/>
      </div>
      </div>
    </div>
  )
};
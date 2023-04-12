import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GrNext,GrPrevious } from 'react-icons/gr';
import { FacebookShareButton,FacebookIcon, TwitterShareButton, TwitterIcon,WhatsappShareButton ,WhatsappIcon,LinkedinShareButton,LinkedinIcon} from "react-share";


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
  const [page, setPage] = useState(0); // state variable for pagination

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/allPost');
      setAllPosts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  const postUrl = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Navigate("/SignIn");
    } else if (!url) {
      window.alert('url cannot be Empty');
    } else {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      try {
        const response = await axios.post('http://localhost:3001/post',{ url },{ headers } );
        setHtmlData(response.data.data.html);
        setTitle(response.data.data.title);
        setAuthorName(response.data.data.author_name);
        setProviderName(response.data.data.provider_name);
        fetchAllPosts(); // fetch all posts again after creating a new post
        setUrl('');
        setOgTitle(response.data.data.ogTitle);
        setOgDescription(response.data.data.ogDescription);
        setOgUrl(response.data.data.ogUrl);
        setOgImageUrl(response.data.data.ogImage.url);
        fetchAllPosts(); // fetch all posts again after creating a new post
        setUrl('');
      } catch (error) {
        window.alert(error.response.data.message);
      }
    }
  };
  const nextPage = () => {
    if ((page + 1) * 10 < allPosts.length) {
      setPage(page + 1);
    }
  };
  
  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  const maxPage = Math.ceil(allPosts.length / 10);

  const displayedPosts = allPosts.slice(page * 10, (page + 1) * 10);
  

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
          <li>
            {title && <h2>{title}</h2>}
            {authorName && <p>Author: {authorName}</p>}
            {providerName && <p>Provider: {providerName}</p>}
            {htmlData && (
              <div dangerouslySetInnerHTML={{ __html: htmlData }}></div>
            )}
          </li>
        ) : (
          <Link to={ogUrl} target='_blank'>
          <li>
            {ogTitle && <h2>{ogTitle}</h2>}
            {ogDescription && <p>Description : {ogDescription}</p>}
            {ogImageUrl && <img src={ogImageUrl} alt="image" />}
          </li>
          </Link>
        )}
      </div>
      <div className="AllPosts">
        <h2>All Posts:</h2>
        {displayedPosts.map((post) => (
          <div >
            {post.html ? (
              <li className="post-item">
                <h2>{post.title}</h2>
                <p>Author: {post.author_name}</p>
                <p>Provider: {post.provider_name}</p>
                <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
               <div className="shareButton">
                  <FacebookShareButton url={post.url}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <WhatsappShareButton url={post.url}>
                    <WhatsappIcon size={32}round />
                  </WhatsappShareButton>
                  <TwitterShareButton url={post.url}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <LinkedinShareButton url={post.url}>
                    <LinkedinIcon size={32} round/>
                  </LinkedinShareButton>
              </div>
              </li>
            ) : (
              <Link to ={post.ogUrl} target='_blank'>
              <li className="post-item">
                <h2>{post.ogTitle}</h2>
                <p>Description:{post.ogDescription}</p>
                {post.ogImage?.url && (
                  <img src={post.ogImage?.url} alt="image" />
                  )}
                  <div className="shareButton2">
                    <FacebookShareButton url={post.ogUrl}>
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <WhatsappShareButton url={post.ogUrl}>
                      <WhatsappIcon size={32}round />
                    </WhatsappShareButton>
                    <TwitterShareButton url={post.ogUrl}>
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton url={post.ogUrl}>
                      <LinkedinIcon size={32} round/>
                    </LinkedinShareButton>
              </div>
              </li>
              </Link>
            )}
          </div>
        ))}
       <div className='prevNext'>
        <GrPrevious className='prev' disabled={page === 0} onClick={prevPage}/>
        <span className="pageNo">{page + 1} of {maxPage}</span>
        <GrNext className='next' disabled={(page + 1) === maxPage} onClick={nextPage}/>
      </div>
      </div>
    </div>
  )
};
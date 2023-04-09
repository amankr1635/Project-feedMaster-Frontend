import React , {useState} from 'react';
import "./Home.css";
import {  useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Home() {
  const Navigate=useNavigate();
  const [url, setUrl] = useState("");
  const [htmlData, setHtmlData] = useState("");
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [providerName, setProviderName] = useState("");
  const [ogTitle,setOgTitle]= useState("");;
  const [ogDescription,setOgDescription]=useState("");
  const [ogImageUrl,setOgImageUrl]= useState("")



  const postUrl = async function() {
    const token = localStorage.getItem("token");
    if (!token) {
      Navigate("/SignIn");
    } else if(!url) {
      window.alert("url cannot be Empty");
    } else {
      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      };
      const data = await axios.post("http://localhost:3001/post", { url }, { headers });
      console.log(data);
      if (data.data.status === true) {
        setHtmlData(data.data.data.html);
        setTitle(data.data.data.title);
        setAuthorName(data.data.data.author_name);
        setProviderName(data.data.data.provider_name);
        setOgTitle(data.data.data.ogTitle);
        setOgDescription(data.data.data.ogDescription);
        setOgImageUrl(data.data.data.ogImage.url);

        setUrl("");
      } else {
        window.alert(data.data.message);
      }
    }
  };

  return (
    <div className='Input'>
      <input className="Url" type="url" value={url} placeholder="Url" aria-label="Url" onChange={(e) => { setUrl(e.target.value) }} />
      <button className="SubmitButton" type="submit" onClick={postUrl}>Submit</button>
      <div className='Response'>
        {htmlData?
        <li>{title && <h2>{title}</h2>}
        {authorName && <p>Author: {authorName}</p>}
        {providerName && <p>Provider: {providerName}</p>}
        {htmlData && <div dangerouslySetInnerHTML={{ __html: htmlData }}></div>}
        </li>
        :
        <li>
          {ogTitle && <h2>{ogTitle}</h2>}
          {ogDescription && <p>Description : {ogDescription}</p>}
          {ogImageUrl && <p>ImageUrl : {ogImageUrl} </p>}
        </li>
      }
      </div>
    </div>
  )
}

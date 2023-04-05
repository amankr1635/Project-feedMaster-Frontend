import React from 'react'
import  "./Home.css"
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    // <div classNameNameName='urlInput'>
    //         <input type = "text" url= "url" id="url" placeholder='Url'/>
    // </div>
    <div className='Input'>
    {/* <form className="serachBar" role="search"> */}
    <input className="Url" type="url" placeholder="Url" aria-label="Url"/>
    <button className="SubmitButton" type="submit">Submit</button>
  {/* </form> */}
     </div>

  )
}

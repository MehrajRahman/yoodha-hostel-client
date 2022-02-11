import React from 'react';
import "./Header.css";
import img from "../../../images/img.jpg"
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
         <div className="container  pt-5">
            <div className="row header-row d-flex align-items-center ">
            
            <div className="col-md-6 col-sm-12 ">
                <h1 className="heading">Welcome to  <br/> Yoodha Hostel</h1>
                <p className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus cumque tempora totam ipsum laudantium facere labore nihil dolore molestiae obcaecati?</p>
                <button className="btn btn-primary"><Link to="/serveFood">Order Now</Link></button>
            </div>

            <div className=" col-md-6 col-sm-12">
                <img style={{maxWidth: '400px'}} src={img}alt=""/>
            </div>
          
            </div>
        </div>
    </div>
  )
}

export default Header
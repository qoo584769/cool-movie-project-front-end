import React, { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';

interface PaymentInfoProps {

}
const NewebPayInfo: React.FC<PaymentInfoProps> = ({ }) => {
  const {id}= useParams();
  useEffect(() => {
    console.log('付款返回',id)
  }, [id]);

  return (
    <>
      <div className="card">
        <div className="card-header">
          Featured
        </div>
        <div className="card-body">
          <h5 className="card-title">Special title treatment</h5>
          <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    </>
  )
}

export default NewebPayInfo
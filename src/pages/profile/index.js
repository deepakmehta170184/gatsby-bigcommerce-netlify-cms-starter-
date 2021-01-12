import { navigate } from "gatsby";
import React, { useEffect, useState } from "react"
import { isLoggedIn } from "../../services/auth";
import Layout from '../../components/Layout';
import { getUser } from "../../services/auth";
import netlifyIdentity from 'netlify-identity-widget';

const Profile = () => {
  let localData =''; 
    if(netlifyIdentity.currentUser()){
      localData = netlifyIdentity.currentUser();
      console.log('localstorage----',localData.user_metadata.full_name)
      console.log('localstorage-email---',localData.email)
    }
    const [orderArr, setOrderArr] = useState([]);
      
    
    if(!netlifyIdentity.currentUser()){
      navigate("/");
    }
    useEffect(async () => {
      fetchCustomerOrder().then((userOrder) => {
        console.log('userData---', userOrder);
        if (userOrder) {
          console.log("userOrder----",userOrder)
          setOrderArr(userOrder);
          }
        })
    }, []);

    

    const fetchCustomerOrder = async () => {
      if(localData){
        const res = await fetch(
        `/.netlify/functions/bigcommerce?endpoint=orders?email=` + localData.email,
        {
          credentials: 'same-origin',
          mode: 'same-origin',
        }
      );
      return await res.json();
      }
      else{
        return false;
      }
      
    };

    return(<Layout>
    <h1>Your profile</h1>
      <ul>
        <li>Name: {localData?localData.user_metadata.full_name:''}</li>
        <li>E-mail: {localData?localData.email:''}</li>
        
        {orderArr?orderArr.map=(order,i)=>{
          return <li>Orders: {order.id}</li>
        }:null}
      </ul>
    </Layout>
      
   )
    
}
   

export default Profile
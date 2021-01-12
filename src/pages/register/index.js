import { navigate } from "gatsby";
import  { useEffect, useState } from "react"
import _ from 'lodash';
import { isLoggedIn, getUser } from "../../services/auth";
import netlifyIdentity from 'netlify-identity-widget';

const Register = () => {
  
    if(!isLoggedIn){
      navigate("/");
    }
    useEffect(async () => {
     console.log('getuser in signup--', netlifyIdentity.currentUser())
    }, []);

    return (null)
}
   

export default Register
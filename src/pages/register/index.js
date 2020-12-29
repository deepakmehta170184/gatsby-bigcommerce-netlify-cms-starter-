import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { handleLogin, isLoggedIn } from '../../services/auth';
import { Button } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [company, setCompany] = useState('');
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    console.log("store-hash---",process.env.API_STORE_HASH);
    const handleSubmit = () => {
        console.log('handleSubmit---firstname',first_name,'---lastname---',last_name,'---passs----',password,'---email----',email);
        let store_hash = process.env.API_STORE_HASH;
        let XAuthToken = process.env.API_TOKEN;
        
        const SignupData = [
            {
                "email": email,
                "first_name": first_name,
                "last_name": last_name,
                "company": company,
                "authentication": {
                  "force_password_reset": true,
                  "new_password": password
                }
            }
        ];

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('x-auth-token', '6jc1ax7fyqwnqzmrcmlpedm16hrj5qj');

        return fetch('https://api.bigcommerce.com/stores/p7yh4d2thd/v3/customers', {
        method: 'POST',
        headers: {
            "x-auth-token": "6jc1ax7fyqwnqzmrcmlpedm16hrj5qj"
          },
        body: JSON.stringify(SignupData)
        }).then(response => response.json())
        .then((user) => {
            console.log("user---",user);
            console.log(user.first_name);
            console.log(user.last_name);
        })
        .catch((error) => {
        console.error(error);
        });

    };
    
	if (isLoggedIn()) {
        console.log('test---');
		navigate(`/profile`);
	}else{
        console.log('else test---');
    }
	return (
		<>
			<form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First Name</label>
                    <input type='text' 
                    className="form-control" placeholder="Enter First Name"
                    name='first_name' onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type='text' 
                    className="form-control" placeholder="Enter Last Name"
                    name='last_name' onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Company</label>
                    <input type='text' 
                    className="form-control" placeholder="Company"
                    name='company' onChange={(e) => setCompany(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type='password'
                        className="form-control" 
                        placeholder="Enter password"
						name='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type='email'
                        className="form-control" 
                        placeholder="Enter email"
						name='email'
						onChange={(e) => setEmail(e.target.value)}
					/>
                </div>
                <Button id='addsignup' onClick={() => handleSubmit()}>
							Submit
						</Button>
                {/* <button type="submit" className="btn btn-primary btn-block" onClick={() => handleSubmit()}>Submit</button> */}
                
            </form>
		</>
	);
};

export default Register;

import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { handleLogin, isLoggedIn } from '../../services/auth';
import { Button } from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './register.css';


const Register = () => {
	const [first_name, setFirstName] = useState('');
	const [last_name, setLastName] = useState('');
	const [company, setCompany] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	console.log('store-hash---', process.env.API_STORE_HASH);
	console.log('store-hash---', process.env.API_TOKEN);
	const handleSubmit2 = () => {
		console.log(
			'handleSubmit---firstname',
			first_name,
			'---lastname---',
			last_name,
			'---passs----',
			password,
			'---email----',
			email
		);

		let store_hash = process.env.API_STORE_HASH;
		let XAuthToken = process.env.API_TOKEN;

		const SignupData = [
			{
				email: email,
				first_name: first_name,
				last_name: last_name,
				company: company,
				authentication: {
					force_password_reset: true,
					new_password: password,
				},
			},
		];

		let myHeaders = new Headers({
            "Content-Type": "application/json",
            "X-Auth-Token": XAuthToken,
			"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
			"Access-Control-Allow-Origin":"*",
			"Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-Auth-Token",
			"Access-Control-Allow-Credentials":"true"
        });

		let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    	let targetUrl = 'https://api.bigcommerce.com/stores/'+store_hash+'/v3/customers';
		return fetch(proxyUrl + targetUrl, {
			method: 'POST',
			headers: myHeaders,
			body: JSON.stringify(SignupData),
			
		})
			.then((user) => {
				console.log('user---', user);
				console.log(user[0].first_name);
				console.log(user[0].last_name);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const handleSubmit = () => {
		console.log(
			'handleSubmit---firstname',
			first_name,
			'---lastname---',
			last_name,
			'---passs----',
			password,
			'---email----',
			email
		);

		const SignupData = [
			{
				email: email,
				first_name: first_name,
				last_name: last_name,
				company: company,
				authentication: {
					force_password_reset: true,
					new_password: password,
				},
			},
		];

		fetch(`/.netlify/functions/bigcommerce?endpoint=customers`, {
			method: 'POST',
			credentials: 'same-origin',
			mode: 'same-origin',
			body: JSON.stringify(SignupData),
			
		})
			.then((user) => {
				console.log('user---', user);
				console.log(user[0].first_name);
				console.log(user[0].last_name);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	if (isLoggedIn()) {
		console.log('test---');
		navigate(`/profile`);
	} else {
		console.log('else test---');
	}
	return (
		<>
			<form style={{border:'1px solid #ccc'}}>
				<div className='container'>
					<h3 style={{textAlign:'center'}}>Sign Up</h3>

					<div className='form-group'>
						<label>First Name</label>
						<input
							type='text'
							className='form-control'
							placeholder='Enter First Name'
							name='first_name'
							onChange={(e) => setFirstName(e.target.value)}
						/>
					</div>
					<div className='form-group'>
						<label>Last Name</label>
						<input
							type='text'
							className='form-control'
							placeholder='Enter Last Name'
							name='last_name'
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>

					<div className='form-group'>
						<label>Company</label>
						<input
							type='text'
							className='form-control'
							placeholder='Company'
							name='company'
							onChange={(e) => setCompany(e.target.value)}
						/>
					</div>

					<div className='form-group'>
						<label>Password</label>
						<input
							type='password'
							className='form-control'
							placeholder='Enter password'
							name='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<div className='form-group'>
						<label>Email</label>
						<input
							type='email'
							className='form-control'
							placeholder='Enter email'
							name='email'
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className='clearfix'>
						<Button
							className='signupbtn'
							id='addsignup'
							onClick={() => handleSubmit()}
						>
							Submit
						</Button>
					</div>
				</div>

				{/* <button type="submit" className="btn btn-primary btn-block" onClick={() => handleSubmit()}>Submit</button> */}
			</form>
		</>
	);
};

export default Register;

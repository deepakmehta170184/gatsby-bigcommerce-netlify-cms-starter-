import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { handleLogin, isLoggedIn } from './../../services/auth';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
    
    const handleSubmit = () => {
        console.log('handleSubmit---',username,'---passs----',password);
		handleLogin(username, password);
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
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input type='text' 
                    className="form-control" placeholder="Enter Username"
                    name='username' onChange={(e) => setUsername(e.target.value)} />
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
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={() => handleSubmit()}>Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
		</>
	);
};

export default Login;

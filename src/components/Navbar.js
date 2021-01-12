import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import github from '../img/github-icon.svg';
import logo from '../img/logo-header.png';
import CartContext from '../context/CartProvider';
// import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"
// import "react-netlify-identity-widget/styles.css" // delete if you want to bring your own CSS
import _ from 'lodash';
import { isLoggedIn, loginNI, logoutNI, getUser } from '../services/auth';
import { navigate } from '@reach/router';
import netlifyIdentity from 'netlify-identity-widget';

const Navbar = (props) => {
	const [active, setActive] = useState(false);
	const [navBarActiveClass, setNavBarActiveClass] = useState('');
	// const identity = useIdentityContext();
	// const [dialog, setDialog] = useState(false);
	const [logged, setLogged] = useState('');
	const basepage = React.createRef();

	console.log('identity data---', netlifyIdentity.currentUser());
	netlifyIdentity.on('login', (user) => console.log(user));

	useEffect(async () => {
		netlifyIdentity.init();
	}, []);

	netlifyIdentity.on('signup', (user) => console.log('signup---', user));
	netlifyIdentity.on('login', (user) => console.log('login----', user));
	// const name =
	// (identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.full_name) || "NoName"

	// console.log("identity data---",JSON.stringify(identity))
	// const isLoggedIn = identity && identity.isLoggedIn;

	// if(identity && identity.user && identity.user.user_metadata && identity.user.user_metadata.signupSource){
	//   let fullname = _.split(identity.user.user_metadata.full_name, ' ' );
	//   let first_name;
	//   let last_name;
	//   if(fullname.length>2){
	//     first_name = fullname[0];
	//     last_name = fullname[fullname.length-1];
	//   }
	//   else{
	//     first_name = fullname[0];
	//     last_name = fullname[1]?fullname[1]:'';
	//   }

	//   const SignupData = [
	// 		{
	// 			email: identity.user.email,
	// 			first_name: first_name,
	// 			last_name: last_name,
	// 		},
	// 	];

	// 	fetch(`/.netlify/functions/bigcommerce?endpoint=customers`, {
	// 		method: 'POST',
	// 		credentials: 'same-origin',
	// 		mode: 'same-origin',
	// 		body: JSON.stringify(SignupData),

	// 	})
	//   .then((response) => {
	//     return response.json();
	//   }).then(function(user) {
	//     console.log('data---',user);
	//     console.log('firstName---',user.data[0].first_name);

	//   })
	//   .catch((error) => {
	//     console.error(error);
	//   });
	// }
	let checkAtBC = false;
	if (isLoggedIn && !checkAtBC && netlifyIdentity.currentUser()) {
    console.log('in signup');
    
    let email = netlifyIdentity.currentUser().email;
		fetch(
			`/.netlify/functions/bigcommerce?endpoint=customers?email:in=` + email,
			{
				credentials: 'same-origin',
				mode: 'same-origin',
			}
		)	.then((response) => {
      return response.json();
    }).then((userData) => {
      console.log("userData.data.length----",userData.data.length)
			if (!userData.data.length) {
				//not registered yet
				let fullname = _.split(
					netlifyIdentity.currentUser().user_metadata.full_name,
					' '
				);
				let first_name;
				let last_name;
				if (fullname.length > 2) {
					first_name = fullname[0];
					last_name = fullname[fullname.length - 1];
				} else {
					first_name = fullname[0];
					last_name = fullname[1] ? fullname[1] : '';
				}

				const SignupData = [
					{
						email: email,
						first_name: first_name,
						last_name: last_name,
					},
				];

				fetch(`/.netlify/functions/bigcommerce?endpoint=customers`, {
					method: 'POST',
					credentials: 'same-origin',
					mode: 'same-origin',
					body: JSON.stringify(SignupData),
				})
					.then((response) => {
						return response.json();
					})
					.then(function(user) {
						console.log('data---', user);
						console.log('firstName---', user.data[0].first_name);
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
        console.log('in else of signup-----')
				checkAtBC = true;
			}
		});
	}

	const checkUser = async (email) => {
		const res = await fetch(
			`/.netlify/functions/bigcommerce?endpoint=customers?email:in=` + email,
			{
				credentials: 'same-origin',
				mode: 'same-origin',
			}
		);
		return await res.json();
	};

	const toggleHamburger = () => {
		// toggle the active boolean in the state
		if (setActive(!active)) {
			if (active) {
				setNavBarActiveClass('is-active');
			} else {
				setNavBarActiveClass('');
			}
		}
	};

	//Login with netlify-identity-widget

	const login = () => {
		console.log('login...');
		loginNI((user) => {
			console.log(user);
			console.log('logged in!');
			setLogged(true);
			// basepage.current.updateUser(user);
			goHome();
		});
	};
	const logout = () => {
		console.log('logout...');
		logoutNI((user) => {
			console.log('logged out!');
			setLogged(false);
		});
	};

	const goHome = () => {
		setTimeout(() => navigate('/', { replace: true }), 200);
	};

	return (
		<>
			<nav
				className='navbar is-transparent'
				role='navigation'
				aria-label='main-navigation'
			>
				<div className='container'>
					<div className='navbar-brand'>
						<Link to='/' className='navbar-item' title='Logo'>
							<img src={logo} alt='My Store' />
						</Link>
						{/* Hamburger menu */}
						<div
							className={`navbar-burger burger ${navBarActiveClass}`}
							data-target='navMenu'
							onClick={() => toggleHamburger()}
						>
							<span />
							<span />
							<span />
						</div>
					</div>
					<div id='navMenu' className={`navbar-menu ${navBarActiveClass}`}>
						<div className='navbar-start has-text-centered'>
							<Link className='navbar-item' to='/about'>
								About
							</Link>
							<Link className='navbar-item' to='/products'>
								Products
							</Link>
							<Link className='navbar-item' to='/blog'>
								Blog
							</Link>
							<Link className='navbar-item' to='/contact'>
								Contact
							</Link>
							{/* {isLoggedIn ? <Link className="navbar-item" to="#" onClick={() => setDialog(true)}>
                Hello {name}, Log out here!
              </Link> : <Link className="navbar-item" to="#" onClick={() => setDialog(true)}>
                Login
              </Link>} */}
							{netlifyIdentity.currentUser() ? (
								<Link className='navbar-item' to='#' onClick={() => logout()}>
									Hello {netlifyIdentity.currentUser().user_metadata.full_name},
									Log out here!
								</Link>
							) : (
								<Link className='navbar-item' to='#' onClick={() => login()}>
									Login
								</Link>
							)}

							{/* <Link className="navbar-item" to="#" onClick={() => login()}>
                Login
              </Link> */}

							<CartContext.Consumer>
								{(value) => {
									return (
										<Link
											className='navbar-item menu-item-bigcommerce-cart'
											to='/cart'
										>
											Cart
											{value &&
												value.state.cart &&
												value.state.cart.numberItems > 0 && (
													<span className='bigcommerce-cart__item-count full'>
														{value.state.cart.numberItems}
													</span>
												)}
										</Link>
									);
								}}
							</CartContext.Consumer>
						</div>
						<div className='navbar-end has-text-centered'>
							<a
								className='navbar-item'
								href='https://github.com/bigcommerce/gatsby-bigcommerce-netlify-cms-starter'
								target='_blank'
								rel='noopener noreferrer'
							>
								<span className='icon'>
									<img src={github} alt='Github' />
								</span>
							</a>
							{netlifyIdentity.currentUser()  ? (
								<Link className='navbar-item' to='/profile'>
									Profile
								</Link>
							) : null}
						</div>
					</div>
				</div>
			</nav>
			{/* <div>
      <IdentityModal showDialog={dialog} onCloseDialog={() => setDialog(false)} />
      </div> */}
		</>
	);
};

export default Navbar;

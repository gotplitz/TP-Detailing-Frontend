import React, { useEffect, useRef, useState } from 'react';
import { Slant as Hamburger } from 'hamburger-react';
import { NavLink, Link } from 'react-router-dom';

// Materialize
import { IconButton } from '@mui/material';

import './MainMenu.css';

const MainMenu = ({ pages, services }) => {
	const [isOpen, setOpen] = useState(false);

	const mobileMenuId = 'primary-search-account-menu-mobile';

	const renderMobileMenu = () => {
		const opeMenu = document.getElementById(
			'primary-search-account-menu-mobile'
		);
		if (opeMenu.classList.contains('opened-menu')) {
			opeMenu.classList.remove('opened-menu');
		} else {
			opeMenu.classList.add('opened-menu');
		}

		const stickyMob = document.querySelector(
			'.sticky #primary-search-account-menu-mobile'
		);
		if (stickyMob !== null && stickyMob.classList.contains('opened-menu')) {
			stickyMob.classList.remove('opened-menu');
			opeMenu.classList.remove('opened-menu');
		} else if (
			stickyMob !== null &&
			!stickyMob.classList.contains('opened-menu')
		) {
			stickyMob.classList.add('opened-menu');
			opeMenu.classList.remove('opened-menu');
		}
	};

	const wrapperRef = useRef(null);
	const subwrapperRef = useRef(null);

	useEffect(() => {
		const stickyMob = document.querySelector(
			'.sticky #primary-search-account-menu-mobile'
		);
		const ms = document.querySelector(
			'#navbar #primary-search-account-menu-mobile'
		);

		if (stickyMob === null) {
			ms.classList.remove('opened-menu');
		}
	});

	useEffect(() => {
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				const opeMenu = document.getElementById(
					'primary-search-account-menu-mobile'
				);

				opeMenu.classList.remove('opened-menu');
				setOpen(false);

				const stickyMob = document.querySelector(
					'.sticky #primary-search-account-menu-mobile'
				);

				if (stickyMob !== null) {
					stickyMob.classList.remove('opened-menu');
					opeMenu.classList.remove('opened-menu');
				}

				var hamb = document.getElementsByClassName('hamburger-react');
				var hambdiv = document.querySelectorAll('.hamburger-react div');
				for (var i = 0; i < hamb.length; i++) {
					hamb[i].style.transform = 'none';
				}
				for (var x = 0; x < hambdiv.length; x++) {
					hambdiv[x].style.transform = 'none';
				}
			}
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});

	useEffect(() => {
		const handleClickOutsideSub = (event) => {
			if (
				subwrapperRef.current &&
				!subwrapperRef.current.contains(event.target)
			) {
				const openSubMenuUno = document.getElementById('sub-menu-uno');

				const openSubMenuOne = document.getElementById('mobile-sub-menu-uno');

				const opeStickyUno = document.querySelector('.sticky #sub-menu-uno');

				const opeStickyOne = document.querySelector(
					'.sticky #mobile-sub-menu-uno'
				);

				openSubMenuUno.classList.remove('abierto-submenu');

				openSubMenuOne.classList.remove('abierto-submenu');

				if (opeStickyUno !== null) {
					opeStickyUno.classList.remove('abierto-submenu');
				} else if (opeStickyOne !== null) {
					opeStickyOne.classList.remove('abierto-submenu');
				}
			}
		};

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutsideSub);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutsideSub);
		};
	});

	const closeMenu = () => {
		const closeMenu = document.getElementById(
			'primary-search-account-menu-mobile'
		);
		const stickyMob = document.querySelector(
			'.sticky #primary-search-account-menu-mobile'
		);
		const stickyMob2 = document.querySelector('.sticky #mobile-sub-menu-uno');

		closeMenu.classList.remove('opened-menu');

		if (stickyMob !== null) {
			stickyMob.classList.remove('opened-menu');
			stickyMob2.classList.remove('abierto-submenu');
			closeMenu.classList.remove('opened-menu');
		}
		setOpen(false);
	};

	const celsubMenu = (e) => {
		e.preventDefault();

		const openOne = document.getElementById('mobile-sub-menu-uno');

		if (openOne.classList.contains('abierto-submenu')) {
			openOne.classList.remove('abierto-submenu');
		} else {
			openOne.classList.add('abierto-submenu');
		}

		const stickyMob = document.querySelector('.sticky #mobile-sub-menu-uno');

		if (stickyMob !== null && stickyMob.classList.contains('abierto-submenu')) {
			stickyMob.classList.remove('abierto-submenu');
		} else if (
			stickyMob !== null &&
			!stickyMob.classList.contains('abierto-submenu')
		) {
			stickyMob.classList.add('abierto-submenu');
		}
	};

	const hoverMenuU = () => {
		const sub1 = document.querySelector('.menu-container #sub-menu-uno');
		const sticky = document.querySelector('.sticky #sub-menu-uno');

		if (sticky && sticky !== null) {
			sticky.classList.add('abierto-submenu');
		} else {
			sub1.classList.add('abierto-submenu');
		}
	};

	const clickMenu = (e) => {
		e.preventDefault();
		const sub1 = document.getElementById('sub-menu-uno');
		const sticky = document.querySelector('.sticky #sub-menu-uno');

		if (!sub1.classList.contains('abierto-submenu')) {
			sub1.classList.add('abierto-submenu');
		} else if (
			sticky !== null &&
			!sticky.classList.contains('abierto-submenu')
		) {
			sticky.classList.add('abierto-submenu');
		}
	};

	const NeedHov = (mitem) => {
		if (mitem.menuname === 'Services') {
			return hoverMenuU;
		}
	};

	const NeedClkMob = (mitem) => {
		if (mitem.menuname === 'Services') {
			return celsubMenu;
		} else {
			return closeMenu;
		}
	};

	const closeWoutclick = () => {
		const sub1 = document.getElementById('sub-menu-uno');

		if (sub1.classList.contains('abierto-submenu')) {
			sub1.classList.remove('abierto-submenu');
		}
	};

	return (
		<div className='menu-container'>
			<div className='section-desktop'>
				<ul>
					{pages &&
						pages.length > 0 &&
						pages
							.sort((a, b) => new Date(a.date) - new Date(b.date))
							.map((mitem) => (
								<li key={mitem._id}>
									<NavLink
										exact
										to={
											mitem.menuname === 'Services'
												? ' '
												: mitem.menuname === 'Home'
												? '/'
												: `/${mitem.pagelink}`
										}
										className={`top-menu ${
											mitem.menuname.startsWith('Services') ? 'has-submenu' : ''
										}`}
										activeClassName='top-active'
										onMouseOver={NeedHov(mitem)}
										onClick={(e) =>
											mitem.menuname === 'Services' && clickMenu(e, mitem)
										}
									>
										{mitem.menuname}
									</NavLink>

									{mitem && mitem.pagetitle.startsWith('Service') ? (
										<div id='sub-menu-uno' className='submenu-pop-up'>
											<ul onMouseLeave={closeWoutclick}>
												{services &&
													services.length > 0 &&
													services
														.sort((a, b) => new Date(b.date) - new Date(a.date))
														.map((sub) => (
															<li key={sub._id}>
																<Link
																	to={`/services/${sub.servicelink}`}
																	onMouseDown={closeMenu}
																>
																	{sub.servicetitle}
																</Link>
															</li>
														))}
											</ul>
										</div>
									) : null}
								</li>
							))}
				</ul>
			</div>
			<div ref={wrapperRef} className='mobile-menu-wrap class-mobile'>
				<div
					id='primary-search-account-menu-mobile'
					className='menu-pop-up'
					ref={subwrapperRef}
				>
					<ul ref={subwrapperRef}>
						{pages &&
							pages.length > 0 &&
							pages
								.sort((a, b) => new Date(a.date) - new Date(b.date))
								.map((mitem) => (
									<li
										key={mitem._id}
										ref={subwrapperRef}
										className={
											mitem.menuname.startsWith('Services')
												? 'top-menu has-submenu'
												: 'top-menu'
										}
									>
										<Link
											to={
												mitem.menuname === 'Services'
													? ''
													: mitem.menuname === 'Home'
													? '/'
													: `/${mitem.pagelink}`
											}
											onClick={(e) =>
												mitem.menuname.startsWith('Services')
													? e.preventDefault()
													: closeMenu
											}
											onTouchEnd={NeedClkMob(mitem)}
											className={
												mitem.menuname.startsWith('Services')
													? 'mobile-submenu'
													: ''
											}
											ref={subwrapperRef}
										>
											{mitem.menuname}
										</Link>

										{mitem && mitem.menuname.startsWith('Services') && (
											<div id='mobile-sub-menu-uno' className='submenu-pop-up'>
												<ul>
													{services &&
														services.length > 0 &&
														services
															.sort(
																(a, b) => new Date(b.date) - new Date(a.date)
															)
															.map((submob) => (
																<li key={submob._id}>
																	<Link
																		to={`/services/${submob.servicelink}`}
																		onClick={closeMenu}
																		onTouchEnd={closeMenu}
																	>
																		{submob.servicetitle}
																	</Link>
																</li>
															))}
												</ul>
											</div>
										)}
									</li>
								))}
					</ul>
				</div>

				<IconButton
					aria-label='show more'
					aria-controls={mobileMenuId}
					aria-haspopup='true'
					color='inherit'
					className='mobile-menu'
				>
					<Hamburger
						label='NAVIGATION'
						toggled={isOpen}
						toggle={setOpen}
						onToggle={(toggled) => {
							if (toggled) {
								renderMobileMenu();
							} else {
								closeMenu();
							}
						}}
					/>
				</IconButton>
			</div>
		</div>
	);
};

export default MainMenu;

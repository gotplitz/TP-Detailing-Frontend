import React, { useState, Fragment, createRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Grid, TextField } from '@mui/material';
import { Alert, AlertTitle } from '@material-ui/lab';

const ContactForm = () => {
	let history = useHistory();
	const [disabled, setDisabled] = useState(false);
	const recaptchaRef = createRef();
	const [sent, setSent] = useState(false);
	const [mess, setMess] = useState('');
	const [error, setError] = useState(false);
	const [warning, setWarn] = useState(false);
	const [errs, setErrs] = useState();
	const [formData, setFormdata] = useState({
		fullname: '',
		phone: '',
		clientemail: '',
		how: '',
		message: '',
	});

	const { fullname, phone, clientemail, how, message } = formData;

	const onChange = (e) => {
		setFormdata({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setDisabled(true);

		const recaptchaValue = recaptchaRef.current.getValue();
		await axios
			.post('https://admin.gettpd.com/api/emails', formData)
			.then((res) => {
				if (!recaptchaValue) {
					setWarn(true);
					setDisabled(false);
				} else if (res.data.msg === 'success') {
					setError(false);
					setWarn(false);
					setSent(true);
					setMess('The form has been sent successfully!');
					history.push('/thank-you');

					setFormdata({
						fullname: '',
						phone: '',
						clientemail: '',
						message: '',
					});
					setDisabled(false);
					recaptchaValue.current.reset();
				} else if (res.data.msg === 'fail') {
					setError(true);
					setSent(false);
					setDisabled(false);
				}
			})
			.catch((err) => {
				const errors = err.response.data.errors;
				setError(true);
				setDisabled(false);
				if (errors) {
					setErrs(errors);
				}
			});
	};

	return (
		<form onSubmit={(e) => onSubmit(e)} noValidate>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={12} md={6}>
					<TextField
						autoComplete='fname'
						name='fullname'
						value={fullname}
						variant='outlined'
						fullWidth
						id='fullname'
						label='Full Name'
						onChange={(e) => onChange(e)}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<TextField
						variant='outlined'
						fullWidth
						id='phone'
						label='Phone Number'
						name='phone'
						value={phone}
						autoComplete='pnumber'
						onChange={(e) => onChange(e)}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<TextField
						variant='outlined'
						fullWidth
						id='clientemail'
						label='Email Address'
						name='clientemail'
						value={clientemail}
						autoComplete='email'
						onChange={(e) => onChange(e)}
					/>
				</Grid>
				<Grid item xs={12} sm={12} md={6}>
					<TextField
						variant='outlined'
						fullWidth
						id='how'
						label='How did you hear about us?'
						name='how'
						value={how}
						autoComplete='email'
						onChange={(e) => onChange(e)}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						id='message'
						label='Message'
						name='message'
						value={message}
						multiline
						rows={4}
						variant='outlined'
						onChange={(e) => onChange(e)}
					/>
				</Grid>
				<Grid item xs={12}>
					{warning && (
						<Fragment>
							<Alert severity='warning'>
								<AlertTitle>Warning</AlertTitle>
								Check the box to prove you are not a robot
							</Alert>
						</Fragment>
					)}
					<ReCAPTCHA ref={recaptchaRef} sitekey='' onChange={onChange} />
				</Grid>
				<Grid item xs={12}>
					{sent && (
						<Fragment>
							<Alert severity='success'>
								<AlertTitle>Success</AlertTitle>
								{mess}
							</Alert>
						</Fragment>
					)}
				</Grid>
				<Grid item xs={12}>
					{error && (
						<Fragment>
							<Alert severity='error'>
								<AlertTitle>Error</AlertTitle>
								There was an error sending the form
								<ul>
									{errs &&
										errs.length > 0 &&
										errs.map((r, index) => <li key={index}>{r.msg}</li>)}
								</ul>
							</Alert>
						</Fragment>
					)}
				</Grid>
			</Grid>
			<div className='button-container'>
				<button type='submit' className='fm-button' disabled={disabled}>
					<span>{disabled ? 'Sending...' : 'Send'}</span>
				</button>
			</div>
		</form>
	);
};

export default ContactForm;

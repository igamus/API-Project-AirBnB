import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
    const dispatch = useDispatch();
    const history = useHistory()
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(true);
    const { closeModal } = useModal();

    useEffect(() => {
        if (
            firstName.length &&
            lastName.length &&
            email.length &&
            username.length >= 4 &&
            password.length >= 6 &&
            confirmPassword.length >= 6
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [firstName, lastName, email, username, password, confirmPassword]); // there's probably a better way that takes advantage of our existing listeners

    const handleSubmit = e => {
        e.preventDefault();
        setErrors({});
        let updatedErrors = {};
        if (password !== confirmPassword) return setErrors({confirmPassword: 'Passwords must match!'});

        return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
        .then(closeModal)
        .then(history.push('/'))
        .catch(
            async res => {
                const data = await res.json(); // is this superfluous and handled in the thunk?
                if (data && data.errors) {
                    updatedErrors = {...updatedErrors, ...data.errors}
                    setErrors(updatedErrors);
                }
            }
        );
    };

    return (
        <div className='modal-interior' id='signup'>
            <h1>Sign Up</h1>
            <form id='signup-form' onSubmit={handleSubmit}>
                <>
                    {Object.values(errors).map(e => (<div className='error su-error'>{e}</div>))}
                </>
                <label>
                    <input
                        placeholder='First Name'
                        type='text'
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        placeholder='Last Name'
                        type='text'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        placeholder='Email'
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        placeholder='Username'
                        type='text'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    <input
                        placeholder='Confirm Password'
                        type='password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </label>
                <button className='primary-button' type='submit' disabled={disabled}>Sign Up</button>
            </form>
        </div>
    );
}

export default SignupFormModal;

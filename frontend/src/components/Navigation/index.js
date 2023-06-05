import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navigation.css';
import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton.js';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const logout = e => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <li>
                <ProfileButton user={sessionUser} />
                <button onClick={logout}>Log Out</button>
            </li>
        );
    } else {
        sessionLinks = (
            <li>
                <NavLink to='/login'>Log In</NavLink>
                <NavLink to='/signup'>Sign Up</NavLink>
            </li>
        )
    }

    return (
        <ul>
            <li>
                <NavLink exact to='/'>Home</NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;

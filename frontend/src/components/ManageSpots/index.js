import './ManageSpots.css';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as spotActions from '../../store/spots';
import SpotsIndexCard from '../SpotsIndexCard';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal';

function ManageSpots() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(spotActions.loadUserSpotsThunk());
    }, [dispatch]);

    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj);

    const onClick = e => {
        e.preventDefault();
        history.push('/spots/create');
    };

    // const updateClick = e => {
    //     e.preventDefault();
    //     console.log(object);
    //     history.push(`/spots/${spotid}/edit`)
    // };

    return (
        <div className='manage-spots'>
            <h1>Manage Your Spots</h1>
            <button className='create-spot-button' onClick={onClick}>Create a New Spot</button>
            <div className='manage-spots-index'>
                {spots.map(spot =>
                    spot.previewImage
                        ?
                    <div key={`spot-index-card-${spot.id}`} className='spot-index-card'>
                        <SpotsIndexCard key={`spot-card-${spot.id}`} spot={spot} />
                        <span>
                            <button><Link to={`/spots/${spot.id}/edit`}>Update</Link></button>
                            {/* <button onClick={updateClick}><Link exact to=''>Update</Link></button> */}
                            <OpenModalButton
                                modalComponent={<DeleteSpotModal spotid={spot.id} />}
                                buttonText={'Delete'}
                            />
                        </span>
                    </div>
                        :
                    null
                )}
            </div>
        </div>
    );
}

export default ManageSpots;

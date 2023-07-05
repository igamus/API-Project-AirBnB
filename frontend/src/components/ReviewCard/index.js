import './ReviewCard.css';
import DeleteReviewModal from '../DeleteReviewModal';
import OpenModalButton from '../OpenModalButton';
import reviewDateFormatter from '../../utils/reviewDateFormatter';

function ReviewCard({ review, user, source }) {
    let formattedReviewDate;
    if (review?.createdAt) formattedReviewDate = reviewDateFormatter(review.createdAt);
    else formattedReviewDate = '';

    return (
            <div className='review-card'>
                <h3>{source === 'spot' ? review?.User.firstName : review?.Spot.name}</h3>
                <h4 id='review-date' style={{fontSize: '13pt'}}>{formattedReviewDate}</h4>
                <p>{review?.review}</p>
                {
                    (source === 'user' || user?.id === review.User.id)
                        ?
                    <OpenModalButton
                        modalComponent={<DeleteReviewModal reviewid={review?.id} className='modal-with-background' />}
                        buttonText={'Delete'}
                        className={'secondary-button drb'}
                    />
                        :
                    ''
                }
            </div>
    );
};

export default ReviewCard;

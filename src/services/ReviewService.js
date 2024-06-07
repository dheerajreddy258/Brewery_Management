import axios from 'axios';

const serverUrl =  'https://brewery-management.onrender.com';

class ReviewService {
    addReview(review) {
        return axios.post(serverUrl + '/reviews/add', review);
    }

    updateReview(review) {
        return axios.put(serverUrl + '/reviews/update', review);
    }

    deleteReview(review) {
        return axios.delete(serverUrl + '/reviews/delete', { data: review });
    }

    getReviewsForBrewery(itemId) {
        return axios.get(serverUrl + `/reviews/brewery/${itemId}`);
    }
}

const reviewService = new ReviewService();
export default reviewService;

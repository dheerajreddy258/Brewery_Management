import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import BrewService from '../services/BrewService';
import '../styles/BreweryDetails.css'
import {useUser} from '../context/userContext'

export default function BreweryDetails() {
    const {user} = useUser();
    const { id } = useParams();
    const [fetch,setFetch] = useState(false);
    const [brewery, setBrewery] = useState({});
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: '', description: '' });

    useEffect(() => {
        const fetchById = async () => {
            try {
                const response = await BrewService.getBreweryById(id); 
                setBrewery(response.data)
            } catch (err) {
                console.log(err);
            }
        }
        //fetch reviews
        const getItemReviews = async () => {
            try {
                const response = await BrewService.getItemReviews(id);
                setReviews(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchById();
        getItemReviews();
    }, [id,fetch]);

    const handleReviewSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await BrewService.addReview(user.name, newReview.rating, id, newReview.description);
            setReviews([...reviews, response.data]);
            setNewReview({ rating: '', description: '' });
            setFetch(!fetch);
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div>
            <div className="navbar">
                <Link to="/">
                    <div className="app-name">Dheeraj's Brewery store</div>
                </Link>

                <div className="user-detail">Hello {user.name}</div>
            </div>
            <div className="brewery-deatils-id">
                <div className="brewery-main">

                    <h1>{brewery.name}</h1>
                    <p><strong>Type:</strong> {brewery.type || 'N/A'}</p>
                    <p><strong>Address:</strong> {brewery.address || 'N/A'}</p>
                    <p><strong>Phone:</strong> {brewery.phone || 'N/A'}</p>
                    <p><strong>Website:</strong> {brewery.website || 'N/A'}</p>
                    <p><strong>State:</strong> {brewery.state || 'N/A'}</p>
                    <p><strong>City:</strong> {brewery.city || 'N/A'}</p>
                </div>

                <div className="brewery-reviews">

                    <h2>Reviews</h2>
                    <ul>
                        {reviews.map((review, index) => (
                            <li key={index}>
                                <strong>Rating:</strong> {review.rating} <br />
                                <strong>Description:</strong> {review.description} <br />
                                <strong>By:</strong> {review.userName} <br />
                                <strong>Published on:</strong> {new Date(review.publishedOn).toLocaleDateString()} <br />
                            </li>
                        ))}
                    </ul>
                </div>

                <h3>Add a Review</h3>
                <form onSubmit={handleReviewSubmit}>
                    <label>
                        Rating : 
                        <input
                            type="number"
                            value={newReview.rating}
                            onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                            min="1"
                            max="5"
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Description: <br />
                        <textarea
                            value={newReview.description}
                            onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
                            required
                        ></textarea>
                    </label>
                    <br />
                    <div className="btn-container brew-btn">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

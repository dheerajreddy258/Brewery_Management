import React, { useState, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import '../styles/HomePage.css';
import BrewService from '../services/BrewService';
import BreweryItem from './BreweryItem';
import {useUser} from '../context/userContext'

export default function HomePage() {
    const navigate = useNavigate();
    const {user} = useUser(); 
    useEffect(()=>{ 
        if(user.emailId === 'na'){
            setTimeout(()=>{
                navigate('/login');
            },1000)
        }
    },[user.emailId])
    const [breweries, setBreweries] = useState([]);
    useEffect(() => {
        const fetchAll = async () => {
            const response = await BrewService.getBreweries();
            setBreweries(response.data)
        }
        fetchAll();
    }, [])
    const [filter, setFilter] = useState('');
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        try {
            if (filter === "by_city") {
                const response = await BrewService.getByCity(query);
                setBreweries(response.data);
            }
            else if (filter === "by_name") {
                const reponse = await BrewService.getByName(query);
                setBreweries(reponse.data);
            } 
            else if(filter === "by_state"){
                const reponse = await BrewService.getByState(query);
                setBreweries(reponse.data);
            }
            else {
                const reponse = await BrewService.getByType(query);
                setBreweries(reponse.data);
            }
        } catch (error) {
            console.log("Error fetching breweries:", error);
        }
    };

    return (
        <div>
            <div className="navbar">
                <Link to="/">
                    <div className="app-name"> Brewery store Review system</div>
                </Link>
                <div className="search-filters">
                    <select name="search" id="search" onChange={(e) => setFilter(e.target.value)}>
                        <option value="">Choose the filter to search</option>
                        <option value="by_city">City</option>
                        <option value="by_name">Name</option>
                        <option value="by_state">State</option>
                        <option value="by_type">Type</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Search for..."
                        disabled={filter === ""}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    
                    <button className="search-btn" onClick={handleSearch}>Search</button>
                </div>
                <div className="user-detail">Hello, {user.name}</div>
            </div>
            <div className="home-content">
                {
                    breweries.length === 0 && <h1>Sorry No items found !</h1>
                }
                {breweries.map((brewery) => (
                    <Link to={`/brewery/${brewery.id}`} key={brewery.id}>
                        <BreweryItem
                            name={brewery.name}
                            address={`${brewery.street}, ${brewery.city}, ${brewery.state_province}, ${brewery.postal_code}, ${brewery.country}`}
                            phone={brewery.phone}
                            website={brewery.website_url}
                            type={brewery.brewery_type}
                            state={brewery.state}
                            city={brewery.city}
                        />
                    </Link>
                ))}
            </div>

        </div>
    );
}

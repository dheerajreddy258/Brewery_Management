import React from 'react';
import '../styles/BreweryItem.css';

export default function BreweryItem({ name, address, phone, website, state, city, type }) {
    const renderValue = (value) => value === null ? "N/A" : value;

    return (
        <div className='brew-container'>
            <h2>{renderValue(name)}</h2>
            <p><strong>Type : </strong> {renderValue(type)} </p>
            <p><strong>Address : </strong> {renderValue(address)}</p>
            <p><strong>Phone number : </strong> {renderValue(phone)}</p>
            <p><strong>Website URL : </strong>{renderValue(website)}</p>
            <p><strong>State : </strong>{renderValue(state)}</p>
            <p><strong>City : </strong>{renderValue(city)}</p>
        </div>
    );
}

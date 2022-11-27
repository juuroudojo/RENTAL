import React from "react"

export default function Offers({ offers }) {
    return <div class="container">
        <h2>Offers</h2>
        {offers.map(offer => (
            <div class="card">
                <div class="card-header">Id: {offer.id}</div>
                <div class="card-body">
                    <p class="card-text">Owner: {offer.owner}</p>
                    <p class="card-text">Price: {offer.price}</p>
                    <p class="card-text">Model: {offer.model}</p>
                    <p class="card-text">Rent time: {offer.until}</p>
                    <a href="#" class="btn btn-primary">Apply for rent</a>
                </div>
            </div>)
        )}
    </div>

}
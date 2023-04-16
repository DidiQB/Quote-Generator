import React, { useState, useEffect } from "react";

const Favorites = () => {
    const [quotes, setQuotes] = useState([]);

    const handleGetFavorites = async () => {
        try {
            const response = await fetch("http://127.0.0.1:3001/quotes", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch quotes");
            }
            const quotes = await response.json();
            console.log("Fetched quotes:", quotes);
            setQuotes(quotes);
        } catch (error) {
            throw new Error("Something went wrong when fetching quotes");
        }


    }
    return (
        <div className="favorites__container">
            <button onClick={handleGetFavorites} className="favorites__button">Favorites<i className="heart__fill"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
            </svg></i>
            </button>

            <div className="favorite__quotes">{quotes.map((quote) => {
                return (
                <div className="quotes__card" key={quote.id}>
                    <p className="favorites__text">{quote.text}</p>
                    <p className="favorites__author">- {quote.author}</p>
                </div>
                )
            })}</div>
        </div>
    );
}

export default Favorites;
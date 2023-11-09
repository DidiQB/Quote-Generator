import React, { useState, useEffect } from "react";

const QuotesCard = ({ quote }) => {
    const [showDeleteButton, setShowDeleteButton] = useState(false);

    const handleMouseEnter = () => {
        setShowDeleteButton(true);
    };

    const handleMouseLeave = () => {
        setShowDeleteButton(false);
    };

    return (
        <div
            className="quotes__card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <p className="favorites__text">{quote.text}</p>
            <p className="favorites__author">- {quote.author}</p>
            {showDeleteButton && (
                <button className="quotes__card__delete">Delete</button>
            )}
        </div>
    );
};

export default QuotesCard;
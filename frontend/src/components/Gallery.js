import { useState, useEffect } from 'react';


const Gallery = (props) => {

    const { savedQuote } = props;
    console.log("savedQuote in Gallery", savedQuote)
    // const quote = props.quote
    // console.log("Gallery", quote);
    return (
        <div>
            <div className="saved__quote__text">
                <p>{savedQuote.text}</p>
            </div>
            <div className="saved__quote__author">
                <p>{savedQuote.author}</p>
            </div>
        </div>
    );
}

export default Gallery;
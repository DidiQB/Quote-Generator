import { useState, useEffect } from 'react';
import Gallery from './Gallery';

const Quote = () => {
    const [quotes, setQuotes] = useState("Generate your Quote");
    const [color, setColor] = useState("red");
    const [savedQuote, setSavedQuote] = useState(quotes);

    const getQuote = (event) => {
        // event.preventDefault();

        const colors = ["#D8E2DB", "#F8ECEA", "#FAE1DD", "#DED6CE", "#FEC5BB", "#F4EBE0"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setColor(randomColor);

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e821ea0b2bmsh1ef1acb423ad9aap187f9ajsne5e65b612fa3',
                'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com'
            }
        };

        fetch('https://famous-quotes4.p.rapidapi.com/random?category=all&count=1', options)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let randomNum = Math.floor(Math.random() * data.length);
                setQuotes(data[randomNum])
            })
            .catch(err => console.error(err));

        }

    const handleSave = () => {
        setSavedQuote(quotes);

    }        


    useEffect(() => {
        getQuote();
        // handleSave();
    }, []);

    return (
        <div className="App">
            <div className='quote' style={{ backgroundColor: color }}>
                <div className="heart">
                    <button className='heart__button' onClick={handleSave}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg>
                    </button>
                </div>
                <div className="quote__text">
                    <p>{quotes.text}</p>
                </div>
                <div className="quote__author">
                    <p>{quotes.author}</p>
                </div>
                <div className='btn__container'>
                    <button onClick={getQuote} className="btn">Get Random Quote</button>
                    <a href=""></a>  
                </div>
            </div>
            <br />
            <Gallery savedQuote={savedQuote} />

        </div>
    );
}

export default Quote;

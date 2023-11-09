import { useState, useEffect } from 'react';
// import Gallery from './Gallery';
import Favorites from './Favorites';
// import dotenv from 'dotenv';
// dotenv.config();

const Quote = () => {
    const [quotes, setQuotes] = useState("Generate your Quote");
    const [color, setColor] = useState("red");
    const [savedQuote, setSavedQuote] = useState(quotes);

    const getQuote = (event) => {
        // event.preventDefault();

        const colors = ["#D77349", "#D3927C", "#E2A780", "#D6714D", "#C55D52", "#D1896A"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)]; 
        setColor(randomColor);

        const apiKey = process.env.REACT_APP_API_KEY;
        const hostKey = process.env.REACT_APP_HOST_KEY;

        const options = {
            method: 'GET',
            headers: {
                // 'X-RapidAPI-Key': apiKey,
                // 'X-RapidAPI-Host': hostKey
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

    const handleSave = async () => {
        setSavedQuote(quotes);
        
        try {
            const response = await fetch("http://127.0.0.1:3001/quote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(quotes),
            });
        
            if (!response.ok) {
                throw new Error("Failed to save quote");
            }
        
            // handle response if needed
        } catch (error) {
            // handle error if needed
            throw new Error("Something went wrong when posting to /quote");
        }

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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>
                    </button>
                </div>
                <div className="quote__text">
                    <p>{quotes.text}</p>
                </div>
                <div className="quote__author">
                    <p>- {quotes.author}</p>
                </div>
                <div className='btn__container'>
                    <button onClick={getQuote} className="btn">Get Random Quote</button>
                    <a href=""></a>  
                </div>
            </div>
            <br />
            {/* <Gallery savedQuote={savedQuote} /> */}
            <Favorites savedQuote={savedQuote}/>
        </div>
    );
}

export default Quote;

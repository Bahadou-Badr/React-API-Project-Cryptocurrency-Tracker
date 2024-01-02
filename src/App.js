import './App.css';
import { useEffect, useState } from "react";
import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => res.json())
      .then(data => {
        setCoins(data);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="coin-search">
            <h1 className="coin-text">Search a currency</h1>
            <form>
              <label htmlFor="coinInput" className="coin-text">
                Search a currency
              </label>
              <input
                type="text"
                id="coinInput"
                className="coin-input"
                placeholder="Search . . ."
                onChange={handleChange}
              />
            </form>
          </div>
  
          {filteredCoins.map(coin => (
            <Coin
              key={coin.id}
              name={coin.name}
              image={coin.image}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              price={coin.current_price} 
              priceChange={coin.price_change_percentage_24h}
              volume={coin.total_volume}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default App;


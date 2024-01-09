import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const API_KEY = 'sk_5caf1b4a7f46406ea95e99901bb5f5d0';
const API_KEY = 'pk_fb2322d825484b26847e2d0560d1d215';

function Ipo() {
  const [ipoData, setIpoData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIpoData = async () => {
      try {
        const response = await axios.get(`https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=${API_KEY}`);
        setIpoData(response.data); // Use response.data directly
      } catch (error) {
        setError(error);
      }
    };

    fetchIpoData();
  }, []);

  return (
    <div>
      {error ? (
        <p>Error fetching IPO data: {error.message}</p>
      ) : ipoData && (
        <div>
          <h2>Latest IPOs</h2>
          <ul>
            {ipoData.map(ipo => (
              <li key={ipo.id}>{ipo.name} - {ipo.price}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Ipo;

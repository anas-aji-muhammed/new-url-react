import axios from 'axios';
import DataTable from '../../Components/DataTable/DataTable';
import './URLShortenPage.css'
import { useState, useEffect } from 'react';


function URLShortenPage(){

    const [longURL, setLongUrl] = useState("");
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // Function to fetch URLs
    const fetchURLs = () => {
      setLoading(true);
      axios.get("http://localhost:4567/api/getUrls")
        .then(response => {
          if (response.status === 200) { // Check if response is OK
            console.log(response.data);
            setTableData(response.data);
          } else {
            console.error('Failed to fetch URLs');
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
          setLoading(false);
        });
    };
  
    // Fetch URLs on component mount
    useEffect(() => {
      fetchURLs();
    }, []);
  
    // Function to shorten URL
    const shortenOnClick = () => {
      setLoading(true); // Set loading to true while processing
      axios.post("http://localhost:4567/api/shorten-url", {
        "originalURL": longURL
      }).then(response => {
        if (response.status === 200 || response.status === 201) { // Check if POST is successful
          console.log(response.data);
          setLongUrl("");
          fetchURLs(); // Fetch updated list of URLs
        } else {
          console.error('Failed to shorten URL');
          setLoading(false);
        }
      }).catch(error => {
        console.error('Error shortening URL:', error);
        setLoading(false);
      });
    };

    return(
        <div className='rootDiv'>
            <form className='urlShortenForm'>
            <h1>URL Shortener</h1>


                <input 
                    placeholder='ENter Long URl' 
                    id='logURlInput' 
                    value={longURL}
                    onChange={(event) => setLongUrl(event.target.value)}
                    />
                <button type='button' onClick={shortenOnClick}>Shorten </button>
                
            </form>
            
            <h2>URL List</h2>
            {loading ? <p>Loading...</p> : <DataTable data={tableData} />}
                    </div>
    )

}

export default URLShortenPage
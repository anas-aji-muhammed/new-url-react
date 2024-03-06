import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import AnalyticsLineChartComponent from './AnalyticsLineChartComponent';
import './AnalyticsPage.css'
import { BsArrowLeft } from "react-icons/bs";

function URLAnalyticsPage() {
    const params = useParams();

    const { id } = params; // Extract the id parameter from the URL

    const location = useLocation();
    const urlDetails = location.state;

    let navigate = useNavigate();

    const [clickEvents, setClickEvents] = useState({});
    const [loading, setLoading] = useState(true);
    const startDate = null;
    const endDate = null;

    const fetchClickEvents = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:4567/api/analytics/${id}`, {
            params: { startDate, endDate }
          });
          setClickEvents(response.data);
          setLoading(false);
          console.log(response.data)
        } catch (error) {
          console.error('Failed to fetch click events:', error);
        }
      };
    useEffect(() => {
        fetchClickEvents();
    }, [id, startDate, endDate]);

    if(loading){
        return(
            <p>loading ... </p>
        );
    }

    return (  
        <div className='rootDiv'>
            <nav>
                
            <button onClick={() => navigate(-1)} id='backButton'>Back</button>
            </nav>
            <div className='urlDetailsDiv'>
                <h2>Original URL: </h2>
                    <a href={urlDetails.urlData.originalURL} target="_blank" rel="noopener noreferrer">
                    {urlDetails.urlData.originalURL}
                    </a>

                    <h2>Short URL: </h2>
                    <a href={`${urlDetails.baseUrl}${urlDetails.urlData.urlHash}`} target="_blank" rel="noopener noreferrer">
                    {`${urlDetails.baseUrl}/${urlDetails.urlData.urlHash}`}
                    </a>

                    <h2>Count: {clickEvents.totalCount}</h2>

            </div>
            <div className='analyticsDetailsDiv'>
                <AnalyticsLineChartComponent clickEventsList={clickEvents.clickEventsList}/>
            </div>
        </div>        
    );
}

export default URLAnalyticsPage;
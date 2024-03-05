import React from 'react';
import { useParams } from 'react-router-dom';
function URLAnalyticsPage() {
    const params = useParams();

    const { id } = params; // Extract the id parameter from the URL

    return (  
        <h1>
            URLAnalyticsPage {id}
        </h1>
    );
}

export default URLAnalyticsPage;
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CustomLineChartToolTip from './CustomLineChartToolTip';

function AnalyticsLineChartComponent({clickEventsList}) {
    const formattedData = clickEventsList.map(event => ({
        ...event,
        clickedAt: new Date(event.clickedAt).toLocaleDateString('en-GB'), // en-GB uses dd/mm/yy format
      }));
    
      return (
        <ResponsiveContainer height="100%" width="100%">
            <LineChart
          width={500}
          height={300}
          data={formattedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="clickedAt" />
          <YAxis allowDecimals={false} />
          <Tooltip content={<CustomLineChartToolTip/>} />
          <Line type="monotone" dataKey="id" stroke="#8884d8" />
        </LineChart>
        </ResponsiveContainer>
      );
}


export default AnalyticsLineChartComponent;
import { Tooltip } from 'recharts';

// Custom tooltip component
const CustomLineChartToolTip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload; // Access the data of the hovered point
    return (
      <div style={
        { backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc', color: 'black'}}>
        <p>Date: {data.clickedAt}</p>
        <p>Clicks: {data.count}</p>
      </div>
    );
  }

  return null;
};

export default CustomLineChartToolTip;

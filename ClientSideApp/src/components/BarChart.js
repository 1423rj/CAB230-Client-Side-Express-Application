
// components/LineChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
export function BarChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          
          plugins: {
            title: {
              display: true,
              text: "Rounded IMDB rating of an Actor"
            },
            

            
                
            
        
            legend: {
              display: false
            }
          },
          
        }}
      />
    </div>
  );
}
export default BarChart;

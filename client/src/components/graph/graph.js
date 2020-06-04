import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class Graph extends Component {

  createGraph = () => {

    let sorted = this.props.data.dataPoints.sort((data1, data2) => {
        data1 = new Date(data1.date);
        data2 = new Date(data2.date);
        return data1 - data2;
    })

    let points = [];
    let dates = [];

    sorted.forEach(dataPoint => {
        let date = new Date(dataPoint.date);
        dates.push(`${date.getUTCMonth()}/${date.getUTCDay()}/${date.getUTCFullYear()}`);
        points.push(dataPoint.data);
    });

    const data = {
      labels: dates,
      datasets: [
        {
          label: "Data Point",
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgb(118,184,82)',
          borderColor: 'rgb(118,184,82)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(118,184,82)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgb(118,184,82)',
          pointHoverBorderColor: 'rgb(118,184,82)',
          pointBackgroundColor: 'rgb(118,184,82)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: points
        }
      ]
    };
    return data;
  }

  render() {

    if (!this.props.data) {
        return null;
    }

    let graph = this.createGraph();

    return (
    <div>
        <Line data={graph}/>
    </div>
    );
  }
}

export default Graph;
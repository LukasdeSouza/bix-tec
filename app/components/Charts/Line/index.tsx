import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineChart: React.FC<{ data: string[]; categories: string[] }> = ({ data, categories }) => {

    const dataIntegers = data.map(str => parseInt(str, 10));

    const options: Highcharts.Options = {
        chart: {
            type: 'line',
            backgroundColor: '#ffff',
            borderColor: '#333',
            borderWidth: 2,
            plotBackgroundColor: '#fff',
            height: 350,
        },
        title: {
            text: '',
            style: {
                color: '#FFFFFF',
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'Poppins, sans-serif',
            },
        },
        xAxis: {
            categories: categories,
            labels: {
                style: {
                    color: '#1976d2',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '10px',
                },
            },
            lineColor: '#1976d2',
            tickColor: '#1976d2',
        },
        yAxis: {
            title: {
                text: 'Valores',
                style: {
                    color: '#1976d2',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '10px',
                },
            },
            gridLineColor: '#444',
            labels: {
                style: {
                    color: '#1976d2',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '10px',
                },
            },
            lineColor: '#1976d2',
            tickColor: '#1976d2',
        },
        legend: {
            enabled: false,
        },
        tooltip: {
            backgroundColor: '#2A2A2A',
            style: {
                color: '#1976d2',
            },
            formatter: function () {
                return `<b>Data: ${this.x}</b><br/>Valor: ${this.y}`;
            },
        },
        series: [
            {
                type: 'line',
                name: 'data',
                data: dataIntegers, 
                color: '#00CFFF',
                marker: {
                    enabled: true,
                    radius: 5,
                    fillColor: '#1976d2',
                },
            },
        ],
        credits: {
            enabled: false,
        },
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default LineChart;

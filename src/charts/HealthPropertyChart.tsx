import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { HealthEntry } from "../components/health/HealthOverview";
import { colors } from "./options";

export interface Props {
    entry: HealthEntry;
}

export const HealthPropertyChart: React.FC<Props> = ({ entry }) => {

    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            backgroundColor: 'transparant',
            spacing: 0,
            margin: 0,
            padding: 0,
            height: 280,
            width: 300
        },
        title: {
            text: entry.title,
            align: 'center',
            verticalAlign: 'middle',
            y: 70,
            style: {
                color: colors.orange
            }
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                colors: [
                    colors.red,
                    colors.orange,
                    colors.green,
                ],
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '100%'
            }
        },
        credits: {
            enabled: false
        }, 
        series: [{
            type: 'pie',
            name: entry.title,
            innerSize: '50%',
            data: [
                
                ['Sad', entry.red],
                ['Meh', entry.yellow], 
                ['Happy', entry.green],              
            ]
        }]
    };
    
    return <HighchartsReact highcharts={Highcharts} options={options}/>;
}
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { HealthCheck } from '../services/HealthService';
import { colors } from './options';

export interface Props {
  healthChecks: HealthCheck[];
}

export const HealthEntryChart: React.FC<Props> = ({ healthChecks }) => {
  const options: Highcharts.Options = {
    title: {
      text: 'Team health over time',
      style: {
        color: colors.orange
      }
    },
    series: [
      {
        name: 'Health',
        data: healthChecks.map((c) => c.healthPercentage),
        type: 'line',
        yAxis: 0,
        zIndex: 1,
        tooltip: {
          valueSuffix: '%',
        },
      },
      {
        name: 'Happy',
        data: healthChecks.map((c) => c.scoreCounts[8]),
        type: 'column',
        yAxis: 1,
        color: colors.green,
      },
      {
        name: 'Meh',
        data: healthChecks.map((c) => c.scoreCounts[1]),
        type: 'column',
        yAxis: 1,
        color: colors.orange,
      },
      {
        name: 'Sad',
        data: healthChecks.map((c) => c.scoreCounts[0]),
        type: 'column',
        yAxis: 1,
        color: colors.red,
      },
    ],
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: false,
        },
      },
      line: {
        zones: [
          {
            value: 61,
            color: colors.red,
          },
          {
            value: 80,
            color: colors.yellow,
          },
          {
            color: colors.green,
          },
        ],
      },
    },
    xAxis: {
      categories: healthChecks.map((c) => c.date),
    },
    yAxis: [
      {
        title: {
          text: 'Health',
        },
        labels: {
          format: '{value}%',
        },
        min: 0,
        max: 100,
        tickAmount: 6,
      },
      {
        title: {
          text: 'Score counts',
        },
        opposite: true,
        min: 0,
        tickAmount: 6,
      },
    ],
    tooltip: {
      shared: true,
    },
    chart: {
        backgroundColor: "transparant",
        style: {
            stroke: colors.orange
        },
        // borderColor: colors.black,
        // borderWidth: 0,
        // plotBackgroundColor: "black",
        plotBorderColor: "red",
        // plotBorderWidth: 0
    },
    credits: {
        enabled: false
    }
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

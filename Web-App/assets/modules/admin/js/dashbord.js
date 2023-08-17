window.onload = function () {
    Highcharts.chart('atheletes_graph', {
        chart: {
            type: 'areaspline',
            backgroundColor: '#343339'
        },
        title: {
            text: ''
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            enabled: false,
            borderWidth: 1,
            backgroundColor: '#343339'
        },
        xAxis: {
            categories: label_options_data,
            lineThickness: 0,
            gridLineWidth: 0,
            lineWidth: 0,
            
            labels: {
             enabled: false
           }
        },
        yAxis: {
           title: null,
           labelWrap: false,
           lineThickness: 0,
           gridLineWidth: 0,
           tickThickness: 0,
           labels: {
             enabled: false
           }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5,
                lineColor: '#939393'
            }
        },
        series: [{
            name: 'Athletes',
            color: '#201f27',
            data: athlete_chart_series
        }]
    });

    Highcharts.chart('fan_graph', {
        chart: {
            type: 'areaspline',
            backgroundColor: '#343339'
        },
        title: {
            text: ''
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            enabled: false,
            borderWidth: 1,
            backgroundColor: '#343339'
        },
        xAxis: {
            categories: label_options_data,
            lineThickness: 0,
            gridLineWidth: 0,
            lineWidth: 0,
            
            labels: {
             enabled: false
           }
        },
        yAxis: {
           title: null,
           labelWrap: false,
           lineThickness: 0,
           gridLineWidth: 0,
           tickThickness: 0,
           labels: {
             enabled: false
           }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5,
                lineColor: '#939393'
            }
        },
        series: [{
            name: 'Fans',
            color: '#201f27',
            data: fan_chart_series
        }]
    });

    Highcharts.chart('coach_graph', {
        chart: {
            type: 'areaspline',
            backgroundColor: '#343339'
        },
        title: {
            text: ''
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            enabled: false,
            borderWidth: 1,
            backgroundColor: '#343339'
        },
        xAxis: {
            categories: label_options_data,
            lineThickness: 0,
            gridLineWidth: 0,
            lineWidth: 0,
            
            labels: {
             enabled: false
           }
        },
        yAxis: {
           title: null,
           labelWrap: false,
           lineThickness: 0,
           gridLineWidth: 0,
           tickThickness: 0,
           labels: {
             enabled: false
           }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5,
                lineColor: '#939393'
            }
        },
        series: [{
            name: 'Coach',
            color: '#201f27',
            data: coach_chart_series
        }]
    });

    Highcharts.chart('club_graph', {
        chart: {
            type: 'areaspline',
            backgroundColor: '#343339'
        },
        title: {
            text: ''
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            enabled: false,
            borderWidth: 1,
            backgroundColor: '#343339'
        },
        xAxis: {
            categories: label_options_data,
            lineThickness: 0,
            gridLineWidth: 0,
            lineWidth: 0,
            
            labels: {
             enabled: false
           }
        },
        yAxis: {
           title: null,
           labelWrap: false,
           lineThickness: 0,
           gridLineWidth: 0,
           tickThickness: 0,
           labels: {
             enabled: false
           }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5,
                lineColor: '#939393'
            }
        },
        series: [{
            name: 'Club',
            color: '#201f27',
            data: club_chart_series
        }]
    });

    Highcharts.chart('posts_graph', {
        chart: {
            type: 'areaspline',
            backgroundColor: '#343339'
        },
        title: {
            text: ''
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            enabled: false,
            borderWidth: 1,
            backgroundColor: '#343339'
        },
        xAxis: {
            categories: label_options_data,
            lineThickness: 0,
            gridLineWidth: 0,
            lineWidth: 0,
            
            labels: {
             enabled: false
           }
        },
        yAxis: {
           title: null,
           labelWrap: false,
           lineThickness: 0,
           gridLineWidth: 0,
           tickThickness: 0,
           labels: {
             enabled: false
           }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' units'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5,
                lineColor: '#939393'
            }
        },
        series: [{
            name: 'Posts',
            color: '#201f27',
            data: posts_chart_series
        }]
    });



    Highcharts.chart('pie_chart_graph', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor: '#343339'
        },
        credits: {
            enabled: false
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                showInLegend: true
            }
        },
        legend: {
            itemStyle: {
                color: "white",
            }
        },
        series: [{
            name: 'Users',
            colorByPoint: true,
            data: pie_chart_graph
        }]
    });

    
};
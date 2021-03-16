import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Line,
    data: function() {
        return {
            datacollection: {
                labels: [],
                datasets: [{ 
                    label: "West",
                    type: "line",
                    borderColor: "#5E60A5",
                    data: [],
                    fill: false
                }, {
                    label: "National",
                    type: "line",
                    borderColor: "#B599D1",
                    data: [],
                    fill: false
                }, {
                    label: "East",
                    type: "line",
                    borderColor: "#9989E0",
                    data: [],
                    fill: false
                }, {
                    label: "Central",
                    type: "line",
                    borderColor: "#C8A2B2",
                    data: [],
                    fill: false
                }, {
                    label: "South",
                    type: "line",
                    borderColor: "#4490B0",
                    data: [],
                    fill: false
                }, {
                    label: "North",
                    type: "line",
                    borderColor: "#A5DCE5",
                    data: [],
                    fill: false
                }]
            },
            options: {
                legend: { display: true },
                title: {
                  display: true,
                  text: 'PSI Twenty Four Hourly (By Region)'
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes:[{
                        ticks:{
                            precision: 0
                        }
                    }]
                }
            }
        }
    },
    methods: {
        fetchItems: function () {
            axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
            .then(response => {
                //console.log(response.data.items)
                response.data.items.forEach(data => { 
                    console.log("hello!")
                    console.log(data)
                    this.datacollection.labels.push(data.timestamp) //x axis
                    this.datacollection.datasets[0].data.push(data.readings.psi_twenty_four_hourly.west)
                    this.datacollection.datasets[1].data.push(data.readings.psi_twenty_four_hourly.national)
                    this.datacollection.datasets[2].data.push(data.readings.psi_twenty_four_hourly.east)
                    this.datacollection.datasets[3].data.push(data.readings.psi_twenty_four_hourly.central)
                    this.datacollection.datasets[4].data.push(data.readings.psi_twenty_four_hourly.south)
                    this.datacollection.datasets[5].data.push(data.readings.psi_twenty_four_hourly.north)
                })
                this.renderChart(this.datacollection, this.options)
            })
        }
    }, 
    created() {
        this.fetchItems()
    }
}
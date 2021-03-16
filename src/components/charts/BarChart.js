import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
    extends: Bar,
    data: function() {
        return {
            storage: {}, //{"Tofu":12,"Bread":5,...}
            datacollection: {
                label: [],
                datasets: [{
                    label: "Total Orders",
                    backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850", "#ECE4C4"],
                    data: []
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: 'Total Number of each dish'
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes:[{
                        ticks:{
                            min:0,
                            precision: 0


                        
                        }
                    }]
                }
                
            }
        }
    },
    methods: {
        fetchItems: function () {
            database.collection('orders').get().then(snapshot => {
                snapshot.docs.forEach(doc => { //iterate through each Order
                    var order = Object.values(doc.data())
                    for (var i=0; i<order.length; i++) {
                        var item = order[i]; 
                        if (item[0] in this.storage) {
                            this.storage[item[0]] += item[1];
                        } else {
                            this.storage[item[0]] = item[1];
                        }
                    }
                })
            }).then(() => {
                this.datacollection.labels = Object.keys(this.storage)
                this.datacollection.datasets[0].data = Object.values(this.storage)
                this.renderChart(this.datacollection, this.options)
            })
        }
      },
      created () {
        this.fetchItems()
      }
}
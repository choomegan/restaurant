<template> 
    <div> 
        <h2>Menu:</h2> 
        <ul> 
            <li v-for= "item in itemsSelected" :key="item">
                {{item[0]}} x {{item[1]}}
            </li> 
        </ul>
        <button id="total" v-on:click="calcTotal(); sendOrder()">Calculate Total</button> 
        <p id = "subtotal" v-show="showTotal">Subtotal: ${{subtotal}}</p>
        <p id = "grand" v-show="showTotal">Grand Total: ${{grandTotal}}</p>
    </div> 
</template> 

<script> 
import database from '../firebase.js'

export default {
    data() {
        return {
            showTotal: false,
            subtotal: 0,
            grandTotal:0 
        }
    },
    props: ['itemsSelected'],
    methods: {
        calcTotal: function() {
            this.subtotal = 0;
            this.showTotal = true;
            var item;
            for(item of this.itemsSelected) {
                this.subtotal += item[1] * item[2];
            }
        },
        sendOrder: function() {
            let order = {};
            for (let i=0; i<this.itemsSelected.length; i++) {
                order[i] = this.itemsSelected[i]; //item in itemsSelected is an array
            }

            if (Object.keys(order).length > 0) { //return list of keys and find length
                database.collection("orders").add(
                    order
                ).then(() => {
                    location.reload();
                })
            }
            
        }                                                               
    },
    watch: {
        subtotal: function() {
            this.grandTotal = (this.subtotal * 1.07).toFixed(2);
        }
    }
}
</script> 

<style> 
    div {
        font-family: Avenir;
    }
    
    #total {
        display: inline-block;
        width: 120px;
        height: 30px;
        background-color: #F7CCCC;
    } 

    li {
        text-align: left;
        font-size: 20px;
        padding: 10px;
    }

    h2 {
        text-align: left;
    }

    #grand,#subtotal {
        text-align: left;
        font-size: 20px
    }
</style> 




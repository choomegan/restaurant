<template>
    <div id="itemsList"> 
        <ul>
            <li><router-link to="/" exact>Home</router-link></li> 
            <li><router-link to="/orders" exact>Orders</router-link></li> 
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </ul> 
        <ul> 
            <li v-for = "item in items" :key = "item"> 
                <h1 id="itemName">{{item.name}}</h1>
                <img v-bind:src=item.imageURL>
                <p id = "price">${{item.price}}</p>
                <QuantityCounter v-on:counter="onCounter" v-bind:item = "item"></QuantityCounter> 
                <br> 
            </li> 
        </ul> 
        <Basket id = "shoppingBasket" v-bind:itemsSelected = "itemsSelected"></Basket> 
    </div> 
</template>

<script>
import QuantityCounter from './QuantityCounter'
import Basket from './Basket'
import database from '../firebase.js'

export default {

    components: {
        QuantityCounter,
        Basket
    }, 
    data() {
        return {
            itemsSelected:[],
            items:[]
        }
    },
    methods: {
        onCounter: function (item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
            //If there is nothing in items selected, push the ORDER in
            this.itemsSelected.push([item.name, count, item.price]);
            } else {
                // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];
                    // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                    if(item_name === item.name && count > 0) {
                        this.itemsSelected.splice(i,1);
                        return this.itemsSelected.splice(i,0,[item.name, count, item.price])
                    }
                    // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                    else if (item_name === item.name && count == 0) {
                        return this.itemsSelected.splice(i,1)
                    } else {
                        continue
                    }
                    // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                }
                if (count>0)  {
                    return this.itemsSelected.push([item.name, count, item.price])
                }
                
            }
        },
        // gets all dishes from menu collection, pushes it into data property 'items'
        fetchItems: function() {
          database.collection('menu').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
              this.items.push(doc.data())
            });
          });
        }

    },
    created() {
      this.fetchItems()
    }
  }
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  font-family: Avenir;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 3px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>
<template>
    <div>
        <div v-for="(item, index) in datapacket" :key="index">
            <p>{{item[0]}}: {{item[1]}}</p>
            <input :id="index" placeholder=0 type="number" min="0"/>
        </div><br>
        <button type="button" v-on:click="updateOrder()">Update Order</button>
    </div>
</template>
<script>
import database from '../firebase';

export default {
    name: "Modify",
    data() {
        return {
            datapacket: null,
            datacopy: null
        }
    },
    methods: {
        fetchItems: function() {
            database.collection("orders").doc(this.$route.params.id).get().then((snapshot) => {
                this.datapacket = snapshot.data();
                this.datacopy = snapshot.data();
            })
        }, updateOrder: function() {
            var i;
            for (i=0; i<Object.keys(this.datapacket).length; i++) {
                this.datacopy[i][1] = parseInt(document.getElementById(i).value);
            }
            database.collection("orders").doc(this.$route.params.id).set(this.datacopy).then(() => 
                this.$router.push({ path: '/orders' })
            )
            
        }
    },
    created() {
        this.fetchItems()
    }
}
</script>
<style scoped>
button {
    font-family: Avenir;
    height: 40px;
    width: 100px;
    padding: 5px;
    border-radius: 8px;
    font-size: 12px;
    color: black; 
    background-color: #F7CCCC;

}
div {
    font-family: Avenir;
}
</style>
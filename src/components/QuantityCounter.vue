<template> 
    <div id = "main"> 

        <span>
            <button id = "add" v-on:click = "decrement()"> - </button> 
        </span> 

        <span> {{counter}} </span> 

        <span>
            <button id = "sub" v-on:click = "increment()" > + </button> 
        </span> 

    </div> 
</template> 

<script> 
    export default {
        data() {
            return {
                counter: 0
            }
        },
        props : ['item'],
        methods: {
            increment: function() {
                if(this.counter >= 10) {
                    window.alert("You cannot buy more than 10 items.");
                } else {
                    this.counter++;
                    this.$emit('counter', this.item, this.counter)
                }
            },
            decrement: function() {
                if(this.counter > 0) {
                    this.counter--;
                    this.$emit('counter', this.item, this.counter)
                }
            }
        }

    }
</script> 

<style> 
#main {
    font-size: 40px;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
#add, #sub {
    display: inline-block;
    height: 70px;
    width: 70px;
    border-radius: 8px;
    font-size: 40px;
    color: black; 
    background-color: #F7CCCC;
    margin-left: 10px;
    margin-right: 10px;
}

</style> 
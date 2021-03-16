<template> 
    <div> 
        <h1>Bar Chart</h1> 
        <chart></chart> 

    </div>
</template> 

<script> 
import Chart from './BarChart.js'

export default {
    components: {
        Chart
    }
}
</script> 

<style scoped> 
h1 {
    color: white;
    background-color: rgb(202, 188, 169);
    text-align: center;
    padding: 20px;
}
</style> 
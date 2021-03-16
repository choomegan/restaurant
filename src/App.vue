<template>
  <div> 
    <h1 id = "head">Food Galore</h1> 
    <router-view></router-view>
  </div> 
</template>

<script>
//import PageContent from './components/PageContent.vue'

export default {
  name: 'App',
  components: {
    //'PgCont':PageContent
  },
  data () {
    return {
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#head {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: rgb(133, 159, 180);
  font-size: 40px;
  padding: 40px;
  color: white;
  text-align: center;
}
</style>

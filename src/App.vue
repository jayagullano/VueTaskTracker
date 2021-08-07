<template>
  <div class="mainApp">
    <Header title="Task Tracker"
      @toggle-add-task="toggleAddTask"
      :showAddTask="showAddTask"/>

    <router-view :showAddTask="showAddTask"></router-view>
    <Footer />    
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data(){
    return {
      showAddTask: false
    }
  },
  methods: {
    toggleAddTask(){
      this.showAddTask = !this.showAddTask; //Toggles from false to true
    }
  }
}
</script>

<style>
.mainApp {
  align-items: center;
  display: block;
  justify-content: center;
  margin-top: 10px;
}

Header {
  border: 2px solid gold;
  padding-left: 20px;
  padding-right: 20px;
}

.btn {
  display: inline-block;
  background: black;
  color: #fff;
  border: none;
  padding: 10px 10px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
</style>

<template>
  <div class="mainApp">
    <Header title="Task Tracker"
      @toggle-add-task="toggleAddTask"
      :showAddTask="showAddTask"/>

    <div v-show="showAddTask">
      <AddTask 
        @add-task="addTask"/>
    </div>
    
    <Tasks 
      @delete-task="deleteTask"
      @toggle-reminder="toggleReminder" 
      :tasks="tasks" />

    <router-view></router-view>
    <Footer />    
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Tasks from './components/Tasks.vue';
import AddTask from './components/AddTask.vue';

export default {
  name: 'App',
  components: {
    Header,
    Tasks,
    AddTask,
    Footer
  },
  data(){
    return {
      tasks: [],
      showAddTask: false
    }
  },
  methods: {
    toggleAddTask(){
      this.showAddTask = !this.showAddTask; //Toggles from false to true
    },
    async addTask(task){
      //task = {...task, id: this.tasks.length+1}; //POSTs default increment the id

      const res = await fetch('api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(task)
      });

      const data = await res.json(); 
      
      this.tasks = [...this.tasks, data]; //Appends new object to array
    },
    async deleteTask(id){
      //console.log('task:',id);

      if(confirm('Are you sure you want to delete?')){
        const res = await fetch(`api/tasks/${id}`, {
          method: 'DELETE'
        });

        res.status === 200 //Success code 
        ? 
        (this.tasks = this.tasks.filter((task) => {
          return (task.id != id);
        })) 
        : alert('Error when deleting task');

      }
    },
    async toggleReminder(id){
      //Flips reminder boolean for selected id
      const taskToToggle = await this.fetchTask(id);
      const updated = {...taskToToggle, reminder: !taskToToggle.reminder};

      const res = await fetch(`api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(updated)
      });

      const data = await res.json();

      this.tasks = this.tasks.map((task) => {
        if(task.id == id){
          return {...task, reminder: data.reminder}
        }
        return task;
      })
    },
    async fetchTasks(){
      const res = await fetch('api/tasks');
      const data = await res.json();
      return data;
    },
    async fetchTask(id){
      const res = await fetch(`api/tasks/${id}`);
      const data = await res.json();
      return data;
    }
  },
  async created(){
    this.tasks = await this.fetchTasks();
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

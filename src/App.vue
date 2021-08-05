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
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Tasks from './components/Tasks.vue';
import AddTask from './components/AddTask.vue';

export default {
  name: 'App',
  components: {
    Header,
    Tasks,
    AddTask
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
    addTask(task){
      task = {...task, id: this.tasks.length+1}; //Sets the id of the new task
      this.tasks = [...this.tasks, task]; //Appends new object to array
    },
    deleteTask(id){
      //console.log('task:',id);

      if(confirm('Are you sure you want to delete?')){
        this.tasks = this.tasks.filter((task) => {
          return (task.id != id);
        });
      }
    },
    toggleReminder(id){
      //Flips reminder boolean for selected id
      this.tasks = this.tasks.map((task) => {
        if(task.id == id){
          return {...task, reminder: !task.reminder}
        }
        return task;
      })
    },
  },
  created(){
    //When created runs the tasks property is updated.
    //You would typically have an HTTP request to retrieve the data
    //and store it here.
    this.tasks = [
      {
        id:1,
        text:'Doctors Appointment',
        day:'March 1st at 2:30pm',
        reminder: true
      },
      {
        id:2,
        text:'Go to Groceries',
        day:'March 1st at 8:30am',
        reminder: true
      },
      {
        id:3,
        text:'Feed the Dog',
        day:'March 1st at 12:30pm',
        reminder: false
      }
    ];

    console.log(this.tasks);
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

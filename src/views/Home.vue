<template>
    <div v-show="showAddTask">
      <AddTask 
        @add-task="addTask"/>
    </div>
    
    <Tasks 
      @delete-task="deleteTask"
      @toggle-reminder="toggleReminder" 
      :tasks="tasks" />
</template>

<script>
import Tasks from '../components/Tasks.vue';
import AddTask from '../components/AddTask.vue';

export default {
    name: 'Home',
    components: {
        Tasks,
        AddTask
    },
    props: {
        showAddTask: Boolean
    },
    data() {
        return {
            tasks: [],
        }
    },
   methods: {
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
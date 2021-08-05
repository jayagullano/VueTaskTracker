<template>
    <header>
        <h1>{{title}}</h1>
        <div>
            <Button 
                @btn-click="$emit('toggle-add-task')" 
                class="btn" 
                :text="(showAddTask ? 'Close Add Task' : 'Add Task')" 
                :color="(showAddTask ? 'red' : 'gold')"/>
            <Button class="btn" text="Update Task" color="blue"/>
        </div>
    </header>
</template>

<script>
import Button from './Button.vue';

export default {
    name: 'Header',
    props: {
        title: String,
        showAddTask: Boolean
    }, 
    components: {
        Button
    }, 
    emits: ['toggle-add-task']
}
</script>

<!-- Scoped means CSS applies only to this module -->
<style scoped>
header {
    display: flex;   
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
</style>


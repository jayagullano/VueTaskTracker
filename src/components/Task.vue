<template>
    <div 
        @dblclick="$emit('toggle-reminder', task.id)" 
        :class="[task.reminder ? 'reminder' : 'task', 'task']">
        <h2>
            {{task.text}}
            <i @click="$emit('delete-task', task.id)" class="fas fa-times"></i>
        </h2>
        <p>{{task.day}}</p>
    </div>
</template>

<script>
export default {
    name: 'Task',
    props: {
        task: Object
    },
    emits: ['delete-task', 'toggle-reminder']
}
</script>

<style scoped>
    .task{
        background: #f4f4f4;
        margin: 5px;
        padding: 10px 20px;
        cursor: pointer;
    }

    .task.reminder {
        border-left: 6px solid gold;
    }

    .task h2 {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    i:hover {
        color: red;
    }
</style>

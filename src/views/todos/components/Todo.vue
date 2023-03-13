<template>
    <div>
        <input type="checkbox" :checked="completed" @change="toggleStatus">
        
        {{ todo.title }} - {{ todo.body }}

        <RouterLink :to="{ name: 'todos.edit', params: { id: todo.identify } }">Editar</RouterLink>
        <a href="#" @click.prevent="deleteTodo">Deletar</a>
    </div>
</template>

<script>
import { computed } from 'vue'
import TodoService from '../../../services/todo.service'


    export default {
        name: 'Todo',
        props: {
            todo: {
                require: true,
                type: Object
            }
        },
        setup (props, { emit }) {

            const completed = computed(() => props.todo.completed == 'S')

            const deleteTodo = () => {
                TodoService.deleteTodo(props.todo.identify)
                    .then(() => emit('deleteTodo', props.todo))
            }

            const toggleStatus = () => {
                const todo = props.todo

                todo.completed = completed.value ? 'N' : 'S'

                const params = {
                    name: todo.title,
                    description: todo.body,
                    completed: completed.value
                }

                TodoService.editTodo(params, props.todo.identify)
                    .then(() => emit('updateTodo', todo, props.todo.identify))
            }

            return {
                deleteTodo,
                completed,
                toggleStatus
            }
        }
    }

</script>
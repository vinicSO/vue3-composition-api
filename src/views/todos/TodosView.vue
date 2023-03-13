<template>
    <h1>
        Lista de Tarefas
        <RouterLink :to="{ name: 'todos.create' }">+</RouterLink>
    </h1>

    <div v-if="loading">Carregando as tarefas</div>

    <ul>
        <Todo v-for="todo in todos" :todo="todo" @deleteTodo="deleteTodo" @updateTodo="updateTodo"></Todo>
    </ul>
</template>

<script>
    import { onMounted, ref } from 'vue';
    import TodoService from '@/services/todo.service'
    import Todo from './components/Todo.vue';

    export default {
        name: 'TodosView',
        setup () {

            const todos = ref([])

            const loading = ref(false)
            
            onMounted(() => {

                loading.value = true

                TodoService.getAll()
                    .then(response => todos.value = response.data.data)
                    .catch(error => console.log(error))
                    .finally(() => loading.value = false)
            })

            const deleteTodo = (todo) => {

                todos.value.splice(todos.value.indexOf(todo), 1)
            }

            const updateTodo = (todo, id) => {

                todos.value = todos.value.map(t => {
                    if (t.identify == id) {
                        todo.identify = id

                        return todo
                    }

                    return t;
                })
            }
            
            return {
                todos,
                loading,
                deleteTodo,
                updateTodo
            }
        },
        components: {
            Todo,
        }
    }
</script>

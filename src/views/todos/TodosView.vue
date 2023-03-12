<template>
    <h1>
        Lista de Tarefas
        <RouterLink :to="{ name: 'todos.create' }">+</RouterLink>
    </h1>

    <div v-if="loading">Carregando as tarefas</div>

    <ul>
        <li v-for="todo in todos" :key="todo.identify">{{ todo.title }}</li>
    </ul>
</template>

<script>
    import { onMounted, ref } from 'vue';
    import TodoService from '@/services/todo.service'

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
            
            return {
                todos,
                loading,
            }
        }
    }
</script>

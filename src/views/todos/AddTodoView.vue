<template>
    <div>
        <h1>Adicionar Nova Tarefa</h1>
        <form action="@" @submit.prevent="addTodo">
            <input type="text" name="title" id="title" placeholder="Título" v-model="todo.name">
            <input type="text" name="description" id="description" placeholder="Descrição" v-model="todo.description">
            <button type="submit" :disabled="todo.loading">
                <span v-if="todo.loading">Enviando</span>
                <span v-else>Enviar</span>
            </button>
        </form>
    </div>
</template>

<script>
    import { reactive } from 'vue';
    import router from '@/router';
    import TodoService from '@/services/todo.service';

    export default {
        name: 'AddTodoView',
        setup () {

            const todo = reactive({
                name: '',
                description: '',
                completed: false,
                loading: false
            })

            const addTodo = () => {

                todo.loading = true

                TodoService.addTodo({...todo})
                    .then(() => router.push({ name: 'todos.index'}))
                    .finally(() => todo.loading = false)
            }

            return {
                addTodo,
                todo
            }
        }
    }
</script>
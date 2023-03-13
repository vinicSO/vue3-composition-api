<template>
    <div>
        <h1>Editar Tarefa</h1>
        <form action="@" @submit.prevent="editTodo">
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
    import { reactive, onMounted } from 'vue';
    import router from '@/router';
    import TodoService from '@/services/todo.service';

    export default {
        name: 'EditTodoView',
        props: {
            id: {
                require: true
            }
        },
        setup (props) {

            const todo = reactive({
                name: '',
                description: '',
                completed: false,
                loading: false
            })

            onMounted( async () => {

                todo.loading = true

                TodoService.getTodo(props.id)
                    .then(response => {
                        const todoR = response.data.data

                        todo.name = todoR.title
                        todo.description = todoR.body
                        todo.completed = todoR.completed == 'S'
                    })
                    .finally(() => todo.loading = false)
            })

            const editTodo = () => {

                todo.loading = true

                TodoService.editTodo({...todo}, props.id)
                    .then(() => router.push({ name: 'todos.index'}))
                    .finally(() => todo.loading = false)
            }

            return {
                editTodo,
                todo
            }
        }
    }
</script>
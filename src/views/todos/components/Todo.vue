<template>
    <div>
        {{ todo.title }} - {{ todo.body }}

        <RouterLink :to="{ name: 'todos.edit', params: { id: todo.identify } }">Editar</RouterLink>
    </div>
</template>

<script>

    export default {
        name: 'Todo',
        props: {
            todo: {
                require: true,
                type: Object
            }
        }
    }

</script>
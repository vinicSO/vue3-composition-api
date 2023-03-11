import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue' 
import TodosView from '@/views/todos/TodosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/todos',
      name: 'todos.index',
      component: TodosView
    }
  ]
})

export default router

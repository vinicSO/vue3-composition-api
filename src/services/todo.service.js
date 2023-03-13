import axios from "axios";

export default class TodoService {

    static async getAll () {

        return axios.get('/todos')
    }

    static async addTodo (params) {
        
        return axios.post('/todos', params)
    }

    static async editTodo (params, id) {
        
        return axios.put(`/todos/${id}`, params)
    }

    static async getTodo (id) {

        return axios.get(`/todos/${id}`)
    }

    static async deleteTodo (id) {

        return axios.delete(`/todos/${id}`)
    }
}
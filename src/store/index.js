import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './module/moduleA'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    a: moduleA
  },
  state: {
    todos: [
      { id: 1, desc: 'test1', done: false },
      { id: 2, desc: 'test2', done: true },
      { id: 3, desc: 'test3', done: false }
    ]
  },
  getters: {
    maxTodoId (state) {
      return state.todos.sort((a, b) => { return b.id - a.id })[0].id
    },
    doneTodoCount (state) {
      return state.todos.filter(todo => todo.done === true).length
    },
    getTodoBySearch: (state) => (s) => {
      return state.todos.filter(todo => {
        return (todo.id + todo.desc).indexOf(s) >= 0
      })
    }
  },
  mutations: {
    addTodo (state, desc) {
      const maxTodoId = state.todos.sort((a, b) => { return b.id - a.id })[0].id
      const todo = {
        desc,
        id: maxTodoId + 1,
        done: false
      }
      state.todos.push(todo)
    },
    doneTodo (state, payload) {
      state.todos.forEach(todo => {
        if (todo.id === payload.id) todo.done = payload.done
      })
    }
  },
  actions: {
    addTodo (context) {
      // 可以通过context参数去调用commit，获取state和getters
      // context区别于state（module中会讲到
      setTimeout(() => {
        context.commit('addTodo')
        // context.state
        // context.getters
      }, 1000)
    },
    addTodo2 ({ commit, state, getters }, payload) {
      // 也可以直接用参数解构的方法获取commit，state，getters
      setTimeout(() => {
        commit('addTodo')
      }, 1000)
    }
    // async actionA ({ commit }) {
    //   commit('gotData', await getData())
    // },
    // async actionB ({ commit, dispatch }) {
    //   await dispatch('actionA')
    //   commit('gotOtherData', await getOtherData())
    // }
  }
})

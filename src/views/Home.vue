<template>
  <div id="home">
    <h1>ToDo App</h1>
    <input type="text" v-model="model.desc" placeholder="输入待办项" @keyup="addTodo"/>
    <div>总待办数：{{todos.length}}</div>
    <div>已完成待办数：{{doneTodoCount}}</div>
    <ul class='todo-box'>
      <li v-for="todo in todos"
        :key="todo.id"
        :class="`todo-li ${todo.done ? 'done' : ''}`">
        <input type="checkbox" :data-id="todo.id" @change="doneTodo" :checked="todo.done">
        <span>{{todo.id + ' : ' + todo.desc}}</span>
      </li>
    </ul>
    <input type="text" v-model="model.search" placeholder="搜索" @keyup.stop="searchTodo"/>
    <ul class='todo-box'>
      <li v-for="todo in searchTodos"
        :key="todo.id"
        :class="`todo-li ${todo.done ? 'done' : ''}`">
        <span>{{todo.id + ' : ' + todo.desc}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      model: {
        desc: '',
        search: ''
      },
      searchTodos: []
    }
  },
  computed: {
    ...mapState(['todos']),
    ...mapGetters(['doneTodoCount'])
  },
  methods: {
    addTodo (e) {
      if (e.keyCode === 13 && this.model.desc) {
        this.$store.commit('addTodo', this.model.desc)
        this.model.desc = ''
      }

      // this.$store.dispatch('addTodo', payload)
      // this.$store.dispatch({
      //   type: 'addTodo',
      //   ...payload
      // })
    },
    doneTodo (e) {
      const id = e.target.attributes['data-id'].value * 1
      const done = e.target.checked
      this.$store.commit('doneTodo', { id, done })
    },
    searchTodo (e) {
      debugger
      console.log(this.model.search)
      if (this.model.search) {
        this.searchTodos = this.$store.getters.getTodoBySearch(this.model.search)
      } else {
        this.searchTodos = []
      }
    }
  }
}
</script>
<style lang="less">
#home{
  width:200px;
  margin:0 auto;
  .todo-box{
    padding-left:0;
    .todo-li{
      text-align: left;
      list-style: none;
      &.done{
        text-decoration: line-through;
      }
    }
  }
}
</style>

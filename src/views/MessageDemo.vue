<template>
  <div>
    <button @click="showInfoMsg">消息message</button>
    <button @click="showSuccessMsg">成功message</button>
    <button @click="showWarnMsg">警示message</button>
    <button @click="showErrorMsg">错误message</button>
    <button @click="showVNodeMsg">显示 vnode message</button>
    <button @click="showHtmlMsg">显示 html message</button>
    <button @click="hideAllMsg">隐藏所有message</button>
  </div>
</template>

<script>
export default{
  name: 'message-demo',
  components: {},
  props: {},
  data () {
    return {
      msgers: []
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showInfoMsg () {
      this.msgers.push(this.$message('hello you'))
    },
    showSuccessMsg () {
      this.msgers.push(this.$message({
        message: 'hello you,duration:1s,center',
        type: 'success',
        showClose: true,
        duration: 1000,
        center: true,
        offset: 10,
        onClose: function () {
          console.log('closed')
        }
      }))
    },
    showWarnMsg () {
      this.msgers.push(this.$message({
        message: 'hello you',
        type: 'warning'
      }))
    },
    showErrorMsg () {
      this.msgers.push(this.$message({
        message: 'hello you',
        type: 'error'
      }))
    },
    showVNodeMsg () {
      const h = this.$createElement
      this.msgers.push(this.$message(h('p', null, [
        h('span', null, '内容可以是 '),
        h('i', { style: 'color: teal' }, 'VNode')
      ])))
    },
    showHtmlMsg () {
      this.msgers.push(this.$message({
        dangerouslyUseHTMLString: true,
        message: '<div>这是html div标签</div>'
      }))
    },
    hideAllMsg () {
      this.msgers.forEach(i => i.close())
    }
  }
}
</script>
<style scoped>
</style>

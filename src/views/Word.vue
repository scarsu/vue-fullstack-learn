<template>
  <div>
    <form style="width:400px;margin:0 auto;">
      <fieldset class="italic" style="text-align: left;">
        <legend>Submit</legend>
        <span style="width:100px;display: inline-block;margin-bottom:5px;">word:</span>
        <input v-model="model.en" type="text" name="en" id="input_en"><br>
        <span style="width:100px;display: inline-block;margin-bottom:5px;">description:</span>
        <input v-model="model.cn" type="text" name="cn" id="input_cn"><br>
        <button @click.prevent="submitWord" class="submit-btn">Submit</button>
      </fieldset>
    </form>
    <form style="width:400px;margin:0 auto;">
      <fieldset class="italic" style="text-align: left;">
        <legend>Query</legend>
        <input v-model="model.query" type="text" name="query" style="width:230px"><br>
        <button @click.prevent="resetQuery" class="reset-btn">Reset</button>
        <button @click.prevent="getWords" class="query-btn">Query</button>
      </fieldset>
    </form>
    <table style="width:396px;margin:10px auto;border: 2px solid #888;">
      <tr>
        <th>word</th>
        <th>description</th>
        <!-- <th>id</th> -->
        <th>version</th>
        <th>options</th>
      </tr>
      <tr v-for="word in words" :key="word.en" :data-id="word._id">
        <td>{{word.en}}</td>
        <td>{{word.cn}}</td>
        <!-- <td>{{word._id}}</td> -->
        <td>{{word.__v + 1}}</td>
        <td @click="deleteWord" class="delete-btn">Delete</td>
      </tr>
  </table>
  </div>
</template>

<script>
export default {
  name: 'word',
  components: {},
  data () {
    return {
      words: [],
      model: {
        en: '',
        cn: '',
        query: ''
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getWords()
  },
  mounted () {},
  methods: {
    resetQuery () {
      this.model.query = ''
    },
    getWords () {
      const _this = this
      this.$axios.get(`/words?s=${_this.model.query}`)
        .then(function (response) {
          _this.words = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    deleteWord (e) {
      const _this = this
      const id = e.currentTarget.parentElement.dataset.id
      this.$confirm('Sure?', 'Confirm', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'error'
      }).then(() => {
        debugger
        this.$axios.delete(`/words?id=${id}`)
          .then(response => {
            if (response.data.success) {
              _this.$message({
                message: response.data.message,
                type: 'success'
              })
              _this.getWords()
            } else {
              _this.$message({
                message: `Oops,${response.data.message}`,
                type: 'error'
              })
            }
          })
          .catch(error => {
            console.log(error)
            _this.$message({
              message: error,
              type: 'error'
            })
          })
      })
    },
    submitWord () {
      const _this = this
      this.$axios.post('/words', {
        en: _this.model.en,
        cn: _this.model.cn
      })
        .then(function (response) {
          if (response.data.success) {
            _this.$message({
              message: response.data.message,
              type: 'success'
            })
            _this.model.en = ''
            _this.model.cn = ''
            _this.getWords()
          } else {
            _this.$message({
              message: `Oops😆,${response.data.message}`,
              type: 'error'
            })
          }
        })
        .catch(function (error) {
          _this.$message({
            message: error,
            type: 'error'
          })
        })
    }
  }
}
</script>
<style lang="less" scoped>
fieldset{
  position: relative;
}
th{
  background: #999;
  color: #fff;
}
td {
  border-bottom: 1px solid #eee;
}
button[class*='-btn']{
  cursor: pointer;
  background: transparent;
  border: 1px solid #999;
  border-radius: 4px;
  &:hover{
    background-color:#eee;
  }
}
.submit-btn{
  position: absolute;
  right: 10px;
  top: 21px;
  width: 80px;
  height: 46px;
}
.query-btn{
  position: absolute;
  right:10px;
  top:22px;
}
.reset-btn{
  position: absolute;
  right:70px;
  top:22px;
}
.italic{
  font-style: italic;
}
.delete-btn{
  cursor: pointer;
  font-size: 0.9em;
  &:hover{
    background-color:red;
    color:#fff;
    font-weight:bold;
  }
}
</style>

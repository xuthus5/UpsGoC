<template>
  <div class="hello">
    <h2>{{ msg }}</h2>
    <p>
      UpsGo是一个基于 Go+Vue 开发的又拍云 对象存储 服务管理应用
    </p>
    <h3>Install Service</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">UpsGo</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">UpsGo-web</a></li>
    </ul>
    <h3>Use it</h3>
    <ul>
      <li><router-link :to="{name:'SignIn'}" target="_blank" rel="noopener">Sign In</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

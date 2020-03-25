<template>
  <div class="home mt-5">
    <img alt="UpsGo logo" src="/images/logo.png">
    <HelloWorld msg="Upyun Storage Management Application"/>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

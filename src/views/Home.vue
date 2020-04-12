<template>
  <div class="Index">
    <div class="jumbotron jumbotron-fullheight jumbo-vertical-center text-light text-center bg-dark mb-0 radius-0">
      <div class="container">
        <img src="/images/logo.png" alt="logo">
        <h1 class="display-2 text-light text-uppercase">Hello UpsGo</h1>
        <span class="lead lead-lg">Upyun Storage Management Application.</span>
        <div class="mt-4">
          <a href="https://github.com/xuthus5/UpsGo" class="btn btn-danger btn-lg m-2 btn-wide">
            <span>Github</span>
          </a>
          <router-link :to="{name:'SignIn'}" class="btn btn-outline-light btn-hover-text-dark btn-wide btn-lg m-2">
            <span>Demo</span>
          </router-link>
        </div>
      </div>
    </div>

    <div class="container py-5">
      <h1>Thanks</h1>
      <p>Thank you for using this program. UpsGo is an Upyun object storage service management application based on go + Vue, please open an issue on GitHub:<br>
        <a href="https://github.com/xuthus5/UpsGo">https://github.com/xuthus5/UpsGo</a></p>
    </div>

  </div>

</template>

<script>
  export default {

  }
</script>

<style>
  @import "../assets/css/bootstrap4-hello-world.min.css";
  @import "https://fonts.googleapis.com/css?family=Fredoka+One|Roboto:300,400";
  @import "https://cdn.bootcss.com/font-awesome/5.13.0/css/all.min.css";
</style>
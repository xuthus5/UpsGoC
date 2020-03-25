<template>
    <div class="signin my-login-page">
        <section class="h-100">
            <div class="container h-100">
                <div class="row justify-content-md-center h-100">
                    <div class="card-wrapper mt-5">
                        <div class="card fat">
                            <div class="card-body">
                                <h4 class="card-title">Login</h4>
                                <form method="POST" class="my-login-validation" novalidate="">
                                    <div class="form-group">
                                        <label for="email">Username</label>
                                        <input id="email" type="text" class="form-control" name="email" v-model="username" required autofocus>
                                    </div>

                                    <div class="form-group">
                                        <label for="password">Password</label>
                                        <input id="password" type="password" class="form-control" name="password" v-model="password" required>
                                    </div>

                                    <div class="form-group m-0">
                                        <button type="button" class="btn btn-primary btn-block" @click="signIn">
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "signin",
        data() {
            return {
                username: "",
                password: ""
            };
        },
        methods: {
            signIn() {
                if (this.username === "" || this.password === "") {
                    alert('输入项不能为空!');
                    return;
                }
                let param = new URLSearchParams({
                    username: this.username,
                    password: this.password
                });
                this.http
                    .post(this.server +"/api/user/signin", param)
                    .then(response => {
                        //存储token
                        localStorage.setItem("_token",response.data.message);
                        //跳转到后台
                        this.$router.push({
                            path: this.redirect || "/admin/index"
                        });
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            }
        }
    };
</script>

<style>
    html,body {
        height: 100%;
    }

    .my-login-page {
        background-color: #f7f9fb;
        font-size: 14px;
        height: 100%;
    }

    .my-login-page .brand {
        width: 90px;
        height: 90px;
        overflow: hidden;
        border-radius: 50%;
        margin: 40px auto;
        box-shadow: 0 4px 8px rgba(0,0,0,.05);
        position: relative;
        z-index: 1;
    }

    .my-login-page .brand img {
        width: 100%;
    }

    .my-login-page .card-wrapper {
        width: 400px;
    }

    .my-login-page .card {
        border-color: transparent;
        box-shadow: 0 4px 8px rgba(0,0,0,.05);
    }

    .my-login-page .card.fat {
        padding: 10px;
    }

    .my-login-page .card .card-title {
        margin-bottom: 30px;
    }

    .my-login-page .form-control {
        border-width: 2.3px;
    }

    .my-login-page .form-group label {
        width: 100%;
    }

    .my-login-page .btn.btn-block {
        padding: 12px 10px;
    }

    .my-login-page .footer {
        margin: 40px 0;
        color: #888;
        text-align: center;
    }

    @media screen and (max-width: 425px) {
        .my-login-page .card-wrapper {
            width: 90%;
            margin: 0 auto;
        }
    }

    @media screen and (max-width: 320px) {
        .my-login-page .card.fat {
            padding: 0;
        }

        .my-login-page .card.fat .card-body {
            padding: 15px;
        }
    }
</style>
<!-- 普通用户用NAV -->
<template>
    <div class="dash-nav dash-nav-dark">
        <header>
            <a href="#!" class="menu-toggle">
                <i class="fas fa-bars"></i>
            </a>
            <router-link :to="{name:'Home'}" class="spur-logo"><i class="fas fa-bolt"></i> <span>UpsGo</span></router-link>
        </header>
        <nav class="dash-nav-list">
            <a href="" class="dash-nav-item">
                <i class="fab fa-github-alt"></i> GitHub </a>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'dash-nav',
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>
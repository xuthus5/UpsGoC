<template>
    <div class="dash-header">
        <header class="dash-toolbar">
            <a href="#!" class="menu-toggle">
                <i class="fas fa-bars"></i>
            </a>
            <div class="tools">
                <router-link :to="{name:'SignOut'}" class="tools-item">
                    <i class="fas fa-sign-out-alt"></i>
                </router-link>
            </div>
        </header>
    </div>
</template>

<script>
    export default {
        name: 'dash-header',
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>
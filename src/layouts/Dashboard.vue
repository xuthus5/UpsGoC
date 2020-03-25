<template>
    <div class="dash">
        <dash-nav></dash-nav>
        <div class="dash-app">
            <dash-header></dash-header>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/js/bootstrap.min.js'
    import DashNav from "../components/DashNav";
    import DashHeader from "../components/DashHeader";

    export default {
        name: "dashboard",
        data() {
            return {
            };
        },
        components: {
            DashNav,
            DashHeader
        },
        created() {
            const mobileBreakpoint = window.matchMedia("(max-width: 991px )");
            $(document).ready(function(){
                $(".dash-nav-dropdown-toggle").click(function(){
                    $(this).closest(".dash-nav-dropdown")
                        .toggleClass("show")
                        .find(".dash-nav-dropdown")
                        .removeClass("show");

                    $(this).parent()
                        .siblings()
                        .removeClass("show");
                });

                $(".menu-toggle").click(function(){
                    if (mobileBreakpoint.matches) {
                        $(".dash-nav").toggleClass("mobile-show");
                    } else {
                        $(".dash").toggleClass("dash-compact");
                    }
                });

                $(".searchbox-toggle").click(function(){
                    $(".searchbox").toggleClass("show");
                });
            });
        },
        methods: {
        }
    };
</script>

<style scoped>
    @import '~@/assets/css/spur.min.css';
</style>
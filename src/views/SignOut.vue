<template>
    <div class="signout">

    </div>
</template>

<script>
    export default {
        name: "signout",
        data() {
            return {

            };
        },
        methods: {

        },
        created() {
            localStorage.clear();
            this.$router.push({name:'Home'})
        }
    };
</script>
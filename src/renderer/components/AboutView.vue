<template lang="pug">
    v-layout#wrapper(row wrap justify-center)
        v-flex(xs10 mt-4)
            v-card
                v-card-title(headline) WriteStorm
                v-divider
                v-card-text What is WriteStorm? I guess we'll find out later.
</template>

<script>
    export default {
        name: "AboutView",
        methods: {
            open(link) {
                this.$electron.shell.openExternal(link)
            }
        }
    }
</script>

<style scoped>

</style>
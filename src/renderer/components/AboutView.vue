<template>
    <v-layout row wrap justify-center id="wrapper">
        <v-flex xs10 class="mt-4">
            <v-card>
                <v-card-title class="headline">WriteStorm</v-card-title>
                <v-divider></v-divider>
                <v-card-text>What is WriteStorm? I guess we'll find out later.</v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
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
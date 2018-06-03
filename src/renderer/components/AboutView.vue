<template>
    <v-layout row wrap justify-center id="wrapper">
        <v-flex xs10 class="mt-4">
            <v-card>
                <v-card-title class="headline">WriteStorm</v-card-title>
                <v-divider></v-divider>
                <v-card-text>What the hell is WriteStorm?</v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs10 class="mt-4">
            <system-information></system-information>
        </v-flex>
    </v-layout>
</template>

<script>
    import SystemInformation from './WelcomeView/SystemInformation'
    export default {
        name: "AboutView",
        components: { SystemInformation },
        methods: {
            open (link) {
                this.$electron.shell.openExternal(link)
            }
        }
    }
</script>

<style scoped>

</style>
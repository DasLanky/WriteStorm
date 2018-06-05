<template>
    <v-layout row wrap justify-center id="wrapper">
        <v-flex xs10 class="mt-3">
            <v-card>
                <v-card-title class="headline">Settings</v-card-title>
                    <v-spacer></v-spacer>
                <v-layout row wrap class="mt-2 mx-4" justify-content="flex-start">
                    <v-flex xs6>
                        <v-switch label="Welcome Card" v-model="settings.isHelpVisible"
                                  @click.native.stop="saveSettings()"></v-switch>
                    </v-flex>
                    <v-flex xs6>
                        <v-switch label="Scroll" v-model="settings.shouldScroll"
                                  @click.native.stop="saveSettings()"></v-switch>
                    </v-flex>
                    <v-flex xs6>
                        <v-switch label="Dark Theme" v-model="settings.isDark"
                                  @click.native.stop="saveSettings()"></v-switch>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import config from '../../config.js';

    export default {
        name: 'settings',
        store: this.$store,
        computed: {
            settings() {
                return this.$store.state.settings;
            }
        },
        methods: {
            saveSettings() {
                config.saveSettings(this.$store.state.settings);
            }
        }
    }
</script>

<style scoped>

</style>

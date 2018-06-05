<template>
    <v-layout row wrap justify-center id="wrapper">
        <v-flex xs10 mt-3 text-xs-center>
            <v-card>
                <v-card-title class="headline">Profile</v-card-title>
                <v-divider></v-divider>
                <v-layout column wrap class="centered">
                    <v-flex mt-4>
                        <v-avatar size="256">
                            <img src="~@/assets/avatarDefault.jpg" circle>
                        </v-avatar>
                    </v-flex>
                    <v-flex mt-4 px-5>
                        <v-text-field
                                v-model="settings.firstName"
                                name="firstName"
                                id="firstName"
                                v-validate.initial="'required|alpha'"
                                label="First Name"
                                class="name-input"
                                :error-messages="errors.collect('firstName')"
                        />
                    </v-flex>
                    <v-flex px-5>
                        <v-text-field
                                v-model="settings.lastName"
                                name="lastName"
                                id="lastName"
                                v-validate.initial="'required|alpha'"
                                label="Last Name"
                                class="name-input"
                                :error-messages="errors.collect('lastName')"
                        />
                    </v-flex>
                </v-layout>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn primary
                           flat
                           outline
                           @click.native.stop="saveSettings()"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    import config from '../../config.js';

    export default {
        name: 'profile',
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
    .centered {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .name-input {
        max-width: 400px;
    }
</style>

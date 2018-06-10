<template lang="pug">
    v-layout#wrapper(row wrap justify-center)
        v-flex(xs10 mt-3 text-xs-center)
            v-card
                v-card-title(headline) Profile
                v-divider
                v-layout(column wrap centered)
                    v-flex(mt-4)
                        v-avatar(size='256')
                            img(circle src="~@/assets/avatarDefault.jpg")
                    v-flex(mt-4 px-5)
                        v-text-field#firstName(
                            name-input
                            name="firstName"
                            v-model="settings.firstName"
                            v-validate.initial="'required|alpha'"
                            label="First Name"
                            :error-messages="errors.collect('firstName')")
                    v-flex(px-5)
                        v-text-field#lastName(
                            name-input
                            name="lastName"
                            v-model="settings.lastName"
                            v-validate.initial="'required|alpha'"
                            label="Last Name"
                            :error-messages="errors.collect('lastName')")
                v-card-actions
                    v-spacer
                    v-btn(primary flat outline @click.native.stop="saveSettings()") Save
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

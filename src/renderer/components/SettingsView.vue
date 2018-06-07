<template lang="pug">
    v-layout#wrapper(row wrap justify-center)
        v-flex.mt-3(xs10)
            v-card
                v-card-title.headline Settings
                v-spacer
                v-layout.mt-2.mx-4(row wrap justify-content='flex-start')
                    v-flex(xs6)
                        v-switch(label='Welcome Card' v-model='settings.isHelpVisible' @click.native.stop='saveSettings()')
                    v-flex(xs6)
                        v-switch(label='Scroll' v-model='settings.shouldScroll' @click.native.stop='saveSettings()')
                    v-flex(xs6)
                        v-switch(label='Dark Theme' v-model='settings.isDark' @click.native.stop='saveSettings()')

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

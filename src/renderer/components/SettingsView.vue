<template lang="pug">
    v-layout#wrapper(row wrap justify-center)
        v-flex.mt-3(xs10)
            v-card
                v-card-title.headline General Settings
                v-spacer
                v-layout.mt-2.mx-4(row wrap justify-content='flex-start')
                    v-flex(xs6)
                        v-switch(label='Welcome Card' v-model='settings.isHelpVisible' @click.native.stop='saveSettings()')
                    v-flex(xs6)
                        v-switch(label='Scroll' v-model='settings.shouldScroll' @click.native.stop='saveSettings()')
                    v-flex(xs6)
                        v-switch(label='Dark Theme' v-model='settings.isDark' @click.native.stop='saveSettings()')
            v-card
                v-card-title.headline Text Editor
                v-spacer
                v-layout.mt-2.mx-4(row wrap justify-content='flex-start')
                    v-flex(xs12)
                        v-flex(xs4)
                            v-text-field(label='Tab Size' v-model='settings.tabSize')
                    v-flex(xs6)
                        v-switch(label='Line Numbers' v-model='settings.showLineNumber' @click.native.stop='saveSettings()')
                    v-flex(xs6)
                        v-switch(label='Line Wrap' v-model='settings.wrapLines' @click.native.stop='saveSettings()')
                v-card-actions
                    v-btn(@click.native.stop='saveSettings()') Save

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

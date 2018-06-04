<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs10 class="mt-3">
      <v-card>
        <v-card-title class="headline">Settings</v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
            <v-flex xs6>
                <v-switch label="Welcome Card" v-model="settings.isHelpVisible" @click.native.stop="saveSettings()"></v-switch>
            </v-flex>
            <v-flex xs6>
                <v-switch label="Scroll" v-model="settings.shouldScroll" @click.native.stop="saveSettings()"></v-switch>
            </v-flex>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  var config = require('../../config.js');
  export default {
      name: 'settings',
      data: function (){
          return {
              settings: {
                  shouldScroll: true,
                  isHelpVisible: true
              }
          }
      },
      methods: {
          saveSettings () {
              config.saveSettings(this.settings);
          }
      },
      mounted () {
          config.getSettings((err, settings) => {
              this.settings = settings;
          })
      }
  }
</script>

<style scoped>
  .centered
  {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .logo
  {
    max-width: 100%;
  }

  .link-btn
  {
    width: 150px;
  }
</style>

<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs10 class="mt-3">
      <v-card>
        <v-card-title class="headline">Profile</v-card-title>
        <v-divider></v-divider>
          <v-container fluid>
              <v-avatar size="256">
                  <img src="~@/assets/avatarDefault.jpg" circle>
              </v-avatar>
          </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn primary
                 flat
                 @click.native.stop="saveSettings()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
    var config = require('../../config.js');
  export default {
      name: 'profile',
      data: function (){
          return {
              settings: {}
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

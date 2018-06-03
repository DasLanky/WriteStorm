<template>
  <v-card>
    <v-card-title class="headline">
      Technical
    </v-card-title>
    <v-divider></v-divider>
    <v-layout row wrap class="pa-3">
      <v-flex xs12 sm6 md4 class="item">
        <div class="name">Path:</div>
        <div class="value">{{ path }}</div>
      </v-flex>
      <v-flex xs12 sm6 md4 class="item">
        <div class="name">Name:</div>
        <div class="value">{{ name }}</div>
      </v-flex>
      <v-flex xs12 sm6 md4 class="item">
        <div class="name">Vue.js:</div>
        <div class="value">{{ vue }}</div>
      </v-flex>
      <v-flex xs12 sm6 md4 class="item">
        <div class="name">Electron:</div>
        <div class="value">{{ electron }}</div>
      </v-flex>
      <v-flex xs12 sm6 md4 class="item">
        <div class="name">Node:</div>
        <div class="value">{{ node }}</div>
      </v-flex>
      <v-flex xs12 sm6 md4 class="item">
        <div class="name">Platform:</div>
        <div class="value">{{ platform }}</div>
      </v-flex>
    </v-layout>
      <v-divider></v-divider>
      <v-card-actions class="pt-3 pb-3">
          <v-spacer></v-spacer>
          <v-btn class="link-btn" @click="open('https://vuejs.org/v2/guide/')">Vue</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="link-btn" @click="open('https://electron.atom.io/docs/')">Electron</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="link-btn" @click="open('https://vuetifyjs.com')">Vuetify</v-btn>
          <v-spacer></v-spacer>
      </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        electron: process.versions['atom-shell'],
        name: 'landing-page',
        node: process.versions.node,
        path: '/',
        platform: require('os').platform(),
        vue: require('vue/package.json').version
      }
    }
  }
</script>

<style scoped>
  .item
  {
    text-align: center;
  }

  .name
  {
    display: inline;
    font-style: italic;
    font-weight: 300;
    font-size: 16px;
    letter-spacing: 1px;
  }

  .value
  {
    display: inline;
    font-style: italic;
    font-weight: 600;
    font-size: 18px;
    padding-left: 5px;
  }
</style>

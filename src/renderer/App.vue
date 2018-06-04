<template>
  <div id="app">
    <v-app light>
      <v-navigation-drawer
        absolute
        :clipped="true"
        :temporary="true"
        :disable-resize-watcher="true"
        v-model="drawer"
        app
      >
        <v-list>
          <v-list-tile
            router
            :to="item.to"
            :key="i"
            v-for="(item, i) in items.recent"
            exact
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar fixed app color="green">
        <v-btn
          icon
          @click.native.stop="drawer ? {} : getFileList(); drawer = !drawer;"
        >
          <v-icon color="white" v-html="drawer ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
        <v-btn
          icon
          :to="'/settings'"
        >
          <v-icon color="white">settings</v-icon>
        </v-btn>
        <v-btn
          icon
          @click.native.stop="fixed = !fixed"
        >
            <div v-if="notifications.length > 0">
                <v-icon color="red">notifications</v-icon>
            </div>
            <div v-if="notifications.length == 0">
                <v-icon color="white">notifications</v-icon>
            </div>
        </v-btn>
          <v-btn icon :to="'/'">
              <v-icon color="white">cloud</v-icon>
          </v-btn>
        <v-spacer></v-spacer>
          <div class="text-xs-center" color="blue">
              <v-menu transition="slide-y-transition">
                  <v-btn
                          slot="activator"
                          icon
                  >
                      <v-avatar size="48"><img src="~@/assets/avatarDefault.jpg" alt="Login"></v-avatar>
                  </v-btn>
                  <v-list>
                      <v-list-tile v-for="(item, i) in profileItems" :key="i" :to="item.to">
                          <v-list-tile-title v-text="item.title"></v-list-tile-title>
                      </v-list-tile>
                  </v-list>
              </v-menu>
          </div>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
        <v-snackbar
            :timeout="settings.notificationTimeout">

        </v-snackbar>
      <v-footer :fixed="fixed" app>
        <v-spacer></v-spacer>
        <span>&copy; 2018 Langston Chandler</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
    import VeeValidate from 'vee-validate';
    import Vue from 'vue';

    Vue.use(VeeValidate);

    var fs = require('fs');
    var config = require('../config.js');

  export default {
    name: 'writestorm',
    data: () => ({
      drawer: false,
      fixed: false,
        settings: {},
      items: {
          recent: []
      },
        profileItems: [
            { title: 'Profile', to: '/profile' },
            { title: 'Friends', to: '/friends'},
            { title: 'About', to: '/about' },
            { title: 'Logout', to: '/login' }
        ],
        notifications: [ 'hi' ],
      right: false
    }),
      methods: {
          getFileList: function () {
              fs.readdir('./storms', (err, data) => {
                  console.log(data);
                  this.items.recent = [];
                  data.forEach((item) => {
                      this.items.recent.push( { icon: 'cloud_queue', title: item, to: '/storms/item' });
                  });
              });
          }
      },
      mounted () {
          config.getSettings((err, settings) => {
              this.settings = settings;
          });
          this.getFileList();
      }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>

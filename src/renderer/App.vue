<template>
    <div id="app" style="overflow-y: hidden;">
        <v-app v-bind:dark="settings.isDark">
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

            <v-system-bar class="system-bar mx-0 px-0"
                          :style="'background-color: ' + settings.isDark ? '#303030' : 'green'">
                <v-layout row no-wrap style="justify-content: flex-start; flex-direction: row-reverse">
                    <v-btn flat class="no-drag window-btn close-btn" @click.native.stop="remote.getCurrentWindow().close()">
                        <v-icon small class="no-drag">close</v-icon>
                    </v-btn>
                    <v-btn flat class="no-drag window-btn" @click.native.stop="remote.getCurrentWindow().maximize()">
                        <v-icon small class="no-drag">check_box_outline_blank</v-icon>
                    </v-btn>
                    <v-btn flat class="no-drag window-btn" @click.native.stop="remote.getCurrentWindow().minimize()">
                        <v-icon small class="no-drag">minimize</v-icon>
                    </v-btn>
                </v-layout>
            </v-system-bar>

            <v-toolbar fixed app height="60" class="mt-4" v-bind:color="settings.isDark ? 'black' : 'green'">
                <v-layout row no-wrap justify-center>
                    <v-btn icon @click.native.stop="drawer ? {} : getFileList(); drawer = !drawer;">
                        <v-icon color="white" v-html="drawer ? 'chevron_right' : 'chevron_left'"></v-icon>
                    </v-btn>
                    <v-btn icon :to="'/settings'">
                        <v-icon color="white">settings</v-icon>
                    </v-btn>
                    <v-btn icon @click.native.stop="fixed = !fixed">
                        <div v-if="notifications.length > 0">
                            <v-icon color="red">notifications</v-icon>
                        </div>
                        <div v-if="notifications.length == 0">
                            <v-icon>notifications</v-icon>
                        </div>
                    </v-btn>
                    <v-btn icon @click.native.stop="$store.commit('flipTheme'); saveSettings()">
                        <v-icon color="white" v-html="settings.isDark ? 'brightness_7' : 'brightness_3'"></v-icon>
                    </v-btn>
                    <v-btn icon :to="'/'">
                        <v-icon color="white">cloud</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <div class="text-xs-center" color="blue">
                        <v-menu transition="slide-y-transition">
                            <v-btn slot="activator" icon>
                                <v-avatar size="48"><img src="~@/assets/avatarDefault.jpg" alt="Login"></v-avatar>
                            </v-btn>
                            <v-list>
                                <v-list-tile v-for="(item, i) in profileItems" :key="i" :to="item.to">
                                    <v-list-tile-title v-text="item.title"></v-list-tile-title>
                                </v-list-tile>
                            </v-list>
                        </v-menu>
                    </div>
                </v-layout>
            </v-toolbar>
            <v-content>
                <v-container fluid fill-height>
                    <v-slide-y-transition mode="out-in">
                        <router-view :key="$route.fullPath"></router-view>
                    </v-slide-y-transition>
                </v-container>
            </v-content>
            <v-footer :fixed="fixed" app v-bind:color="settings.isDark ? 'black' : 'green'">
                <v-spacer></v-spacer>
                <span class="px-3 white--text">&copy; 2018 Langston Chandler</span>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
    import VeeValidate from 'vee-validate';
    import Vue from 'vue';
    import config from '../config.js';

    const {remote} = require('electron');

    Vue.use(VeeValidate);

    var fs = require('fs');

    export default {
        name: 'writestorm',
        store: this.$store,
        data: () => ({
            remote: remote,
            drawer: false,
            fixed: false,
            items: {
                recent: []
            },
            profileItems: [
                {title: 'Profile', to: '/profile'},
                {title: 'About', to: '/about'},
                {title: 'Logout', to: '/login'}
            ],
            notifications: ['hi'],
            right: false
        }),
        methods: {
            getFileList: function () {
                fs.readdir('./storms', (err, data) => {
                    console.log(data);
                    this.items.recent = [];
                    data.forEach((item) => {
                        if (!item.startsWith("_")) {
                            this.items.recent.push({icon: 'cloud_queue', title: item, to: '/storms/' + item});
                        }
                    });
                });
            },
            saveSettings() {
                config.saveSettings(this.$store.state.settings);
            }
        },
        computed: {
            settings() {
                return this.$store.state.settings;
            }
        },
        mounted() {
            fs.readdir('./storms', function (err, data) {
                if (err) {
                    console.log('Making ./storms/ directory');
                    fs.mkdir('storms');
                } else {
                    console.log('./storms/ already exists');
                }
            })
            this.getFileList();
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
    /* Global CSS */
    html {
        overflow-y: auto;
    }

    .system-bar {
        -webkit-app-region: drag;
    }

    .no-drag {
        z-index: 1;
        -webkit-app-region: no-drag;
    }

    .window-btn {
        text-align: center;
        margin: 0;
        padding: 0;
        height: 25px;
        max-width: 25px;
        min-width: 25px;
    }

    .window-btn ::before {
        width: inherit;
    }

    .window-btn .btn__content {
        width: 25px;
        padding: 0;
        margin: 0;
    }

    .close-btn :hover{
        background-color: rgba(240, 71, 71, 0.7);
    }

    .icon .no-drag :hover{
        background-color: rgba(0,0,0,0);
    }
</style>

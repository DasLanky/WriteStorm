<template lang="pug">
    #app.mditem(style='overflow-y: hidden;')
        v-app.mditem(v-bind:dark='settings.isDark')
            v-navigation-drawer(absolute app :clipped='true' :temporary='true' :disable-resize-watcher='true' v-model='drawer')
                v-list
                    v-list-tile(router :key='i' v-for='(item, i) in recent' exact)
                        v-list-tile-action
                            v-btn(icon :to="item.to")
                                v-icon folder
                        v-list-tile-content
                            v-list-tile-title(v-text='item.title')
                        v-list-tile-action
                            v-btn(icon @click="deleteStorm(item.title);")
                                v-icon(v-html='item.icon')
            v-system-bar.px-0.mx-0(system-bar fixed app :style="'background-color: ' + settings.isDark ? '#303030' : 'green'")
                v-layout(row no-wrap mx-0 px-0 style='justify-content: flex-start; flex-direction: row-reverse')
                    v-btn.no-drag.window-btn(flat color="red" @click.native.stop='remote.getCurrentWindow().close()')
                        v-icon.no-drag(small) close
                    v-btn.no-drag.window-btn(flat @click.native.stop='remote.getCurrentWindow().maximize()')
                        v-icon.no-drag(small) check_box_outline_blank
                    v-btn.no-drag.window-btn(flat @click.native.stop='remote.getCurrentWindow().minimize()')
                        v-icon.no-drag(small) minimize
            v-toolbar(fixed app height='60' v-bind:color="settings.isDark ? 'black' : 'green'")
                v-layout(row no-wrap justify-center)
                    v-flex(xs4 mt-2)
                        v-btn(icon @click.native.stop='drawer ? {} : getFileList(); drawer = !drawer;')
                            v-icon(color='white' v-html="drawer ? 'chevron_right' : 'chevron_left'")
                        v-btn(icon :to="'/settings'")
                            v-icon(color='white') settings
                        v-btn(icon @click.native.stop='fixed = !fixed')
                            div(v-if='notifications.length > 0')
                                v-icon(color='red') notifications
                            div(v-if='notifications.length == 0')
                                v-icon notifications
                        v-btn(icon @click.native.stop="$store.commit('flipTheme'); saveSettings()")
                            v-icon(color='white' v-html="settings.isDark ? 'brightness_7' : 'brightness_3'")
                        v-btn(icon :to="'/'")
                            v-icon(color='white') cloud
                    v-flex(xs4)
                        v-text-field(v-model="$store.state.stormTitle" flat)
                    v-flex(xs4 mt-2)
                        v-layout(row-reverse)
                            v-spacer
                            .text-xs-center(color='blue')
                                v-menu(transition='slide-y-transition')
                                    v-btn(slot='activator' icon)
                                        v-avatar(size='48')
                                            img(src='~@/assets/avatarDefault.jpg' alt='Login')
                                    v-list
                                        v-list-tile(to='/profile')
                                            v-list-tile-title Profile
                                        v-list-tile(button @click="showLoadStorm();")
                                            v-list-tile-title Load
                                        v-list-tile(to='/profile')
                                            v-list-tile-title About
            v-content.mditem
                v-container.mditem(fluid fill-height)
                    v-slide-y-transition.mditem(mode='out-in')
                        router-view.mditem(:key='$route.fullPath')
            v-footer(:fixed='fixed' app v-bind:color="settings.isDark ? 'black' : 'green'")
                v-spacer
                span.px-3.white--text &copy; 2018 Langston Chandler
</template>

<script>
    import VeeValidate from 'vee-validate';
    import Vue from 'vue';
    import path from 'path';
    import config from '../config.js';

    const {remote} = require('electron');

    const {dialog} = require('electron').remote;

    Vue.use(VeeValidate);

    var fs = require('fs');

    export default {
        name: 'writestorm',
        store: this.$store,
        data: () => ({
            remote: remote,
            drawer: false,
            fixed: false,
            notifications: ['hi'],
            right: false,
            recent: new Array()
        }),
        methods: {
            getFileList: function () {
                fs.readdir('./storms', (err, data) => {
                    console.log(data);
                    this.recent = new Array();
                    data.forEach((item) => {
                        if (!item.startsWith("_")) {
                            this.recent.push({icon: 'close', title: item, to: '/storms/' + item});
                        }
                    });
                });
            },
            showLoadStorm: function() {
                dialog.showOpenDialog({properties: ['openFile']}, (filePaths, bookmarks) => {
                    if (filePaths) {
                        console.log(filePaths[0]);
                        var fpath = filePaths[0],
                            pos1 = fpath.lastIndexOf("/"),
                            pos2 = fpath.lastIndexOf("\\"),
                            fname = fpath.substring(1 + ((pos1 > pos2) ? pos1 : pos2)),
                            newpath = path.resolve(__dirname, "../../storms/" + fname);
                        if (filePaths[0] != newpath) {
                            fs.createReadStream(fpath)
                                .pipe(fs.createWriteStream(newpath))
                                .on("close", (ex) => {
                                    this.$router.push({
                                        path: fname,
                                        params: {
                                            storm: fname
                                        }
                                    });
                                });
                        }
                        else {
                            this.$router.push({
                                path: fname,
                                params: {
                                    storm: fname
                                }
                            });
                        }
                    }
                });
            },
            deleteStorm: function(title) {
                fs.unlink(path.resolve(__dirname, "../../storms/" + title), (err) => {
                    console.log(err);
                    if (!err) {
                        this.drawer = false;
                    }
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
    html,body {
        height: 100%;
        overflow-y: hidden;
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

    .mditem {
        height: 100% !important;
        overflow-y: auto;
    }

    .close-btn :hover{
        background-color: rgba(240, 71, 71, 0.7);
    }
</style>

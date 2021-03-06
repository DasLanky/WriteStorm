<template lang="pug">
    #app.mditem_main(style='overflow-y: hidden;')
        v-app.mditem_main(v-bind:dark='settings.isDark')
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
            v-toolbar(fixed app v-bind:color="settings.isDark ? 'black' : settings.color")
                v-layout(row no-wrap justify-center)
                    v-flex(xs12 sm4 mt-2)
                        v-btn(icon @click.native.stop='drawer ? {} : getFileList(); drawer = !drawer;')
                            v-icon(color='white' v-html="drawer ? 'chevron_right' : 'chevron_left'")
                        v-btn(icon :to="'/settings'")
                            v-icon(color='white') settings
                        v-btn(icon @click.native.stop='fixed = !fixed')
                            v-menu(transition='slide-y-transition')
                                v-btn(icon slot='activator')
                                    v-icon(color="white") palette
                                v-list
                                    v-list-tile(router :key='i' v-for='(item, i) in colors' exact @click="settings.color = item.value; saveSettings()")
                                        v-list-tile-title {{item.name}}
                        v-btn(icon @click.native.stop="$store.commit('flipTheme'); saveSettings()")
                            v-icon(color='white' v-html="settings.isDark ? 'brightness_7' : 'brightness_3'")
                        v-btn(icon :to="'/'")
                            v-icon(color='white') cloud
                    v-flex(xs4 sm4 color="white")
                        v-text-field(v-model="$store.state.stormTitle" color="white" dark)
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
            v-content.mditem_main
                v-container.mditem_main(fluid fill-height)
                    v-slide-y-transition.mditem_main(mode='out-in')
                        router-view.mditem_main(:key='$route.fullPath')
            v-footer(:fixed='fixed' app v-bind:color="settings.isDark ? 'black' : settings.color")
                v-btn(flat color="white" @click.native.stop="open('https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet')") Markdown
                v-spacer
                span.px-3.white--text &copy; 2018 Langston Chandler
</template>

<script>
    import VeeValidate from 'vee-validate';
    import Vue from 'vue';
    import config from '../config.js';

    const {remote} = require('electron');

    const {dialog} = require('electron').remote;

    const {shell} = require('electron');

    const fs = require('fs');

    import VueCodemirror from 'vue-codemirror';
    import CodeMirror from 'codemirror';

    import 'codemirror/lib/codemirror.css';
    import 'codemirror/mode/markdown/markdown.js';
    import 'codemirror/theme/elegant.css';

    VueCodemirror.CodeMirror = CodeMirror;

    console.dir(CodeMirror.modes);

    Vue.use(VueCodemirror);

    Vue.use(VeeValidate);

    export default {
        name: 'writestorm',
        store: this.$store,
        data: () => ({
            remote: remote,
            drawer: false,
            fixed: false,
            colors: [
                { name: "Green", value: "green" },
                { name: "Blue", value: "blue darken-3" },
                { name: "Red", value: "red darken-1" },
                { name: "Purple", value: "purple" }
            ],
            right: false,
            recent: new Array()
        }),
        methods: {
            open: function (url) {
                shell.openExternal(url);
            },
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
                            newpath = './storms/' + fname;
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
                fs.unlink('./storms/' + title, (err) => {
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
    @import "~material-design-icons-iconfont/dist/material-design-icons.css";
    @import "~roboto-fontface/css/roboto/roboto-fontface.css";
    @import "~codemirror/lib/codemirror.css";
    @import "~codemirror/theme/elegant.css";
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

    .mditem_main {
        height: 100% !important;
        overflow-y: hidden;
    }

    .close-btn :hover{
        background-color: rgba(240, 71, 71, 0.7);
    }
</style>

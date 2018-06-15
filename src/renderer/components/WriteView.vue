<template lang="pug">
    v-layout#wrapper.mditem(column wrap justify-center)
        v-flex.mditem(xs12 my-0 mx-0 py-0 px-0)
            v-layout.mditem(row wrap justify-center my-0)
                v-flex(xs12 sm6 md5 lg4 px-1 @input='update')
                    v-card(style="height: 100%;")
                        codemirror(py-0 my-0 v-model="stormText" :options="cmOptions" autofocus style="height: 100%;")
                v-flex.mditem(xs12 sm6 md7 lg8 px-1 py-0)
                    v-card.mditem(elevation-5)
                        v-container
                            .markdown.body-1(v-html='compiledMarkdown' style="overflow-y: auto; height: 100%;")
        v-dialog(v-model="showDialog")
            v-card
                v-card-text
                    p Welcome to WriteStorm!
                    p
                        | Start writing in the below text area on the left in Markdown and your compiled text will appear
                        | on the right.
                    p All your storms are automatically saved in the ./storms/ folder.
                    p Happy writing!
                    .text-xs-right
                        em
                            small &mdash; Langston
                v-card-actions
                    v-spacer
                    v-btn(primary flat @click.native.stop='showDialog = false; settings.isHelpVisible = false; saveSettings()') Don't Show Again
                    v-btn(primary flat @click.native.stop='showDialog = false;') Close
</template>

<script>
    import _ from 'lodash';
    import marked from 'marked';

    import 'codemirror/lib/codemirror.css'
    import 'codemirror/mode/markdown/markdown.js'
    import 'codemirror/theme/elegant.css';

    import config from '../../config.js';

    var fs = require('fs');
    var path = require('path');

    const {dialog} = require('electron').remote;

    export default {
        name: 'write',
        store: this.$store,
        data: function () {
            return {
                textElevation: '1',
                stormText: '# Go for it!',
                statusText: 'Keep writing!',
                showDialog: false,
                cmOptions: {
                    tabSize: this.$store.state.settings.tabSize,
                    mode: 'markdown',
                    theme: 'elegant',
                    lineNumbers: this.$store.state.settings.showLineNumber,
                    lineWrapping: this.$store.state.settings.wrapLines,
                }
            }
        },
        computed: {
            compiledMarkdown() {
                return marked(this.stormText, {
                    smartypants: true,
                    gfm: true
                });
            },
            settings() {
                return this.$store.state.settings;
            }
        },
        methods: {
            loadStorm: function () {
                if (this.$route.params.storm) {
                    console.log("Loading Storm: " + this.$route.params.storm);
                    this.$store.state.stormTitle = this.$route.params.storm;
                    fs.readFile("./storms/" + this.$route.params.storm, (err, data) => {
                        this.stormText = data.toString();
                    });
                }
                else {
                    console.log("New Storm");
                    this.$store.state.stormTitle = Date.now().toString() + ".md";
                }
            },
            saveStorm: function () {
                fs.writeFile('./storms/' + this.$store.state.stormTitle, this.stormText, function (err) {
                    if (err) {
                        callback(err);
                    }
                });
            },
            saveSettings() {
                config.saveSettings(this.$store.state.settings);
            },
            update: _.debounce(function (e) {
                console.log("Saving Storm");
                this.saveStorm();
            }, 300)
        },
        mounted() {
            this.loadStorm();
            console.log(this.$store.state.settings.isHelpVisible);
            this.showDialog = this.$store.state.settings.isHelpVisible;
        }
    }
</script>

<style scoped>
    /deep/ .CodeMirror {
        height: 100%;
    }

    .textarea {
        border: 1px;
        resize: none;
        outline: none;
        font-size: 10px;
        font-family: 'Monaco', courier, monospace;
        margin-bottom: 0px;
        padding: 0px;
        height: 100%;

        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }

    .mditem {
        height: 100% !important;
        overflow-y: auto;
    }

    .markdown {
        height: 100%;
        padding: 20px;
    }

    /deep/ .input-group__details {
        display: none;
    }

    .hidden {
        display: none;
    }
</style>

<template>
    <v-layout row wrap justify-center id="wrapper">
        <v-flex xs10 class="mt-3">
            <v-card :class="settings.isHelpVisible ? '' : 'hidden'">
                <v-card-text>
                    <p>Welcome to WriteStorm!</p>
                    <p>Start writing in the below text area on the left in Markdown and your compiled text will appear
                        on the right.</p>
                    <p>All your storms are automatically saved in the ./storms/ folder.</p>
                    <p>Happy writing!</p>
                    <div class="text-xs-right">
                        <em>
                            <small>&mdash; Langston</small>
                        </em>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn
                            primary
                            flat
                            @click.native.stop="settings.isHelpVisible = false; saveSettings()"
                    >
                        Hide
                    </v-btn>
                </v-card-actions>
            </v-card>
            <v-layout row wrap justify-center>
                <v-flex xs6 @input="update">
                    <v-card class="my-3 mx-2 elevation-5">
                        <v-text-field
                                v-bind:value="stormText"
                                :textarea="true"
                                :autofocus="true"
                                :auto-grow="!settings.shouldScroll"
                                style="height: 100%"
                                class="textarea"
                        ></v-text-field>
                        <v-card-actions>
                            <v-switch label="Scroll" v-model="settings.shouldScroll"
                                      @click.native.stop="saveSettings()"></v-switch>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex xs6>
                    <v-card class="mt-3 mx-2 elevation-5" :auto-grow="!settings.shouldScroll">
                        <div class="markdown" v-html="compiledMarkdown"></div>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
    import _ from 'lodash';
    import marked from 'marked';
    import config from '../../config.js';

    var fs = require('fs');
    var path = require('path');

    export default {
        name: 'write',
        store: this.$store,
        data: function () {
            return {
                stormTitle: Date.now().toString() + '.md',
                textElevation: '1',
                stormText: '# Go for it!',
                statusText: 'Keep writing!'
            }
        },
        computed: {
            compiledMarkdown() {
                return marked(this.stormText, {sanitize: true});
            },
            settings() {
                return this.$store.state.settings;
            }
        },
        methods: {
            loadStorm: function () {
                if (this.$route.params.storm) {
                    console.log("Loading Storm: " + this.$route.params.storm);
                    this.stormTitle = this.$route.params.storm;
                    fs.readFile('./storms/' + this.$route.params.storm, (err, data) => {
                        this.stormText = data.toString();
                    });
                }
                else {
                    console.log("New Storm");
                }
            },
            saveStorm: function () {
                fs.writeFile('./storms/' + this.stormTitle, this.stormText, function (err) {
                    if (err) {
                        callback(err);
                    }
                });
            },
            saveSettings() {
                config.saveSettings(this.$store.state.settings);
            },
            update: _.debounce(function (e) {
                this.stormText = e.target.value;
                this.saveStorm();
            }, 300)
        },
        mounted() {
            this.loadStorm();
        }
    }
</script>

<style scoped>
    .textarea {
        border: none;
        resize: none;
        outline: none;
        font-size: 10px;
        font-family: 'Monaco', courier, monospace;
        margin-bottom: 0px;
        padding: 0px;
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

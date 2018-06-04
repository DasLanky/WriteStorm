<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs10 class="mt-3">
        <v-card>
            <v-card-text :class="settings.isHelpVisible ? '' : 'hidden'">
                <p>Welcome to WriteStorm!</p>
                <p>Start writing in the below text area on the left in Markdown and your compiled text will appear on the right.</p>
                <p>All your storms are automatically saved in the ./storms/ folder.</p>
                <p>Happy writing!</p>
                <div class="text-xs-right">
                    <em><small>&mdash; Langston</small></em>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-card-text>
                    <v-switch label="Scroll" v-model="settings.shouldScroll" @click.native.stop="saveSettings()"></v-switch>
                </v-card-text>
                <v-btn primary
                       flat
                       :class="settings.isHelpVisible ? '' : 'hidden'"
                       @click.native.stop="settings.isHelpVisible = false; saveSettings()">Hide</v-btn>
            </v-card-actions>
        </v-card>
            <v-layout row wrap justify-center>
                <v-flex xs6 @input="update">
                    <v-card class="mt-3 mx-1 elevation-5">
                    <v-text-field v-bind:value="stormText" :textarea="true" :autofocus="true" :auto-grow="!settings.shouldScroll" class="textarea"></v-text-field>
                    </v-card>
                </v-flex>
                <v-flex xs6>
                    <v-card class="mt-3 mx-1 elevation-5" :auto-grow="!settings.shouldScroll">
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

    var config = require('../../config.js');
    var fs = require('fs');

  export default {
    name: 'write',
      data: function () {
        return {
            stormTitle: Date.now().toString() + '.md',
            textElevation: '1',
            stormText: '# Go for it!',
            statusText: 'Keep writing!',
            settings: {
                isHelpVisible: true,
                shouldScroll: true
            }
        }
      },
      computed: {
          compiledMarkdown() {
              return marked(this.stormText, { sanitize: true });
          }
      },
      methods: {
          loadStorm: function() {
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
          saveStorm: function() {
              fs.writeFile('./storms/' + this.stormTitle, this.stormText, function(err) {
                  if (err) {
                      callback(err);
                  }
              });
          },
          saveSettings () {
              config.saveSettings(this.settings);
          },
          update: _.debounce(function (e) {
              this.stormText = e.target.value;
              this.saveStorm();
          }, 300)
      },
      mounted () {
          config.getSettings((err, settings) => {
              this.settings = settings;
          })
          this.loadStorm();
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

  .textarea {
      border: none;
      resize: none;
      outline: none;
      background-color: #f6f6f6;
      font-size: 14px;
      font-family: 'Monaco', courier, monospace;
      margin-bottom: 0px;
      padding: 0px;
  }

    .markdown {
        height: 100%;
        padding: 20px;
        background-color: #f6f6f6;
    }

    /deep/ .input-group__details {
        display: none;
    }

    .hidden {
        display: none;
    }
</style>

<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex xs10 class="mt-3">
      <v-card>
        <v-card-text>
            <p>Let's cut to the chase!</p>
            <p>Start writing in the below text area on the left in Markdown and your compiled text will appear on the right.</p>
            <p>Happy writing!</p>
          <div class="text-xs-right">
            <em><small>&mdash; Langston</small></em>
          </div>
        </v-card-text>
            <v-layout row wrap justify-center>
                <v-flex xs6 class="mt-4" @input="update">
                    <v-text-field v-bind:value="stormText" :textarea="true" :autofocus="true" :auto-grow="true" class="textarea"></v-text-field>
                </v-flex>
                <v-flex xs6 class="mt-4">
                    <div class="markdown" v-html="compiledMarkdown"></div>
                </v-flex>
            </v-layout>
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
    import _ from 'lodash';
    import marked from 'marked';
  export default {
    name: 'welcome',
      data: function () {
        return {
            stormText: '# Go for it!',
            statusText: 'Keep writing!'
        }
      },
      computed: {
          compiledMarkdown() {
              return marked(this.stormText, { sanitize: true });
          }
      },
      methods: {
          update: _.debounce(function (e) {
              this.stormText = e.target.value;
          }, 300)
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
      border: 1px black;
      border-right: 1px solid #ccc;
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
</style>

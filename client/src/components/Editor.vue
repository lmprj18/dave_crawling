<template>
  <div id="editor">
    <v-container grid-list-xl text-xs-center>
      <v-flex xs1>
        <v-btn small slot="activator" class="mb-2 new">
          <v-icon>note_add</v-icon>add
         </v-btn>
      </v-flex>
      <v-flex xs12>
        <vue-editor v-model="content" id="editor1"></vue-editor>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";
export default {
  data() {
    return {
      content: "<h1>Some initial content</h1>"
    };
  },
  components: {
    VueEditor
  }
};
</script>
 
<style>
#editor1{
  height: 500px;
}
.icon {
  font-size: 13px;
  margin-right: 10px;
  margin-left: 0px;
}
</style>

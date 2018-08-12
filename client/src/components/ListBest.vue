<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in bestItems">
            <v-list-tile
              :key="item.title"
              avatar
              ripple
              :href="item.href"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <!-- <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title> -->
                <v-list-tile-sub-title>{{ item.href }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <!-- <v-list-tile-action>
                <v-list-tile-action-text>{{ item.time }}</v-list-tile-action-text>
                <v-icon
                  v-if="selected.indexOf(index) < 0"
                  color="grey lighten-1"
                >star_border</v-icon>
                <v-icon
                  v-else
                  color="yellow darken-2"
                >star</v-icon>
              </v-list-tile-action> -->
            </v-list-tile>
            <v-divider v-if="true" :key="index"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      selected: [2]
    }
  },
  computed: {
    ...mapState({
      bestItems: (state) => { return state.bestItems }
    })
  },
  methods: {
    toggle (href) {
      this.$router.go(href)
      // const i = this.selected.indexOf(index)

      // if (i > -1) {
      //   this.selected.splice(i, 1)
      // } else {
      //   this.selected.push(index)
      // }
    }
  }
}
</script>

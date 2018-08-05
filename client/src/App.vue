<template>
  <div id="app">
    <v-app
      dark
      id="inspire"
    >
      <v-navigation-drawer
        fixed
        clipped
        v-model="drawer"
        app
      >
        <v-list dense>
          <v-list-tile v-for="item in items" :key="item.text" :to="item.url" @click="1">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar
        color="red"
        dense
        fixed
        clipped-left
        app
      >
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-icon class="mx-3">fa-youtube</v-icon>
        <v-toolbar-title class="mr-5 align-center">
          <span class="title">Dave World!</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-layout row align-center style="max-width: 650px">
          <v-text-field
            placeholder="Search..."
            single-line
            append-icon="search"
            :append-icon-cb="() => {}"
            color="white"
            hide-details
          ></v-text-field>
        </v-layout>
      </v-toolbar>
      <v-content>
        <router-view/>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import Navigation from "./layouts/navigation"
import Content from "./layouts/content"
import Footer from "./layouts/footer"

export default {
  name: 'App',
  data () {
    return {
      drawer: true,
      items: [
        { icon: 'home', text: 'Home', url: '/' },
        { icon: 'subscriptions', text: 'Portfolio', url: '/portfolio' }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>

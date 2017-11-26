<template>
  <v-app>
    <v-navigation-drawer app fixed v-model="drawerLeft">
      <AmiServers/>
    </v-navigation-drawer>

    <v-toolbar color="indigo" app dark>
      <v-toolbar-side-icon @click.stop="drawerLeft = !drawerLeft"></v-toolbar-side-icon>
      <v-toolbar-title>Asterisk Queues Realtime Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-circular
        indeterminate
        :width="5"
        v-if="loading"
        color="white">
      </v-progress-circular>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <v-layout row wrap>
          <TopStats/>
          <v-spacer></v-spacer>
        </v-layout>
        <v-layout row wrap>
          <MenuPanel/>
        </v-layout>
        <v-layout row wrap>
          <QueuesList/>
        </v-layout>
      </v-container>
    </v-content>

    <v-navigation-drawer v-model="drawerRight" right app fixed width="500">
      <QueueData/>
    </v-navigation-drawer>

    <v-footer color="indigo" dark fixed app>
      <v-spacer></v-spacer>
      <span class="white--text">ver. {{version}}</span>
    </v-footer>
    <v-dialog v-model="wsDisconnected" max-width="400" persistent>
      <v-card>
        <v-card-title class="headline">Connection lost...</v-card-title>
        <v-card-text>
          <v-layout row>
            <v-flex xs2>
              <v-icon x-large dark color="red">error_outline</v-icon>
            </v-flex>
            <v-flex xs10>
              <p>Web-socket connection is lost.</p>
              <p>Trying to re-connect...</p>
            </v-flex>
          </v-layout>
          <v-progress-linear color="error" height="2" :indeterminate="true"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import TopStats from './components/TopStats'
import AmiServers from './components/AmiServers'
import QueuesList from './components/QueuesList'
import QueueData from './components/QueueData'
import MenuPanel from './components/MenuPanel'

export default {
  name: 'app',
  components: {
    TopStats,
    AmiServers,
    MenuPanel,
    QueuesList,
    QueueData
  },
  data () {
    return {
      drawerLeft: false
    }
  },
  computed: {
    ...mapGetters(['getLoading', 'wsDisconnected', 'getSelectedQueue']),
    loading: function () {
      return this.getLoading > 0
    },
    version: () => process.env.VER,
    drawerRight: {
      get: function () {
        return this.getSelectedQueue.length > 0
      },
      set: function (val) { }
    }
  }
}
</script>

<style>
#app {}
</style>

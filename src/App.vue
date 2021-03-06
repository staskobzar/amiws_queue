<template>
  <v-app>
    <v-navigation-drawer app fixed v-model="drawerLeft">
      <AmiServers/>
    </v-navigation-drawer>

    <v-toolbar color="indigo" app dark>
      <v-toolbar-side-icon @click.stop="drawerLeft = !drawerLeft"></v-toolbar-side-icon>
      <v-toolbar-title>Asterisk Queues Realtime Dashboard ({{ version }})</v-toolbar-title>
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
      <v-spacer></v-spacer>
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
          <v-progress-linear color="error" height="2" :indeterminate="true">
          </v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="errorToast" :timeout="5000" color="error" multi-line top>
      <v-icon color="white">error_outline</v-icon>
      {{ errorMessage }}
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
  methods: mapActions(['setPerPage', 'hideError']),
  computed: {
    ...mapGetters(['showError', 'getErrorResponse', 'getAllQueues', 'wsDisconnected', 'getSelectedQueue']),
    loading: function () {
      return this.getAllQueues.length === 0
    },
    errorMessage: function () {
      return this.getErrorResponse
    },
    errorToast: {
      get: function () {
        return this.showError
      },
      set: function (val) {
        this.hideError(val)
      }
    },
    version: () => process.env.VER,
    drawerRight: {
      get: function () {
        if (this.getSelectedQueue.length > 0) {
          this.setPerPage(8)
          return true
        } else {
          this.setPerPage(9)
          return false
        }
      },
      set: function (val) { }
    }
  }
}
</script>

<style>
#app {}
</style>

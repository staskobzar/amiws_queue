<template>
  <v-app>
    <v-navigation-drawer app fixed>
    </v-navigation-drawer>

    <v-toolbar color="indigo" clipped-left dark fixed app>
      <v-toolbar-title>Asterisk Queues Realtime Dashboard</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid>
      </v-container>
    </v-content>

    <v-navigation-drawer right app fixed>
    </v-navigation-drawer>

    <v-footer color="indigo" dark fixed app></v-footer>
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
  computed: {
    ...mapGetters(['getLoading', 'wsConnected']),
    loading: function () {
      if (this.getLoading === 0 && this.$refs.loadingModal) {
        this.$refs.loadingModal.hide()
      }
    },
    version: () => process.env.VER
  },
  mounted () {
    if (this.getLoading > 0 && this.$refs.loadingModal) {
      this.$refs.loadingModal.show()
    }
  }
}
</script>

<style>
#app {}
</style>

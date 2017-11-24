<template>
  <v-app>
    <v-navigation-drawer app fixed v-model="drawerLeft">
      <AmiServers/>
    </v-navigation-drawer>

    <v-toolbar app>
      <v-toolbar-side-icon @click.stop="drawerLeft = !drawerLeft"></v-toolbar-side-icon>
      <v-toolbar-title>Asterisk Queues Realtime Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
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
  data () {
    return {
      drawerLeft: true,
      drawerRight: true
    }
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

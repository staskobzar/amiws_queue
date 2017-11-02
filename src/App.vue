<template>
  <b-container fluid id="app">

    <b-row>
      <b-col>
        <b-navbar variant="light" type="light">
          Asterisk Queues Realtime Dashboard
        </b-navbar>
      </b-col>
    </b-row>

    <b-row class="top-stats">
      <b-col>
        <TopStats/>
      </b-col>
    </b-row>

    <b-row>
      <transition>
        <b-col cols="2" v-show="toggleAmiSrv">
          <AmiServers/>
        </b-col>
      </transition>
      <b-col>
        <QueuesList/>
      </b-col>
      <transition>
        <b-col cols="3" v-show="toggleQData">
          <QueueData/>
        </b-col>
      </transition>
    </b-row>

  </b-container>
</template>

<script>
import TopStats from './components/TopStats'
import AmiServers from './components/AmiServers'
import QueuesList from './components/QueuesList'
import QueueData from './components/QueueData'

export default {
  name: 'app',

  data () {
    return {
      toggleQData: true,
      toggleAmiSrv: true
    }
  },

  components: {
    TopStats,
    AmiServers,
    QueuesList,
    QueueData
  }
}
</script>

<style>
#app {}
.top-stats {margin: 15px 0}
</style>

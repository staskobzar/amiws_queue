<template>
  <b-container fluid id="app">

    <b-row class="top-line">
      <b-col>
        <b-navbar variant="light" type="light">
          Asterisk Queues Realtime Dashboard
        </b-navbar>
      </b-col>
    </b-row>

    <b-row>
      <transition>
        <b-col cols="2" class="ami-servers">
          <AmiServers/>
        </b-col>
      </transition>
      <b-col>
        <b-row class="top-stats">
          <b-col>
            <TopStats/>
          </b-col>
        </b-row>

        <b-row>
          <b-col>
            <b-alert :show="getAllQueues.length === 0">
              <b>&rArr;</b>LOADING...
            </b-alert>
            <MenuPanel/>
            <QueuesList/>
          </b-col>
          <b-col cols="4">
            <QueueData/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>

  </b-container>
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
  computed: mapGetters(['getAllQueues'])
}
</script>

<style>
#app {}
.top-line {}
.top-stats {margin: 15px 0; margin-left: -15px}
.ami-servers { padding-top: 10px; background-color: #f8f9fa}
</style>

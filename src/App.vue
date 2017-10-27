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
      <b-col cols="2">
        <AmiServers/>
      </b-col>
      <b-col>
        <QueuesList/>
      </b-col>
      <b-col cols="3">
        <QueueData/>
      </b-col>
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

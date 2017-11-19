<template>
  <b-container fluid id="app">

    <b-row class="top-line">
      <b-col>
        <b-navbar variant="light" type="light">
          Asterisk Queues Realtime Dashboard -
          [{{ version }}]
          <icon name="dot-circle-o" scale="1.6"
            v-b-tooltip.hover title="Connected"
            :class="['dot-circle', wsConnected ? 'connected' : 'disconnected' ]"/>
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
            <MenuPanel/>
            <QueuesList/>
          </b-col>
          <b-col cols="4">
            <QueueData/>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-modal title="Connection lost..." centered
      :hide-footer="true"
      :hide-header-close="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      :visible="!wsConnected"
      ref="wsconlost">
      <b-row>
        <b-col cols="3">
          <icon name="exclamation-circle" scale="4" class="disconnected"/>
        </b-col>
        <b-col>
          <p>Web-socket connection is lost.</p>
          <p>
            Trying to re-connect...
            <div class="loader"></div>
          </p>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal title="Loading..." :data-loading="loading"
      centered
      :hide-footer="true"
      :hide-header-close="true"
      :no-close-on-backdrop="true"
      :no-close-on-esc="true"
      id="loadingModal"
      ref="loadingModal">
      <p>Loading queues...</p>
    </b-modal>
    <notifications width="400px" :max="10" group="main" position="top right">
      <div slot="body" slot-scope="props" class="notification-main">
        <div class="left-icon">
          <icon name="check-circle-o" scale="1"/>
        </div>
        <div class="body">
          <div class="notice">
            {{ props.item.text }}
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </notifications>
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
.top-line {}
.top-stats {margin: 15px 0; margin-left: -15px}
.ami-servers { padding-top: 10px; background-color: #f8f9fa}
.notification-main {
  margin: 20px 20px 0px 0px;
  border: 1px solid #866ab3;
  border-left-size: 10px;
  border-radius: 4px;
  padding: 15px;
  background-color: #EAF4FE;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.2);
}
.notification-main .left-icon {float: left; margin-right: 10px; color: green;}
.notification-main .body{font-size: 13px}
.connected{color: green}
.disconnected{color: red}
.loader {
  height: 2px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #ddd;
}
.loader:before{
  display: block;
  position: absolute;
  content: "";
  left: -200px;
  width: 200px;
  height: 4px;
  background-color: #2980b9;
  animation: loading 2s linear infinite;
}

@keyframes loading {
    from {left: -200px; width: 30%;}
    50% {width: 30%;}
    70% {width: 70%;}
    80% { left: 50%;}
    95% {left: 120%;}
    to {left: 100%;}
}
</style>

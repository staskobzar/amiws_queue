<template>
  <b-card-group deck>
    <b-card class="stats-card active-calls">
      <b-row>
        <b-col md="2">
          <icon name="clock-o" scale="4"/>
        </b-col>
        <b-col class="stats-data">
          <div class="label">On call</div>
          <div class="calls-num data">{{ totalActiveCalls }}</div>
        </b-col>
        <b-col class="stats-data">
          <div class="label">Waiting</div>
          <div class="calls-wait data">{{ totalWaitingCalls }}</div>
        </b-col>
      </b-row>
      <b-progress height="2px" :value="totalActiveCalls" :max="totalActiveCalls + totalWaitingCalls"></b-progress>
    </b-card>

    <b-card class="stats-card calls-processed">
      <b-row>
        <b-col md="2">
          <icon name="phone-square" scale="4"/>
        </b-col>
        <b-col class="stats-data">
          <div class="label">Completed calls</div>
          <div class="calls-completed data">{{ totalCompletedCalls }}</div>
        </b-col>
        <b-col class="stats-data">
          <div class="label">Abandoned calls</div>
          <div class="calls-abandoned data">{{ totalAbandonedCalls }}</div>
        </b-col>
      </b-row>
      <b-progress height="2px" :value="totalCompletedCalls" :max="totalCompletedCalls + totalAbandonedCalls"></b-progress>
    </b-card>

    <b-card class="stats-card members">
      <b-row>
        <b-col md="2">
          <icon name="user-circle" scale="4"/>
        </b-col>
        <b-col class="stats-data">
          <div class="label">Total</div>
          <div class="total data">{{ totalMembers }}</div>
        </b-col>
        <b-col class="stats-data">
          <div class="label">Paused</div>
          <div class="paused data">{{ totalPausedMembers }}</div>
        </b-col>
        <b-col class="stats-data">
          <div class="label">Unpaused</div>
          <div class="unpaused data">{{ totalUnpausedMembers }}</div>
        </b-col>
      </b-row>
      <b-progress height="2px" :value="totalUnpausedMembers" :max="totalMembers"></b-progress>
    </b-card>

  </b-card-group>
</template>

<script>
import { mapGetters } from 'vuex'
import Icon from 'vue-awesome/components/Icon'

import 'vue-awesome/icons'

export default {
  name: 'TopStats',
  data () {
    return {
      title: 'Statistics Boxes'
    }
  },
  components: { Icon },
  computed: {
    ...mapGetters({
      totalActiveCalls: 'getTotalActiveCalls',
      totalWaitingCalls: 'getTotalWaitingCalls',
      totalCompletedCalls: 'getTotalCompletedCalls',
      totalAbandonedCalls: 'getTotalAbandonedCalls',
      totalPausedMembers: 'getTotalPausedMembers',
      totalUnpausedMembers: 'getTotalUnpausedMembers'
    }),
    totalMembers: function () {
      return this.totalPausedMembers + this.totalUnpausedMembers
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)}
.stats-data {text-align: right}
.active-calls {color: #2cabe3}
.stats-data .label {font-size: 14px; color: #999}
.stats-data .data { font-size: 2rem; }

.calls-processed {color: #4caf50}
.members {color: orange}
.members .progress-bar {background-color: orange}
</style>

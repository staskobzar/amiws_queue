<template>
  <b-card-group deck>
    <b-card class="stats-card active-calls">
      <div>
        On call: <span class="calls-num">{{ totalActiveCalls }}</span>
      </div>
      <div>
        Waiting: <span class="calls-wait">{{ totalWaitingCalls }}</span>
      </div>
    </b-card>

    <b-card class="stats-card calls-processed">
      <div>
        Completed calls: <span class="calls-completed">{{ totalCompletedCalls }}</span>
      </div>
      <div>
        Abandoned calls: <span class="calls-abandoned">{{ totalAbandonedCalls }}</span>
      </div>
    </b-card>

    <b-card class="stats-card service-level">
      Service Level <span class="level">{{ totalServiceLevel }}</span>%
    </b-card>

    <b-card class="stats-card members">
      <div>Total: <span class="total">{{ totalMembers }}</span></div>
      <div>Paused: <span class="paused">{{ totalPausedMembers }}</span></div>
      <div>Unpaused: <span class="unpaused">{{ totalUnpausedMembers }}</span></div>
    </b-card>

  </b-card-group>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TopStats',
  data () {
    return {
      title: 'Statistics Boxes'
    }
  },
  computed: {
    ...mapGetters({
      totalActiveCalls: 'getTotalActiveCalls',
      totalWaitingCalls: 'getTotalWaitingCalls',
      totalCompletedCalls: 'getTotalCompletedCalls',
      totalAbandonedCalls: 'getTotalAbandonedCalls',
      totalServiceLevel: 'getTotalServiceLevel',
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
</style>

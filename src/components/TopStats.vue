<template>
  <v-flex xs4>
    <v-card>
      <v-container fluid grid-list-lg>
        <v-layout row>
          <v-flex xs3>
            <v-avatar tile size="68px">
              <v-icon x-large>timelapse</v-icon>
            </v-avatar>
          </v-flex>
          <v-flex xs9>
            <div class="label">On call</div>
            <div class="calls-num data">{{ totalActiveCalls }}</div>
            <div class="label">Waiting</div>
            <div class="calls-wait data">{{ totalWaitingCalls }}</div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-flex>
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

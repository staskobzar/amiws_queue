<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs4>
        <v-card>
            <v-layout row>
              <v-flex xs3>
                <v-card class="stats-card-icon amber darken-2" raised height="100%">
                  <v-icon class="header-icon" color="white">timer</v-icon>
                </v-card>
              </v-flex>
              <v-flex xs9>
                <div class="stats-content">
                  <v-layout row>
                    <v-flex class="text-xs-right">
                      <div class="calls-num data">{{ totalActiveCalls }}</div>
                      <div class="label">On call</div>
                    </v-flex>
                    <v-flex class="text-xs-right">
                      <div class="calls-wait data">{{ totalWaitingCalls }}</div>
                      <div class="label">Waiting</div>
                    </v-flex>
                  </v-layout>
                </div>
                <v-progress-linear :value="progressOnCalls" height="2" color="amber darken-2"></v-progress-linear>
              </v-flex>
            </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card>
            <v-layout row>
              <v-flex xs3>
                <v-card class="stats-card-icon blue darken-4" raised height="100%">
                  <v-icon class="header-icon" color="white">phone_in_talk</v-icon>
                </v-card>
              </v-flex>
              <v-flex xs9>
                <div class="stats-content">
                  <v-layout row>
                    <v-flex class="text-xs-right">
                      <div class="calls-completed data">{{ totalCompletedCalls }}</div>
                      <div class="label">Completed calls</div>
                    </v-flex>
                    <v-flex class="text-xs-right">
                      <div class="calls-abandoned data">{{ totalAbandonedCalls }}</div>
                      <div class="label">Abandoned calls</div>
                    </v-flex>
                  </v-layout>
                </div>
                <v-progress-linear :value="progressCalls" height="2" color="blue darken-4"></v-progress-linear>
              </v-flex>
            </v-layout>
        </v-card>
      </v-flex>

      <v-flex xs4>
        <v-card>
            <v-layout row>
              <v-flex xs3>
                <v-card class="stats-card-icon green darken-3" raised height="100%">
                  <v-icon class="header-icon" color="white">contact_phone</v-icon>
                </v-card>
              </v-flex>
              <v-flex xs9>
                <div class="stats-content">
                  <v-layout row>
                    <v-flex class="text-xs-right">
                      <div class="paused data">{{ totalPausedMembers }}</div>
                      <div class="label">Paused</div>
                    </v-flex>
                    <v-flex class="text-xs-right">
                      <div class="unpaused data">{{ totalUnpausedMembers }}</div>
                      <div class="label">Unpaused</div>
                    </v-flex>
                  </v-layout>
                </div>
                <v-progress-linear :value="progressMembers" height="2" color="green darken-3"></v-progress-linear>
              </v-flex>
            </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
    progressOnCalls: function () {
      return Math.round(this.totalActiveCalls / (this.totalActiveCalls + this.totalWaitingCalls) * 100)
    },
    progressCalls: function () {
      return Math.round(this.totalCompletedCalls / (this.totalCompletedCalls + this.totalAbandonedCalls) * 100)
    },
    progressMembers: function () {
      return Math.round(this.totalUnpausedMembers / (this.totalUnpausedMembers + this.totalPausedMembers) * 100)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.stats-card-icon {
  margin-left: 5px;
  margin-top: -20px;
  width: 100%; height: 100%;
  text-align: center;
}
.header-icon { font-size: 48px; padding-top: 18px }
.stats-content {padding: 0 16px 0 0}
.stats-content .data {font-size: 28px; font-weight: 300}
.stats-content .label { color: #9e9e9e!important; }
</style>

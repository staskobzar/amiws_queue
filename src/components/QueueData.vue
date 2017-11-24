<template>
  <v-container fluid grid-list-lg>
    <v-list three-line subheader>
      <v-subheader>
        <v-icon>headset_mic</v-icon>Queue agents ({{ members.length }})
      </v-subheader>
      <v-list-tile avatar v-for="(member, i) in members" :key="i" @click="">
        <v-list-tile-avatar>
          <v-icon class="grey lighten-1 white--text">contact_phone</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ member.name }}</v-list-tile-title>
          <v-list-tile-sub-title class="caption">
            <v-tooltip left>
              <span slot="activator">
                <v-icon class="data-icon">check_box</v-icon>
                {{ member.callsTaken}}
              </span>
              <span>Calls taken</span>
            </v-tooltip>
            <v-tooltip left>
              <span slot="activator">
                <v-icon class="data-icon">event</v-icon>
                <span class="last-call-taken">{{ member.lastCall | formatFromUnixtime }}</span>
              </span>
              <span>Last call taken</span>
            </v-tooltip>
          </v-list-tile-sub-title>
          <v-list-tile-sub-title class="caption">
            <v-tooltip left>
              <span slot="activator">
                <v-icon class="data-icon">alarm</v-icon>
                {{ member.lastHoldtime | formatTime }}
              </span>
              <span>Last Hold time</span>
            </v-tooltip>
            <v-tooltip left>
              <span slot="activator">
                <v-icon class="data-icon">alarm_on</v-icon>
                {{ member.lastTalktime | formatTime }}
              </span>
              <span>Last Talk time</span>
            </v-tooltip>
          </v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-btn icon ripple>
            <v-icon color="grey lighten-1">play_arrow</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
    <v-list two-line>
      <v-subheader v-text="'Queue callers'"></v-subheader>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'QueueData',
  data () {
    return {
      msg: 'Members and Callers'
    }
  },
  computed: mapGetters({
    queues: 'getAllQueues',
    members: 'getSelectedMembers',
    callers: 'getSelectedCallers',
    selectedQueue: 'getSelectedQueue'
  }),
  methods: {
    ...mapActions(['pauseAgentInSelectedQueue']),
    pauseAgent: function (member, pause) {
      this.pauseAgentInSelectedQueue({ member: member, pause: pause })
      this.$notify({group: 'main', text: `${pause ? 'Pause' : 'Activate'} agent ${member.name}`})
      this.$root.$emit('bv::hide::tooltip')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.data-icon {font-size: 16px}
</style>

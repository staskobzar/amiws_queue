<template>
  <v-container fluid grid-list-lg v-if="queueSelect">
    <v-toolbar card color="white" prominent>
      <v-toolbar-title>
        <v-tooltip bottom>
          <v-btn fab small @click.stop="queueSelect = ''" slot="activator">
            <v-icon>exit_to_app</v-icon>
          </v-btn>
          <span>Close</span>
        </v-tooltip>
        {{ queueSelect }}
      </v-toolbar-title>
    </v-toolbar>
    <v-list two-line subheader class="members">
      <v-subheader>
        <v-icon>headset_mic</v-icon>Queue agents ({{ members.length }})
      </v-subheader>
      <v-list-tile avatar v-for="(member, i) in members" :key="i" @click=""
        draggable="true"
        @dragstart="memberDragStart(member)"
        @dragend="memberDragStop()"
        class="member-card">
        <v-list-tile-avatar>
          <v-icon v-if="member.paused"
            class="orange lighten-2 white--text">phone_paused</v-icon>
          <v-icon v-else-if="member.incall"
            class="green darken-2 white--text">phone_in_talk</v-icon>
          <v-icon v-else
            class="grey lighten-1 white--text">contact_phone</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ member.name }}</v-list-tile-title>
          <v-list-tile-sub-title class="caption">
            <span>Penalty: {{ member.penalty }}</span>
            <v-tooltip left>
              <span slot="activator">
                <v-icon class="data-icon">check_box</v-icon>
                {{ member.callsTaken}} calls
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
            <v-tooltip v-if="member.incall" left>
              <span slot="activator" class="green--text darken-2--text">
                <v-icon
                  class="data-icon">phone_in_talk</v-icon>
                <strong>{{ member.incallTime | formatTime }}</strong>
              </span>
              <span>Time on call</span>
            </v-tooltip>
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
          <v-tooltip top>
            <v-btn slot="activator" icon ripple class="btn-agent-toggle" @click="pauseAgentToggle(member)">
              <v-icon color="grey lighten-1">
                {{ member.paused ? 'play_circle_outline' : 'pause_circle_outline' }}
              </v-icon>
            </v-btn>
            <span>{{ member.paused ? 'Activate' : 'Pause'}} agent in queue</span>
          </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-list two-line class="callers">
      <v-subheader>
        <v-icon>account_circle</v-icon>
        Queue callers ({{ callers.length }})
      </v-subheader>
      <v-list-tile avatar v-for="(caller, i) in callers" :key="i" @click="" class="caller-card">
        <v-list-tile-avatar>
          <v-icon :class="[caller.incall ? 'green darken-2':'grey lighten-1', 'white--text']">
            {{ caller.incall ? 'phone_in_talk' : 'phone_forwarded' }}
          </v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ caller.clidName }} &lt;{{ caller.clidNum }}&gt;</v-list-tile-title>
          <v-list-tile-sub-title class="caption">
            <v-tooltip v-if="caller.incall" left>
              <span slot="activator" class="green--text darken-2--text">
                <v-icon class="data-icon">phone_in_talk</v-icon>
                <strong>{{ caller.answerTime | formatTime }}</strong>
              </span>
              <span>On call time</span>
            </v-tooltip>
            <v-tooltip left>
              <span slot="activator">
                <v-icon class="data-icon">hourglass_full</v-icon>
                {{ caller.wait | formatTime }}
              </span>
              <span>Wait in queue time</span>
            </v-tooltip>
          </v-list-tile-sub-title>
          <v-list-tile-sub-title class="caption">
            <v-tooltip v-if="caller.incall" left>
              <span slot="activator">
                <v-icon class="data-icon">contact_phone</v-icon>
                {{ memberChan(caller) }}
              </span>
              <span>Agent connected</span>
            </v-tooltip>
            <span v-else>
              <v-icon class="data-icon">watch_later</v-icon>
              Position in queue: {{ caller.position }}
            </span>
          </v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-snackbar v-model="notify" :timeout="3000" color="info" top right>
      <v-icon color="white">info_outline</v-icon>
      {{ notifyText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'QueueData',
  data () {
    return {
      notify: false,
      notifyText: ''
    }
  },
  computed: {
    ...mapGetters({
      queues: 'getAllQueues',
      members: 'getSelectedMembers',
      callers: 'getSelectedCallers',
      getSelectedQueue: 'getSelectedQueue'
    }),
    queueSelect: {
      get: function () {
        return this.getSelectedQueue
      },
      set: function (val) {
        this.selectedQueue(val)
      }
    }
  },
  methods: {
    ...mapActions(['pauseAgentInSelectedQueue', 'selectedQueue', 'memberDragStart', 'memberDragStop']),
    pauseAgentToggle: function (member) {
      this.pauseAgentInSelectedQueue({ member: member, pause: !member.paused })
      this.notifyText = `${member.paused ? 'Activate' : 'Pause'} agent ${member.name}`
      this.notify = true
    },
    memberChan: function (caller) {
      const member = this.members.find(m => m.chan === caller.chan)
      if (member) {
        return member.name
      } else {
        return ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.data-icon {font-size: 16px}
</style>

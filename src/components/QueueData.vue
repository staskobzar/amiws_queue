<template>
  <b-card header-tag="header">
    <h5 class="block-header" v-if="selectedQueue" slot="header">
      <icon name="users"/>  {{ selectedQueue }} agents and callers
    </h5>
    <div v-if="!selectedQueue">
      Select queue to see agents and callers details
    </div>
    <div class="queue-data" v-if="selectedQueue">
      <div class="members">
        <h6><icon name="user-circle-o"/> Queue agents ({{ members.length }})</h6>
        <b-card no-body v-for="(member, i) in members" :key="i" class="member-card">
          <div>
            <b-button-group size="sm">
              <b-btn v-b-tooltip
                class="btn-activate-agent"
                :disabled="!member.paused"
                :variant="member.paused ? 'outline-secondary' : 'secondary'"
                @click="pauseAgent(member, false)"
                title="UnPause agent" >
                <icon name="play-circle" class="icon-unpaused"/>
              </b-btn>
              <b-btn v-b-tooltip
                class="btn-pause-agent"
                :disabled="member.paused"
                :variant="member.paused ? 'secondary' : 'outline-secondary'"
                @click="pauseAgent(member, true)"
                title="Pause agent" >
                <icon name="pause-circle" class="icon-paused"/>
              </b-btn>
            </b-button-group>
            <icon name="volume-control-phone" style="color: green" v-if="member.incall"/>
            <icon name="phone" flip="vertical" v-else/>
            <span :class="['member', (member.paused ? 'paused' : 'unpaused')]"
              v-b-tooltip.hover
              :title="member.paused ? 'Paused' : 'Unpaused'">
              {{ member.name }}
            </span>
          </div>
          <div class="member-stats">
            <div>
              <span class="stats-item">
                <icon name="phone-square"/>
                Calls taken: {{ member.callsTaken}}
              </span>
              <span class="stats-item">
                <icon name="calendar-check-o"/>
                Last call taken: <span class="last-call-taken">{{ member.lastCall | formatFromUnixtime }}</span>
              </span>
            </div>
            <div>
              <span class="stats-item">
                <icon name="clock-o"/>
                Last Hold time: {{ member.lastHoldtime | formatTime }}
              </span>
              <span class="stats-item">
                <icon name="clock-o"/>
                Last Talk time: {{ member.lastTalktime | formatTime }}
              </span>
            </div>
          </div>
        </b-card>
      </div>

      <div class="callers">
        <h6> <icon name="user"/> Queue callers ({{ callers.length }})</h6>
          <b-card no-body
            v-for="(caller, i) in callers"
            :key="i" class="caller-card">
          <div>
            <span v-if="caller.status === 1" class="waiting">
              <icon name="hourglass-half"/>
              [waiting position {{ caller.position }}]
            </span>
            <span v-else class="answered">
              <icon name="volume-control-phone" />
              [answered]
            </span>
            {{ caller.clidName }} &lt;{{ caller.clidNum }}&gt;
          </div>
        </b-card>
      </div>
    </div>
  </b-card>
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
  filters: {
    formatFromUnixtime: function (val) {
      if (+val <= 0) {
        return 'N/A'
      }
      const t = new Date(val * 1000)
      const pad = (num) => num < 10 ? `0${num}` : `${num}`
      const [y, m, d] = [t.getFullYear(), t.getMonth(), t.getDay()]
      const [hh, mm, ss] = [t.getHours(), t.getMinutes(), t.getSeconds()]
      const date = `${y}-${pad(m + 1)}-${pad(d)}`
      const time = `${pad(hh)}:${pad(mm)}:${pad(ss)}`
      return `${date} ${time}`
    }
  },
  methods: {
    ...mapActions(['pauseAgentInSelectedQueue']),
    pauseAgent: function (member, pause) {
      this.pauseAgentInSelectedQueue({ member: member, pause: pause })
      this.$root.$emit('bv::hide::tooltip')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card { margin-bottom: 5px; }
.block-header { color: #007bff}
.icon-paused{ color: orange }
.icon-unpaused{ color: green }
.fa-icon { margin-bottom: -3px; }
.member{font-weight: bold}
.member.paused {color: #797979}
.member-stats{font-size: 13px; color: #ADADAD}
.stats-item{margin-left: 10px}
.caller-card{padding-left: 10px;font-size: 0.9rem}
.waiting, .answered{font-size: 13px; color: #ADADAD}
.answered {color: #65ae65; font-weight: bold}
.waiting {font-weight: bold}
</style>

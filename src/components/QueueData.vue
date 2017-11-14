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
        <h6><icon name="user-circle-o"/>
            Queue agents ({{ members.length }})</h6>
        <b-card no-body v-for="(member, i) in members" :key="i" class="member-card">
          <div>
            <b-button-group size="sm">
              <b-btn v-b-tooltip.hover
                :disabled="!member.paused"
                :variant="member.paused ? 'outline-secondary' : 'secondary'"
                @click="pauseAgentInSelectedQueue({member: member, pause: false})"
                title="UnPause agent" >
                <icon name="play-circle" class="icon-unpaused"/>
              </b-btn>
              <b-btn v-b-tooltip.hover
                :disabled="member.paused"
                :variant="member.paused ? 'secondary' : 'outline-secondary'"
                @click="pauseAgentInSelectedQueue({member: member, pause: true})"
                title="Pause agent" >
                <icon name="pause-circle" class="icon-paused"/>
              </b-btn>
            </b-button-group>
            <span :class="['member', (member.paused ? 'paused' : 'unpaused')]"
              v-b-tooltip.hover
              :title="member.paused ? 'Paused' : 'Unpaused'">
              {{ member.name }}
            </span>
          </div>
          calls taken: {{ member.callsTaken}}
          last call: {{ member.lastCall }}
          in call: {{ member.incall }}
          status: {{ member.status }}
        </b-card>
      </div>

      <div class="callers">
        <h6> <icon name="user"/>
            Queue callers ({{ callers.length }})</h6>
        <b-card no-body v-for="(caller, i) in callers" :key="i" class="caller-card">
          <div>
            {{ caller.clidName }} {{ caller.clidNum }}
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
    members: 'getSelectedMembers',
    callers: 'getSelectedCallers',
    selectedQueue: 'getSelectedQueue'
  }),
  filters: {
    memberStatusIconName: function (member) {
      return member.paused ? 'pause-circle-o' : 'play-circle-o'
    },
    memberStatusIconClass: function (member) {
      return member.paused ? 'paused-true' : 'paused-false'
    }
  },
  methods: mapActions(['pauseAgentInSelectedQueue'])
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
.member.paused {color: #AAA}
</style>

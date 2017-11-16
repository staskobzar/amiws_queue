<template>
  <b-card-group columns>
    <b-card v-for="(queue, index) in queues"
      :key="index"
      header-tag="header"
      footer-tag="footer"
      border-variant="secondary"
      :header-class="{'queue-active': isActive(queue.name)}"
      :footer-class="{'queue-active': isActive(queue.name)}"
      class="queue-card">

      <b-row slot="header">
        <b-col cols="12" md="8">
          <icon name="arrow-circle-right" :class="{'queue-active-icon': isActive(queue.name)}"/>
            <strong>{{ queue.name }}</strong>
        </b-col>
        <b-col cols="6" md="4">
          <b-button-group size="sm">
            <b-btn v-b-tooltip.hover
              title="Pause all agents in queue"
              @click="pauseAll(queue.name, queue.sid, true)"
              variant="outline-secondary">
              <icon name="pause-circle-o"/>
            </b-btn>
            <b-btn v-b-tooltip.hover
              title="Activate all agents in queue"
              @click="pauseAll(queue.name, queue.sid, false)"
              variant="outline-secondary">
              <icon name="play-circle-o"/>
            </b-btn>
          </b-button-group>
          <b-btn v-b-tooltip.hover
            title="Show agents/callers list"
            @click="selectedQueue(queue.name)"
            size="sm">
            <icon name="users"/>
          </b-btn>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div>
            <icon name="hourglass-half"/>
            Avg. Hold Time: <span class="holdtime">{{ queue.holdtime | formatTime }}</span>
          </div>
          <div>
            <icon name="chain-broken"/>
            Abandoned calls: {{ queue.abandoned }}
          </div>
          <div>
            <icon name="user-circle-o"/>
            Agents: <span class="members">{{ queue | membersTotal }}</span>
            (
            <icon name="pause-circle-o" v-b-tooltip.hover title="Paused agents" :class="{'icon-alert': allPaused(queue)}"/>
            <span class="members-paused">{{ queue | membersPaused }}</span> /
            <icon name="play-circle-o" v-b-tooltip.hover title="Unpaused agents" :class="{'icon-good': allUnpaused(queue)}"/>
            <span class="members-unpaused">{{ queue | membersUnpaused }}</span>)
          </div>
        </b-col>
        <b-col>
          <div>
            <icon name="clock-o"/>
            Avg. Talk Time: <span class="talktime">{{ queue.talktime | formatTime }}</span>
          </div>
          <div>
            <icon name="phone"/>
            Completed calls: {{ queue.completed }}
          </div>
          <div>
            <icon name="user"/>
            Callers: <span class="callers">{{ queue.callers.length }}</span>
            (<icon name="hourglass-start" scale="0.8" v-b-tooltip.hover title="Callers waiting"/>
            <span class="callers-waiting">{{ queue | callersWaiting }}</span> /
            <icon name="volume-control-phone" v-b-tooltip.hover title="On call callers"/>
            <span class="callers-oncall">{{ queue | callersOncall }}</span>)
          </div>
        </b-col>
      </b-row>

      <div slot="footer" bg-variant="light">
        <span class="info-box" v-b-tooltip.hover title="Queue Weight">
          <icon name="balance-scale" scale="0.9"/>
          {{ queue.weight }}
        </span>
        <span class="info-box" v-b-tooltip.hover title="Max calls limit for the queue">
          <icon name="level-up" scale="0.9"/>
          {{ queue | maxCalls }}
        </span>
        <span class="info-box" v-b-tooltip.hover title="A strategy for how to handle the queue">
          <icon name="exchange" scale="0.9"/>
          {{ queue.strategy }}
        </span>
      </div>
    </b-card>
  </b-card-group>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as cstate from '../store/caller-state'

export default {
  name: 'QueuesList',
  data () {
    return {
      title: 'Queues Grid'
    }
  },
  computed: {
    ...mapGetters({
      queues: 'getQueues',
      getSelectedQueue: 'getSelectedQueue',
      perPage: 'getPerPage',
      curPage: 'getCurPage'
    })
  },
  methods: {
    ...mapGetters([ 'getQnameFilter' ]),
    ...mapActions([ 'selectedQueue', 'pauseAllAgents' ]),
    isActive: function (name) {
      return this.getSelectedQueue === name
    },
    allPaused: function (queue) {
      return queue.members.length === queue.members.filter(m => m.paused).length
    },
    allUnpaused: function (queue) {
      return queue.members.length === queue.members.filter(m => !m.paused).length
    },
    pauseAll: function (name, sid, pause) {
      const pauseStatus = pause ? 'paused' : 'active'
      this.$notify({group: 'main', text: `Set ${pauseStatus} all agents in queue "${name}"`})
      this.pauseAllAgents({ name, sid, pause })
      this.$notify()
    }
  },
  filters: {
    membersTotal (queue) {
      return queue.members.length
    },
    membersPaused (queue) {
      return queue.members.filter(m => m.paused).length
    },
    membersUnpaused (queue) {
      return queue.members.filter(m => !m.paused).length
    },
    callersWaiting (queue) {
      return queue.callers.filter(c => c.status === cstate.JOINED).length
    },
    callersOncall (queue) {
      return queue.callers.filter(c => c.status === cstate.ANSWERED).length
    },
    maxCalls (queue) {
      return queue.max > 0 ? queue.max : 'unlimited'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-columns { column-count: 2; color: #2d2f33; }
.card-footer { text-align: left }
.card-footer .info-box {
  border: 1px solid rgba(63, 81, 181, 0.47);
  padding: 3px 5px;
  margin: 0px 3px;
  border-radius: 0.2rem;
  cursor: default;
  font-size: 0.83rem;
}
.card-body {
  font-size: 0.90rem;
  color: #777
}
.queue-active-icon { color: #007bff }
.fa-icon { margin-bottom: -3px; }
.queue-card { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
.queue-active { background-color: rgba(0, 0, 0, 0.12); }
.icon-alert {color: orange}
.icon-good {color: green}
</style>

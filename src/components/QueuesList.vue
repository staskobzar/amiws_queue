<template>
  <v-container fluid grid-list-md class="grey lighten-4">
    <v-layout row wrap>
      <v-flex v-bind="{ [`xs${getSelectedQueue.length > 0 ? '6' : '4'}`]: true }"
        v-for="(queue, index) in queues" :key="index">
        <v-card hover :class="[{'elevation-15': isActive(queue.name)}, 'queue-card']"
          @dragover.prevent
          @drop="dragDrop(queue)"
          @dragleave="dragLeave(index)"
          @dragenter="dragEnter(index)">
          <v-card-title primary-title class="grey lighten-3">
            <h3><v-icon>people</v-icon>
              <span class="card-header">{{ queue.name }}</span>
            </h3>
          </v-card-title>
          <v-tooltip top>
            <v-chip outline color="secondary" slot="activator" disabled>
              W <v-icon class="title-icon">timelapse</v-icon>
              <strong>{{ queue.weight }}</strong>
            </v-chip>
            <span>Queue Weight</span>
          </v-tooltip>
          <v-tooltip top>
            <v-chip outline color="secondary" slot="activator" disabled>
              M <v-icon class="title-icon">vertical_align_top</v-icon>
              <strong>{{ queue | maxCalls }}</strong>
            </v-chip>
            <span>Max calls limit for the queue</span>
          </v-tooltip>
          <v-tooltip top>
            <v-chip outline color="secondary" slot="activator" disabled>
              S <v-icon class="title-icon">build</v-icon>
              <strong>{{ queue.strategy }}</strong>
            </v-chip>
            <span>A strategy for how to handle the queue</span>
          </v-tooltip>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout row wrap class="grey--text">
              <v-flex>
                <div>
                  <v-icon>storage</v-icon>
                  <strong>{{ queueSrvName(queue) }}</strong>
                </div>
                <div>
                  <v-icon>timer</v-icon>
                  Avg. Hold Time: <span class="holdtime">{{ queue.holdtime | formatTime }}</span>
                </div>
                <div>
                  <v-icon>history</v-icon>
                  Abandoned calls: {{ queue.abandoned }}
                </div>
                <div>
                  <v-icon>headset_mic</v-icon>
                  Agents: <span class="members">{{ queue | membersTotal }}</span>
                  (
                  <v-tooltip left>
                    <span slot="activator">
                      <v-icon class="qdata-icon" :color="allPaused(queue)">
                        pause_circle_outline</v-icon>
                      <span class="members-paused">{{ queue | membersPaused }}</span>
                    </span>
                    <span>Paused agents</span>
                  </v-tooltip> /
                  <v-tooltip left>
                    <span slot="activator">
                      <v-icon class="qdata-icon" :color="allUnpaused(queue)">
                        play_circle_outline</v-icon>
                      <span class="members-unpaused">{{ queue | membersUnpaused }}</span>
                    </span>
                    <span>Active agents</span>
                  </v-tooltip>)
                </div>
              </v-flex>
              <v-flex>
                <div>
                  <v-icon>schedule</v-icon>
                  Avg. Talk Time: <span class="talktime">{{ queue.talktime | formatTime }}</span>
                </div>
                <div>
                  <v-icon>check_circle</v-icon>
                  Completed calls: {{ queue.completed }}
                </div>
                <div>
                  <v-icon>account_circle</v-icon>
                  Callers: <span class="callers">{{ queue.callers.length }}</span>
                  (
                  <v-tooltip left>
                    <span slot="activator">
                      <v-icon class="qdata-icon">hourglass_full</v-icon>
                      <span class="callers-waiting">{{ queue | callersWaiting }}</span>
                    </span>
                    <span>Callers waiting</span>
                  </v-tooltip> /
                  <v-tooltip left>
                    <span slot="activator">
                      <v-icon class="qdata-icon">call</v-icon>
                      <span class="callers-oncall">{{ queue | callersOncall }}</span>)
                    </span>
                    <span>On call callers</span>
                  </v-tooltip>)
                </div>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="grey lighten-4">
            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn icon @click="pauseAll(queue.name, queue.sid, true)" slot="activator">
                <v-icon>pause</v-icon></v-btn>
              <span>Pause all agents in the queue</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn icon @click="pauseAll(queue.name, queue.sid, false)" slot="activator">
                <v-icon>play_arrow</v-icon></v-btn>
              <span>Activate all agents in the queue</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn icon slot="activator" @click="selectedQueue(queue.name)"><v-icon>list</v-icon></v-btn>
              <span>Show agents/callers list</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="notify" :timeout="3000" color="info" top right>
      <v-icon color="white">info_outline</v-icon>
      {{ notifyText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as cstate from '../store/caller-state'

export default {
  name: 'QueuesList',
  data () {
    return {
      notify: false,
      notifyText: ''
    }
  },
  computed: {
    ...mapGetters({
      queues: 'getQueues',
      queueSrvName: 'getQueueServerName',
      getSelectedQueue: 'getSelectedQueue'
    })
  },
  methods: {
    ...mapActions([ 'selectedQueue', 'pauseAllAgents', 'addQueueMember' ]),
    ...mapGetters([ 'getDragMember' ]),
    isActive: function (name) {
      return this.getSelectedQueue === name
    },
    allPaused: function (queue) {
      return queue.members.length === queue.members.filter(m => m.paused).length ? 'orange lighten-2' : ''
    },
    allUnpaused: function (queue) {
      return queue.members.length === queue.members.filter(m => !m.paused).length ? 'green accent-4' : ''
    },
    pauseAll: function (name, sid, pause) {
      const pauseStatus = pause ? 'paused' : 'active'
      this.notifyText = `Set ${pauseStatus} all agents in queue "${name}"`
      this.pauseAllAgents({ name, sid, pause })
      this.notify = true
    },
    dragEnter: function (index) {
      // console.log(`drag enter: ${index}`)
    },
    dragLeave: function (index) {
      // console.log(`drag leave: ${index}`)
    },
    dragDrop: function (queue) {
      const member = this.getDragMember()
      if (queue.name === this.getSelectedQueue) {
        return
      }
      this.addQueueMember({ queue, member })
      this.notifyText = `Adding agent "${member.name}" to queue "${queue.name}"`
      this.notify = true
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
      return queue.members.filter(m => m.incall).length
    },
    maxCalls (queue) {
      return queue.max > 0 ? queue.max : 'unlimited'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-icon {font-size: 14px}
.qdata-icon {font-size: 15px}
</style>

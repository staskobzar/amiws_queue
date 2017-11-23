<template>
  <v-container fluid grid-list-md class="grey lighten-4">
    <v-layout row wrap>
      <v-flex xs6 v-for="(queue, index) in queues" :key="index">
        <v-card>
          <v-card-title primary-title class="grey lighten-3">
            <h3><v-icon>people</v-icon>
            {{ queue.name }}</h3>
          </v-card-title>
          <v-chip outline color="secondary">
            Weight
            <v-icon class="title-icon">timelapse</v-icon>
            <strong>{{ queue.weight }}</strong>
          </v-chip>
          <v-chip outline color="secondary">
            Max calls
            <v-icon class="title-icon">vertical_align_top</v-icon>
            <strong>{{ queue | maxCalls }}</strong>
          </v-chip>
          <v-chip outline color="secondary">
            Strategy
            <v-icon class="title-icon">build</v-icon>
            <strong>{{ queue.strategy }}</strong>
          </v-chip>
          <v-divider></v-divider>
          <v-card-text>
            <div class="grey--text">
              <v-icon>timer</v-icon>
              Avg. Hold Time: <span class="holdtime">{{ queue.holdtime | formatTime }}</span>
            </div>
            <div class="grey--text">
              <v-icon>history</v-icon>
              Abandoned calls: {{ queue.abandoned }}
            </div>
            <div class="grey--text">
              <v-icon>headset_mic</v-icon>
              Agents: <span class="members">{{ queue | membersTotal }}</span>
              (
              <v-icon color="grey" style="font-size: 16px">pause_circle_outline</v-icon>
              <span>{{ queue | membersPaused }}</span> /
              <v-icon color="grey">play_circle_outline</v-icon>
              <span>{{ queue | membersUnpaused }}</span>)
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions class="grey lighten-4">
            <v-tooltip top>
              <v-btn icon slot="activator"><v-icon>pause</v-icon></v-btn>
              <span>Pause all agents in the queue</span>
            </v-tooltip>
            <v-tooltip top>
              <v-btn icon slot="activator"><v-icon>play_arrow</v-icon></v-btn>
              <span>Activate all agents in the queue</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <v-btn icon slot="activator"><v-icon>people_outline</v-icon></v-btn>
              <span>Show agents/callers list</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
.title-icon {font-size: 14px}
</style>

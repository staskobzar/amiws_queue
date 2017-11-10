<template>
  <b-card-group columns>
    <b-card v-for="(queue, index) in queues"
      :key="index"
      header-tag="header"
      footer-tag="footer"
      border-variant="secondary"
      class="queue-card">

      <b-row slot="header" class="queue-header">
        <b-col cols="12" md="8">
          <icon name="arrow-circle-right" class="icon-queue-name"/>
            <strong>{{ queue.name }}</strong>
        </b-col>
        <b-col cols="6" md="4">
          <b-button-group size="sm">
            <b-btn v-b-tooltip.hover
              title="Pause all agents"
              variant="outline-secondary">
              <icon name="pause-circle-o"/>
            </b-btn>
            <b-btn v-b-tooltip.hover
              title="Unpause all agents"
              variant="outline-secondary">
              <icon name="play-circle-o"/>
            </b-btn>
          </b-button-group>
          <b-btn v-b-tooltip.hover
            title="Show agents/callers list"
            size="sm">
            <icon name="users"/>
          </b-btn>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div>
            Hold Time: {{ queue.holdtime }} / Talk Time: {{ queue.talktime }}
          </div>
          <div>
            Completed: {{ queue.completed }} / Abandoned: {{ queue.abandoned }}
          </div>
        </b-col>
        <b-col>
          <div>
            Agents: <span class="members">{{ queue | membersTotal }}</span>
            (P:<span class="members-paused">{{ queue | membersPaused }}</span> /
            U:<span class="members-unpaused">{{ queue | membersUnpaused }}</span>)
          </div>
          <div>
            Callers: <span class="callers">{{ queue.callers.length }}</span>
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
import Icon from 'vue-awesome/components/Icon'
import { mapGetters } from 'vuex'

import 'vue-awesome/icons'

export default {
  name: 'QueuesList',
  data () {
    return {
      title: 'Queues Grid'
    }
  },
  components: { Icon },
  computed: mapGetters({ queues: 'getQueues' }),
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
  font-size: 0.94rem;
}
.icon-queue-name { color: #9e9e9e }
.fa-icon { margin-bottom: -3px; }
.queue-card { box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); }
</style>

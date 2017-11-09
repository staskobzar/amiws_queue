<template>
  <b-card-group columns>
    <b-card v-for="(queue, index) in queues"
      :key="index"
      :header="queue.name"
      class="queue-card">

      <div>
        Weight: {{ queue.weight }}
      </div>
      <div>
        Calls: C: {{ queue.completed }}, A: {{ queue.abandoned }}
      </div>
      <div>
        Max calls: {{ queue | maxCalls }}
      </div>
      <div>
        Strategy: {{ queue.strategy }}
      </div>
      <div>
        Members: <span class="members">{{ queue | membersTotal }}</span>
        (P:<span class="members-paused">{{ queue | membersPaused }}</span> /
        U:<span class="members-unpaused">{{ queue | membersUnpaused }}</span>)
      </div>
      <div>
        Callers: <span class="callers">{{ queue.callers.length }}</span>
      </div>

    </b-card>
  </b-card-group>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'QueuesList',
  data () {
    return {
      title: 'Queues Grid'
    }
  },
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
</style>

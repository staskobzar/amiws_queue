<template>
  <b-card-group columns>
    <b-card v-for="(queue, index) in queues"
      :key="index"
      :header="queue.name"
      class="queue-card">
      {{ 'Queue #' + index }}
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
  computed: mapGetters({ queues: 'getQueues' })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

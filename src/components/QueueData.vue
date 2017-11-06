<template>
  <div class="queue-data">
    <div class="members">
      <h3>Queue agents</h3>
      <b-card no-body v-for="i in 3" :key="i">
        Agent {{i}}
      </b-card>
    </div>

    <div class="callers">
      <h3>Queue callers</h3>
      <b-card no-body v-for="i in 8" :key="i">
        Caller {{i}}
      </b-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'QueueData',
  data () {
    return {
      msg: 'Members and Callers'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card { margin-bottom: 5px; }
</style>

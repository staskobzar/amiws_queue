<template>
  <b-card-group columns>
    <b-card v-for="i in 50" :key="i" header="Queue">
      {{ 'Queue #' + i }}
    </b-card>
  </b-card-group>
</template>

<script>
export default {
  name: 'QueuesList',
  data () {
    return {
      title: 'Queues Grid'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

<template>
  <b-card-group deck>
    <b-card>
      Active calls
    </b-card>

    <b-card>
      Answered / Abondoned Calls
    </b-card>

    <b-card>
      Service Level %
    </b-card>

    <b-card>
      Total paused/unpaused agents
    </b-card>

  </b-card-group>
</template>

<script>
export default {
  name: 'TopStats',
  data () {
    return {
      title: 'Statistics Boxes'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)}
</style>

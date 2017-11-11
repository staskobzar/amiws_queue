<template>
  <div class="ami-servers-list">
    <b-card v-for="server in amiServers"
      :key="server.id"
      header-tag="header"
      class="ami-server">
      <h5 slot="header">{{ server.name }}</h5>
      <div class="queues-num"> Queues: {{ getQueuesPerServer(server.id) }}</div>
    </b-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AmiServers',
  data () {
    return {
      title: 'List of AMI servers'
    }
  },
  computed: mapGetters({
    amiServers: 'getAmiServers',
    getQueuesPerServer: 'getQueuesPerServer'
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ami-servers { margin-left: 15px; }
.card { margin-bottom: 10px }
</style>

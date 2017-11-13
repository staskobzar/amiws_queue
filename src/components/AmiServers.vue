<template>
  <div class="ami-servers-list">
    <b-card v-for="server in amiServers"
      :key="server.id"
      header-tag="header"
      class="ami-server">
      <div slot="header">
        <icon name="server" scale="2" class="server-icon"/>
        {{ server.name }}
      </div>
      <div>
        Queues: <span class="queues-num">{{ getQueuesPerServer(server.id) }}</span>
      </div>
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
.server-icon {float: left; margin-right: 10px; color: #007bff}
.queues-num {font-weight: bold}
.card { margin-bottom: 10px }
</style>

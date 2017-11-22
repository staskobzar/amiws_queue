<template>
  <v-container fluid grid-list-lg>
    <v-toolbar>
      <v-icon>storage</v-icon>
      <v-toolbar-title>
        Servers
      </v-toolbar-title>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex v-for="server in amiServers"
        :key="server.id" class="ami-server" xs12>
        <v-card color="grey lighten-2">
          <v-card-title primary-title>
            <v-icon>{{ server.ssl ? 'lock_outline' : 'lock_open' }}</v-icon>
            <div class="headline">{{ server.name }}</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>Queues: <span class="queues-num">{{ getQueuesPerServer(server.id) }}</span></div>
            <div>Uptime since: {{ server.started.getTime() / 1000 | formatFromUnixtime }} </div>
            <div>Reloaded: {{ server.reloaded.getTime() / 1000 | formatFromUnixtime }} </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AmiServers',
  computed: mapGetters({
    amiServers: 'getAmiServers',
    getQueuesPerServer: 'getQueuesPerServer'
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.queues-num {font-weight: bold}
</style>

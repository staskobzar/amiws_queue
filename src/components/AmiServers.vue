<template>
  <v-container fluid grid-list-lg>
    <v-toolbar card color="white" prominent>
      <v-toolbar-title>
        <v-icon>storage</v-icon>
        Servers
      </v-toolbar-title>
    </v-toolbar>
    <v-layout row wrap>
      <v-flex v-for="server in amiServers"
        :key="server.id" class="ami-server" xs12>
        <v-card>
          <v-card-title class="grey lighten-2">
            <v-icon>{{ server.ssl ? 'lock_outline' : 'lock_open' }}</v-icon>
            <div class="title">{{ server.name }}</div>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div>Queues: <span class="queues-num">{{ getQueuesPerServer(server.id) }}</span></div>
            <div>Up since:
              <strong>{{ server.started.getTime() / 1000 | formatFromUnixtime }} </strong>
            </div>
            <div>Reloaded:
              <strong>{{ server.reloaded.getTime() / 1000 | formatFromUnixtime }} </strong>
            </div>
            <v-divider></v-divider>
            <v-switch
              :value="server.id"
              :label="switchLabel(server.id)"
              v-model="servers">
            </v-switch>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="notify" :timeout="4000" color="info" top left>
      At least one server must be selected.
      <v-icon color="white">warning</v-icon>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'AmiServers',
  data () {
    return {
      notify: false
    }
  },
  methods: {
    ...mapActions(['setSelectedServers']),
    switchLabel: function (sid) {
      return this.selectedServers.includes(sid) ? `On` : `Off`
    }
  },
  computed: {
    ...mapGetters({
      selectedServers: 'getSelectedServers',
      amiServers: 'getAmiServers',
      getQueuesPerServer: 'getQueuesPerServer'
    }),
    servers: {
      get: function () {
        return this.selectedServers
      },
      set: function (val) {
        if (val.length) {
          this.setSelectedServers(val)
        } else {
          this.notify = true
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.queues-num {font-weight: bold}
</style>

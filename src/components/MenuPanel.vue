<template>
  <v-container fluid>
    <v-toolbar>
      <v-text-field
        prepend-icon="search"
        hide-details single-linei
        :label="qnameFilter ? 'Filtered ' + totalQueues : 'Queue name'"
        :error="(qnameFilter && totalQueues === 0) || totalQueues === 0"
        v-model="qnameFilter"></v-text-field>

      <v-spacer></v-spacer>

      <v-pagination total-visible="5" :length="pageLen" v-model="currentPage"></v-pagination>

      <v-spacer></v-spacer>

      <v-tooltip top>
        <v-btn round dark color="primary" slot="activator"
          @click.native.stop="pauseAll()">
          <v-icon>pause_circle_outline</v-icon>
        </v-btn>
        <span>Pause all agents in all queues</span>
      </v-tooltip>
      <v-tooltip top>
        <v-btn round dark color="primary" slot="activator"
          @click.native.stop="unPauseAll()">
          <v-icon>play_circle_outline</v-icon>
        </v-btn>
        <span>Activate all agents in all queues</span>
      </v-tooltip>
    </v-toolbar>

    <v-dialog v-model="confirmDlg" max-width="360">
      <v-card>
        <v-card-title class="headline">{{ confirm.title }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>{{ confirm.body }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click.native="confirmDlg = false">Cancel</v-btn>
          <v-btn @click.native.stop="doPause()" dark color="green darken-1">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="notify" :timeout="3000" color="info" top right>
      <v-icon color="white">info_outline</v-icon>
      {{ notifyText }}
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      notify: false,
      notifyText: '',
      confirmDlg: false,
      confirm: {
        title: 'Confirm title',
        body: 'Confirm body',
        pause: true
      }
    }
  },
  methods: {
    ...mapGetters(['getQueues', 'getQueuesFiltered', 'getPerPage', 'getCurPage', 'getQnameFilter']),
    ...mapActions(['setCurPage', 'setQueuesFilter', 'pauseAllAgents']),
    pauseAll: function () {
      this.confirm.title = `Confirm pause all agents`
      this.confirm.body = `Pause all agents in all queues. When filtered will pause agents only in filtered queues.`
      this.confirm.pause = true
      this.confirmDlg = true
    },
    unPauseAll: function () {
      this.confirm.title = `Confirm un-pause all agents`
      this.confirm.body = `Activate/UnPause all agents in all queues. When filtered will unpause agents only in filtered queues.`
      this.confirm.pause = false
      this.confirmDlg = true
    },
    doPause: function () {
      const pause = this.confirm.pause ? 'paused' : 'unpuased'
      const qnum = this.getQueuesFiltered().length
      this.notifyText = `Set ${pause} all agents in ${qnum} queue${qnum > 1 ? 's' : ''}`
      this.getQueuesFiltered().forEach(q => {
        this.pauseAllAgents({name: q.name, sid: q.sid, pause: this.confirm.pause})
      })
      this.confirmDlg = false
      this.notify = true
    }
  },
  computed: {
    totalQueues: function () {
      return this.getQueuesFiltered().length
    },
    perPage: function () {
      return this.getPerPage()
    },
    currentPage: {
      get: function () {
        return this.getCurPage()
      },
      set: function (page) {
        this.setCurPage(page)
      }
    },
    qnameFilter: {
      get: function () {
        return this.getQnameFilter()
      },
      set: function (filter) {
        this.setCurPage(1)
        this.setQueuesFilter(filter)
      }
    },
    pageLen: function () {
      return Math.ceil(this.totalQueues / this.perPage)
    }
  }
}
</script>

<style scoped>
.navbar {margin-bottom: 10px; border-radius: 0.5rem}
.filtered-lebel {font-weight: bold; color: green; font-size: 0.9rem}
</style>

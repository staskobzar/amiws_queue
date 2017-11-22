<template>
  <v-toolbar color="white" light dense>
  </v-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
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
      this.$refs.confirmDlg.show()
    },
    unPauseAll: function () {
      this.confirm.title = `Confirm un-pause all agents`
      this.confirm.body = `Activate/UnPause all agents in all queues. When filtered will unpause agents only in filtered queues.`
      this.confirm.pause = false
      this.$refs.confirmDlg.show()
    },
    doPause: function () {
      const pause = this.confirm.pause ? 'paused' : 'unpuased'
      const qnum = this.getQueuesFiltered().length
      this.$notify({group: 'main', text: `Set ${pause} all agents in ${qnum} queue${qnum > 1 ? 's' : ''}`})
      this.getQueuesFiltered().forEach(q => {
        this.pauseAllAgents({name: q.name, sid: q.sid, pause: this.confirm.pause})
      })
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
    }
  }
}
</script>

<style scoped>
.navbar {margin-bottom: 10px; border-radius: 0.5rem}
.filtered-lebel {font-weight: bold; color: green; font-size: 0.9rem}
</style>

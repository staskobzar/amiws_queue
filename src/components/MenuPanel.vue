<template>
  <b-navbar type="light" variant="light">
    <b-nav-form>
      <b-form-input class="mr-sm-2"
        type="text" v-model="qnameFilter"
        placeholder="Queue name">
      </b-form-input>
      <span v-if="qnameFilter" class="filtered-lebel">
        <icon name="check" />
        filtered {{ totalQueues }}
      </span>
    </b-nav-form>

    <b-navbar-nav v-if="totalQueues > perPage">
      <b-pagination
        :total-rows="totalQueues"
        v-model="currentPage"
        :per-page="perPage">
      </b-pagination>
    </b-navbar-nav>

    <b-navbar-nav>
      <b-button-group size="lg">
        <b-btn v-b-tooltip.hover
          variant="outline-primary"
          @click="pauseAll"
          title="Pause all agents in all queues">
          <icon name="pause-circle"/>
        </b-btn>
        <b-btn v-b-tooltip.hover
          variant="outline-primary"
          @click="unPauseAll"
          title="UnPause all agents in all queues">
          <icon name="play-circle"/>
        </b-btn>
      </b-button-group>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  methods: {
    ...mapGetters(['getQueues', 'getQueuesFiltered', 'getPerPage', 'getCurPage', 'getQnameFilter']),
    ...mapActions(['setCurPage', 'setQueuesFilter', 'pauseAllAgents']),
    pauseAll: function () {
      this.getQueuesFiltered().forEach(q => {
        this.pauseAllAgents({name: q.name, sid: q.sid, pause: true})
      })
    },
    unPauseAll: function () {
      this.getQueuesFiltered().forEach(q => {
        this.pauseAllAgents({name: q.name, sid: q.sid, pause: false})
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
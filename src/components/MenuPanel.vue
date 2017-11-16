<template>
  <div>
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

    <b-modal ref="confirmDlg" @ok="doPause" :title="confirm.title">
      {{ confirm.body }}
    </b-modal>
  </div>
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

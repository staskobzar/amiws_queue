<template>
  <b-navbar type="light" variant="light">
    <b-nav-form>
      <b-form-input class="mr-sm-2" type="text" placeholder="Queue name">
      </b-form-input>
      <b-button-group>
        <b-btn v-b-tooltip.hover
          title="Reset queues filter"
          variant="outline-primary"
          class="my-2 my-sm-0" >
          Reset
        </b-btn>
        <b-btn v-b-tooltip.hover
          title="Filter by queues name"
          variant="outline-primary"
          class="my-2 my-sm-0" >
          Filter
        </b-btn>
      </b-button-group>
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
          title="Pause all agents in all queues">
          <icon name="pause-circle"/>
        </b-btn>
        <b-btn v-b-tooltip.hover
          variant="outline-primary"
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
    ...mapGetters(['getQueues', 'getPerPage', 'getCurPage']),
    ...mapActions(['setCurPage'])
  },
  computed: {
    totalQueues: function () {
      return this.getQueues().length
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
    }
  }
}
</script>

<style scoped>
.navbar {margin-bottom: 10px; border-radius: 0.5rem}
</style>

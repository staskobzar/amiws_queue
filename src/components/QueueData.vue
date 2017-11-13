<template>
  <b-card header-tag="header">
    <h5 class="block-header" v-if="selectedQueue" slot="header">
      <icon name="users"/>  {{ selectedQueue }}
    </h5>
    <div v-if="!selectedQueue">
      Select queue to see agents and callers details
    </div>
    <div class="queue-data" v-if="selectedQueue">
      <div class="members">
        <h6>Queue agents</h6>
        <b-card no-body v-for="(member, i) in members" :key="i" class="member-card">
          {{ member.name }}
        </b-card>
      </div>

      <div class="callers">
        <h6>Queue callers</h6>
        <b-card no-body v-for="(caller, i) in callers" :key="i" class="caller-card">
          {{ caller.clidName }} {{ caller.clidNum }}
        </b-card>
      </div>
    </div>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'QueueData',
  data () {
    return {
      msg: 'Members and Callers'
    }
  },
  computed: mapGetters({
    members: 'getSelectedMembers',
    callers: 'getSelectedCallers',
    selectedQueue: 'getSelectedQueue'
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card { margin-bottom: 5px; }
.block-header { color: #007bff}
</style>

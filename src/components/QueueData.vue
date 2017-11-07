<template>
  <div class="queue-data">
    <div class="members">
      <h3>Queue agents</h3>
      <b-card no-body v-for="(member, i) in members" :key="i" class="member-card">
        {{ member.name }}
      </b-card>
    </div>

    <div class="callers">
      <h3>Queue callers</h3>
      <b-card no-body v-for="(caller, i) in callers" :key="i" class="caller-card">
        {{ caller.clidName }} {{ caller.clidNum }}
      </b-card>
    </div>
  </div>
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
    callers: 'getSelectedCallers'
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card { margin-bottom: 5px; }
</style>

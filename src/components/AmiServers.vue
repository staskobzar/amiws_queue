<template>
  <div class="ami-servers">
    <b-card>
      pbx01.local
    </b-card>
    <b-card>
      pbx02.local
    </b-card>
    <b-card>
      pbx03.local
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'AmiServers',
  data () {
    return {
      title: 'List of AMI servers'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ami-servers { margin-left: 15px; }
.card { margin-bottom: 10px }
</style>

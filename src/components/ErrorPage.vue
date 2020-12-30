<template>
  <div class="errorpage">
    <center>
    <section class="error_block" v-if="!$route.params.fullData">
        <img src="https://miro.medium.com/max/1600/1*mUClow2WD0I2FIL_Iuzxfw.gif">
    </section>
  </center>
  </div>
</template>

<script>
export default {
    name: 'ErrorPage'
}
</script>

<style scoped>
.errorpage{
  height: 100vh
}
</style>
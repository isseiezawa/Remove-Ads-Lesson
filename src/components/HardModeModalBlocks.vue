<template>
  <div class="hard-modal-block">
    <button type="button" class="close" @click="closeModal(amount)">
      <span>&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  props: ['amount'],
  methods: {
    closeModal(amount) {
      this.$emit('close-modal-hard', amount)
    }
  }
}
</script>

<style scoped>
.hard-modal-block {
  position: absolute;
  left: 50%;
}
</style>
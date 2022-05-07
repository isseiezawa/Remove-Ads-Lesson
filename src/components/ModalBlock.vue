<template>
  <div>
    <div class="modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <img src="../assets/ads_1.png" width="100%">
          <div class="modal-header">
            <button type="button" class="close" @click="closeModal(amount)">
              <span>&times;</span>
            </button>
            <span>{{amount-1}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop"></div>
  </div>
</template>

<script>

export default {
  name: 'modal-block',
  props: ['amount'],
  methods: {
    closeModal(amount) {
      this.$emit('close-modal', amount)
    }
  }
}
</script>

<style scoped>
.modal {
  display: block;
}

.modal-content {
  position: relative;
  height: 10vh;
}

.modal-header {
  position: absolute;
  width: 100%;
  border: none;
}

.close {
  z-index: 1;
}
</style>
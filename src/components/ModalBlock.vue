<template>
  <div>
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="closeModal(amount)">
              <span>&times;</span>
            </button>
          </div>
          <h3>{{amount-1}}</h3>
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
</style>
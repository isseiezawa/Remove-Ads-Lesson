<template>
  <div>
    <div class="modal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <img :src="randomAds" width="100%">
          <div class="modal-header">
            <button type="button" class="close" :class="randomPosition" @click="closeModal(amount)">
              <span>&times;</span>
            </button>
            <span class="number">{{amount}}</span>
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
  computed: {
    randomPosition() {
      var selectPosition = ['float-left', 'mx-auto']
      return selectPosition[Math.floor( Math.random() * 2)]
    },
    randomAds() {
      // src属性は、静的に指定するときと動的に指定するときで参照方法が変わるためrequire使用
      return require('@/assets/images/ads_' + Math.floor( Math.random() * 2 + 1).toString() + '.png')
    }
  },
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

.number {
  background-color: azure;
  border: solid 1px black;
  border-radius: 50%;
  padding-left: 2px;
  padding-right: 2px;
}
</style>
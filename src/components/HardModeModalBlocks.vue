<template>
  <div class="hard-modal-block">
    <button type="button" class="close" @click="closeModal(amount)">
      <span>&times;</span>
    </button><br />
    <img :src="randomAds">
  </div>
</template>

<script>
export default {
  props: ['amount'],
  computed: {
    randomAds() {
      // src属性は、静的に指定するときと動的に指定するときで参照方法が変わるためrequire使用
      return require('@/assets/images/ads_' + Math.floor( Math.random() * 3 + 1).toString() + '.png')
    }
  },
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
  z-index: 2;
}

img {
  width: 10%;
}

</style>
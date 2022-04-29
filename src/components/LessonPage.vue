<template>
    <div>
      <div v-for="amount in 3" :key="amount">
        <transition name="fade">
          <modal-block v-if="isModal[amount-1]" @close-modal="handleCloseModal(amount)" :amount="amount" />
        </transition>
      </div>
    </div>
</template>

<script>
import ModalBlock from './ModalBlock.vue';

export default {
  name: 'lesson-page',
  components: {
    ModalBlock
  },
  data() {
    return {
      isModal: [true, true, true],
      soundEffect: new Audio(require('../assets/sound_effect/explosion_3.mp3'))
    }
  },
  methods: {
    handleCloseModal(e) {
      this.soundEffect.currentTime= 0;
      this.soundEffect.play();
      this.isModal.splice(e-1, 1, false);
      console.log(this.isModal)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
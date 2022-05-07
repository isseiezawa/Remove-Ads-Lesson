<template>
  <div>
    <div class="box">
      <div v-for="amount in 5" :key="amount">
        <transition name="fade">
          <modal-block v-if="isModal[amount-1]" @close-modal="handleCloseModal(amount)" :amount="amount" />
        </transition>
      </div>
    </div>
    <timer-component ref="timer" />
    <button @click="lessonStart" class="btn btn-danger">広告っぽいものを出す</button>
  </div>
</template>

<script>
import anime from 'animejs'
import ModalBlock from './ModalBlock.vue'
import TimerComponent from './TimerComponent.vue'

export default {
  name: 'lesson-page',
  components: {
    ModalBlock,
    TimerComponent
  },
  data() {
    return {
      isModal: [true, true, true, true, true],
      soundEffect: new Audio(require('../assets/sound_effect/explosion_3.mp3'))
    }
  },
  mounted() {
    return this.animateBlocks()
  },
  methods: {
    lessonStart() {
      this.$refs.timer.clearAll();
      this.$refs.timer.startTimer();
      this.handleCreateModal();
    },
    handleCloseModal(e) {
      this.soundEffect.load();
      this.soundEffect.currentTime= 0;
      this.soundEffect.play();
      this.isModal.splice(e-1, 1, false);
      console.log(this.isModal)

      if(this.isModal[0] == false) this.$refs.timer.stopTimer();
    },
    animateBlocks() {
      anime({
        targets: '.modal-content',
        // translateX: function() {
        //   return anime.random(-100, 100);
        // },
        translateY: function() {
          return anime.random(-30, 30) + 'vh';
        },
        // scale: function() {
        //   return anime.random(0.3, 0.7)
        // },
        duration: 1000,
        delay: anime.stagger(100),
        complete: this.animateBlocks
      })
    }
  }
}
</script>

<style>
.box{
  height: 40vh;
  margin: 0 auto;
  width: 10%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
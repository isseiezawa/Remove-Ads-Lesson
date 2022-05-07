<template>
  <div class="hard-mode-content mt-5">
    <button :disabled="disabled_or_enabled" @click="hardLessonStart" class="btn btn-danger">ハードモード開始</button>
    <div v-for="amount in 20" :key="amount">
      <hard-mode-modal v-if="isHardModal[amount-1]" @close-modal-hard="handleCloseModal(amount)" />
    </div>
    <hard-timer-component ref="hard_timer" />
  </div>
</template>

<script>
import anime from 'animejs'
import HardModeModal from './HardModeModalBlocks.vue'
import HardTimerComponent from './TimerComponent.vue'


export default {
  name: 'lesson-page',
  components: {
    HardModeModal,
    HardTimerComponent
  },
  data() {
    return {
      isHardModal: [],
      disabled_or_enabled: false,
      soundEffect: new Audio(require('../assets/sound_effect/explosion_3.mp3'))
    }
  },
  mounted() {
    return this.animateBlocks()
  },
  methods: {
    hardLessonStart() {
      this.disabled_or_enabled = true
      this.$refs.hard_timer.clearAll();
      this.$refs.hard_timer.startTimer();
      this.handleCreateHardModal();
    },
    handleCreateHardModal() {
      for(var i = 0; i < 20; i++) {
        this.isHardModal.push(true)
      }
    },
    handleCloseModal(e) {
      this.soundEffect.load();
      this.soundEffect.currentTime= 0;
      this.soundEffect.play();
      this.isHardModal.splice(e-1, 1, false);

      if(!this.isHardModal.find(value => value == true)) {
        this.$refs.hard_timer.stopTimer();
        this.disabled_or_enabled = false;
      }
    },
    animateBlocks() {
      anime({
        targets: '.hard-modal-block',
        translateX: function() {
          return anime.random(-40, 40) + 'vw';
        },
        translateY: function() {
          return anime.random(-30, 30) + 'vh';
        },
        scale: function() {
          return anime.random(1, 2)
        },
        duration: 300,
        delay: anime.stagger(100),
        complete: this.animateBlocks
      })
    }
  }
}
</script>

<style>
.hard-mode-content {
  position: relative;
  background-color: rgb(195, 138, 249);
  border-radius: 20%;
}
</style>
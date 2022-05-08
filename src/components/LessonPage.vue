<template>
  <div>
    <div class="box">
      <div v-for="amount in isModal.length" :key="amount">
        <transition name="fade">
          <modal-block v-show="isModal[amount-1]" @close-modal="handleCloseModal(amount)" :amount="amount" />
        </transition>
      </div>
    </div>
    <div class="border border-warning rounded shadow">
      <timer-component ref="timer" :name="modeName" />
      <button @click="lessonStart" class="btn btn-warning">広告っぽいものを出す</button>
      <p class="mt-3">{{lessonResult()}}</p>
    </div>
    <transition name="basic">
      <div v-show="hardMode">
        <hard-lesson-page ref="resultHard" :nomal-url="nomalUrl" />
      </div>
    </transition>
  </div>
</template>

<script>
import anime from 'animejs'
import ModalBlock from './ModalBlocks.vue'
import HardLessonPage from './HardLessonPage.vue'
import TimerComponent from './TimerComponent.vue'


export default {
  name: 'lesson-page',
  components: {
    ModalBlock,
    HardLessonPage,
    TimerComponent
  },
  data() {
    return {
      modeName: 'ノーマルモード',
      isModal: [],
      hardMode: false,
      nomalUrl: '',
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
    handleCreateModal() {
      this.isModal = []
      for(var i = 0; i < 10; i++) {
        this.isModal.push(true)
      }
    },
    handleCloseModal(e) {
      this.soundEffect.load();
      this.soundEffect.currentTime= 0;
      this.soundEffect.play();
      this.isModal.splice(e-1, 1, false);

      if(this.isModal[0] == false) this.$refs.timer.stopTimer();
    },
    lessonResult() {
      var result = ''
      if(!this.isModal.length) {
        result = 'がんばってね'
      }else if(this.isModal[0] == false) {

        if(this.$refs.timer.minutes == 0 && this.$refs.timer.seconds < 22) {
          result = 'ハードモードへのチャレンジを許します。' 
          this.hardMode = true
          this.nomalUrl = 'ノーマルモード : ' + this.$refs.timer.minutes + '分' + this.$refs.timer.seconds + '秒' + this.$refs.timer.milliSeconds
        }else{
          result = 'クリアーだけれども22秒を切ったらハードモードになるよ'
        }

      }else{
        result = 'あと' + this.isModal.filter(n => n == true).length.toString() + '個'
      }
      return result
    },
    animateBlocks() {
      anime({
        targets: '.modal-content',
        translateY: function() {
          return anime.random(-40, 50) + 'vh';
        },
        duration: 1000,
        delay: anime.stagger(100),
        complete: this.animateBlocks
      }).play()
    }
  }
}
</script>

<style>
.box{
  height: 10vh;
  margin: 0 auto;
  width: 10%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.basic-enter-active, .basic-leave-active {
  transition: opacity 5s;
}
.basic-enter, .basic-leave-to {
  opacity: 0;
}
</style>
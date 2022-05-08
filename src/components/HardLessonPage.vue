<template>
  <div>
    <div class="hard-mode-content mt-5 pt-3 pb-3 border border-danger rounded shadow">
      <div v-for="amount in isHardModal.length" :key="amount">
        <hard-mode-modal v-show="isHardModal[amount-1]" @close-modal-hard="handleCloseModal(amount)" />
      </div>
      <hard-timer-component ref="hard_timer" :name="modeName" />
      <button :disabled="disabled_or_enabled" @click="hardLessonStart" class="btn btn-danger">ハードモード開始</button>
    </div>
    <div v-if="nomalUrl.length" class="twitter-anime">
      <a :href="twitterUrl" :disabled="disabled_or_enabled">
        <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
        </svg>
      </a>
      <p class="eyes">・</p>
    </div>
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
      url: '',
      modeName: 'ハードモード',
      disabled_or_enabled: false,
      soundEffect: new Audio(require('../assets/sound_effect/explosion_3.mp3'))
    }
  },
  props: {
    nomalUrl: String
  },
  computed: {
    twitterUrl() {
      var twitterResultUrl = 'https://twitter.com/intent/tweet?text='
      if(this.nomalUrl.length && !this.url) {
        twitterResultUrl += this.nomalUrl
      } else if(this.nomalUrl.length && this.url) {
        twitterResultUrl += this.nomalUrl + '%0d' + this.url
      }
      twitterResultUrl += '%0dで広告を消しました。'
      return  twitterResultUrl
    }
  },
  mounted() {
    this.animateBlocks();
  },
  methods: {
    hardLessonStart() {
      this.disabled_or_enabled = true
      this.$refs.hard_timer.clearAll();
      this.$refs.hard_timer.startTimer();
      this.handleCreateHardModal();
    },
    handleCreateHardModal() {
      this.isHardModal = []
      for(var i = 0; i < 30; i++) {
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
        this.animateTopImage();
        this.disabled_or_enabled = false;
        this.url = 'ハードモード : ' + this.$refs.hard_timer.minutes + '分' + this.$refs.hard_timer.seconds + '秒' + this.$refs.hard_timer.milliSeconds;
      }
    },
    animateBlocks() {
      anime({
        targets: '.hard-modal-block',
        translateX: function() {
          return anime.random(-60, 30) + 'vw';
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
    },
    animateTopImage() {
      anime({
        targets: '.twitter-anime',
        translateX: function() {
          return anime.random(-60, 30) + 'vw';
        },
        translateY: function() {
          return anime.random(-30, 30) + 'vh';
        },
        scale: function() {
          return anime.random(5, 10)
        },
        duration: 3000,
        delay: anime.stagger(200),
        complete: this.animateTopImage
      });
    }
  }
}
</script>

<style>
.hard-mode-content {
  position: relative;
  background-color: rgb(195, 138, 249);
}

.twitter-anime {
  z-index: 1;
  position: relative;
  width: 100px;
  margin: 0 auto;
}

.eyes {
  position: absolute;
  right: 10px;
  top: 10px;
  height: 20px;
  width: 20px;
  background-color: white;
  border-radius: 50%;
  border: solid 1px black
}
</style>
<template>
  <div class="center aligned row">
    <h1 class="ui header">結果</h1>
    <div class="column">
      <h3 class="">
        {{ minutes | zeroPad }} :
        {{ seconds | zeroPad }} :
        {{ milliSeconds | zeroPad(3) }}
      </h3>
    </div>
  </div>
</template>

<script>

export default {
  name: 'timer-component',
  data() {
    return {
      animateFrame: 0,
      nowTime: 0,
      diffTime: 0,
      startTime: 0,
      isRunning: false
    }
  },
  methods: {
    // 現在時刻から引数に渡した数値を startTime に代入
    setSubtractStartTime: function (time) {
      var start_time = typeof time !== 'undefined' ? time : 0;
      this.startTime = Math.floor(performance.now() - start_time);
    },
    // タイマーをスタートさせる
    startTimer: function () {
      // loop()内で this の値が変更されるので退避
      var vm = this;
      vm.setSubtractStartTime(vm.diffTime);
      // ループ処理
      (function loop(){
        vm.nowTime = Math.floor(performance.now());
        vm.diffTime = vm.nowTime - vm.startTime;
        vm.animateFrame = requestAnimationFrame(loop);
      }());
      vm.isRunning = true;
    },
    // タイマーを停止させる
    stopTimer: function () {
      this.isRunning = false;
      cancelAnimationFrame(this.animateFrame);
    },
    // 初期化
    clearAll: function () {
      this.startTime = 0;
      this.nowTime = 0;
      this.diffTime = 0;
      this.stopTimer();
      this.animateFrame = 0;
    }
  },
  computed: {
    // 分数を計算 (60分になったら0分に戻る)
    minutes: function () {
      return Math.floor(this.diffTime / 1000 / 60) % 60;
    },
    // 秒数を計算 (60秒になったら0秒に戻る)
    seconds: function () {
      return Math.floor(this.diffTime / 1000) % 60;
    },
    // ミリ数を計算 (1000ミリ秒になったら0ミリ秒に戻る)
    milliSeconds: function () {
      return Math.floor(this.diffTime % 1000);
    }
  },
  filters: {
    // ゼロ埋めフィルタ 引数に桁数を入力する
    zeroPad: function(value, num){
      var zero_num = typeof num !== 'undefined' ? num : 2;
      return value.toString().padStart(zero_num,"0");
    }
  }
}
</script>

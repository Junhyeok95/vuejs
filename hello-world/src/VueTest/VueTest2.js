// # Vue 생명주기
new Vue({
  el: '#app',
  beforeCreate() {
    console.log('beforedCreate Hook');
  },
  created() {
    console.log('created Hook / API Data req');
  },
  beforeMount() {
    console.log('beforeMount Hook');
  },
  mounted() {
    console.log('mounted Hook / $el 속성을 사용하여 인스턴스의 DOM에 접근가능');
  },
  beforeUpdate() {
    console.log('beforeUpdate Hook / 데이터의 변화가 감지됐을 때 해당하는 DOM을 업데이트하기 전에 호출됨');
    console.log('렌더링하기 전에 호출되는 훅, 이 과정에서 데이터가 변경되더라도 다시 렌더링 되지 않음');
  },
  updated() {
    console.log('updated Hook 재렌더링 되어 실제 DOM이 되었을 때 호출');
  },
  beforeDestroy() {
    console.log('beforeDestroy Hook / 인스턴스가 제거되기 전에 호출되는 상태, this를 사용하여 해당 인스턴스에 접근하기 가능함 / 이벤트 초기화 하는 용도');
  },
  destroyed() {
    console.log('destroyed Hook');
  },
})
// # Vue 템플릿 문법
// 텍스트 보간법
<p>{{ msg }}</p> // 바인딩 한 모습
<p v-once>{{ msg }}</p> // 변수를 갱신할 일이 없다면 v-once 디렉티브를 사용하여 일회성 보간 가능

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  // 텍스트 보간 문법을 변경하는 방법
  delimiters: ['${', '}$'] // 이렇게 옵션을 줘서 보간방법을 변경할 수도 있음
})

<p> ${ msg }$ </p> // 예시


// v-html 디렉티브를 사용하여 HTML 코드를 문자열이 아닌 실제 HTML로 인식하도록 바인딩할 수 있다
<div>
  <span v-html="rawHTML"> </span>
</div>
<script>
export default {
  data() {
    return { rawHTML: '<span style="color: red"> Hello ~ </span>' }
  }
}
</script>

// HTML 속성 또한 변수를 사용하여 보간할 수 있게 지원
<div v-bind:id = "dynamicId"> </div>
<select v-bind:disabled="isDisabled"></select> // 빈배열과 1같은 Truthy 사실 같은 값도 ture, null과 0같은 Falsy 거짓 같은 값도 false와 같은 방식으로 처리함
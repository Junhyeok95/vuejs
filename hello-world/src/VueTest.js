// # Vue 인스턴스 호출
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})

// # Vue 인스턴스의 옵션
// > data 반응형 모델을 선언할 때 사용 ------------------------------
// 뷰 인스턴스
const data = { a: 1 };
new Vue({
  data: data
})

// 뷰 컴포넌트
const myComponent = Vue.extend({
  name: 'MyComponent',
  data () { // this.a 로 호출할 수 있음
    return { a: 1 };
  }
})

// > props 부모 컴포넌트로부터 데이터를 받아올 수 있게 노출된 속성들 ------------------------------
Vue.component('MyComponent', {
  // 단순한 ... 전달 ...
  props: ['size', 'myMessage']
})
Vue.component('MyCOmponent2', {
  props: {
    // 타입 체크
    height: Number,
    // 타입 체크, 유효성 검사, 기본 값
    width: {
      type: Number, // 타입 체크
      required: true,
      defalut: 1, // 기본 값
      validator (value) { // 유효성 검사
        return value > 0
      }
    }
  }
})

// > computed 계산된 데이터 ... ------------------------------
// compouted 를 사용하지 않고 그대로 작성하는 경우 ...
// 렌더 성능이 떨어질 수 있고 재사용성이나 가독성 면에서도 현저히 떨어지는 것을 알 수 있다 ...
Vue.component('MyComponent', {
  template: '<div>{{ age * 2 }}</div>',
  data () {
    return { age: 28 }
  }
})

// 내부에서 사용된 데이터가 변경되면 자동으로 갱신된다 ...
// 가장 큰 장점 !! -> 값이 한 번 계산되고 나면 캐싱 됨
Vue.component('MyComponent', {
  template: '<div>{{ doubleAge }}</div>',
  data () {
    return { age: 28 }
  },
  computed: { // 함수가 아니므로 () 가 없네 ... !
    doubleAge () {
      return this.age * 2 // 
    }
  }
})

Vue.component('MyComponent', {
  template: '<div>{{ doubleAge }}</div>',
  data () {
    return { age: 28 }
  },
  computed: { // 함수가 아니므로 () 가 없네 ... !
    doubleAge: {
      get: function () {
        return this.age * 2
      },
      set: function () {
        this.age = newAge;
      }
    }
  }
})

// > methods 인스턴스에 추가되는 메소드 ------------------------------
// this를 통해서 직접 실행시키거나, 디렉티브 표현식을 통해 사용할 수 있다.
// this 컨텍스트를 vue 인스턴스에 바인딩한다 ... 화살표 함수를 사용하여 정의하면
// 현재 인스턴스가 아닌 부모 컨텍스트를 의미하게 되므로
// 메소드 내부에서 현재 인스턴스의 data나 props에 접근할 숭 없게 된다는 점 .. 주의해서 사용한다
Vue.component('MyComponent', {
  data () {
    return { age: 28 }
  },
  methods: {
    plusNumber () {
      this.age++;
    }
  }
})

// > watch 특정 로직을 수행해야 할 때 주로 사용하는 감시자 속성이다 ------------------------------
Vue.component('MyComponent', {
  data () {
    return { a: 'Hello World', b: 1 }
  },
  watch: {
    a (nextValue, prevValue) {
      console.log(`new: ${nextValue}, old: ${prevValue}`)
    }
  }
})

// watch 속성에 대한 페이징 호출 예시
Vue.component('Board', {
  data () {
    return { contents: [], paging: 1 }
  },
  watch: {
    paging (page) { // 페이징 ... !
      // paging 데이터가 변경될 때마다 API를 호출하여, contents의 데이터를 갱신한다.
      fetchBoard (`/api/board?page=${page}`)
        .then(res => {
          this.contents = res.data
        })
    }
  }
})

// watch 속성에 deep, handler 를 이용한 깊은 감시
Vue.component('MyComponent', {
  data () {
    return {
      a: {
        b: 1
      }  
    }
  },
  watch: {
    a: {
      handler (nextValue, prevValue) { // 상태가 변경 되었을 때 호출할 함수 설정
        console.log(`new: ${nextValue}, old: ${prevValue}`)
      },
      deep: true, // 상태 값의 내부까지 보곘다는 의미 ... 위에서 a 안의 b 의 1 도 본다라는 의미 .. 
    }
  }
})
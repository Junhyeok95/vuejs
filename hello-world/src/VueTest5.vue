-> Vue 인스턴스를 참조하기 위해 종종 변수 vm(ViewModel의 약자)을 사용 <-

vm.$data -> 데이터 옵션

vm.$props -> 데이터 옵션

vm.$el -> Element Vue 인스턴스의 DOM 엘리먼트를 의미

vm.$parent -> 단일 부모
vm.$children -> 다중 부모
vm.$root -> 최상단의 부모 / 일반적으로 CLI를 통해 생성한 프로젝트는 App컴포넌트가 루트 컴포넌트

vm.$attrs -> HTML 속성 중 props데이터로 인식되지 않은 속성들을 의미 / 예를들어 ... <ExampleComponent id ="test" /> 여기서 this.$attrs.id 해서 가저온다거나...

vm.$set -> 반응형으로 선언된 값을 업데이트 함
vm.$delete -> 삭제 ...

  + 예시
  data () { 
    retrun {
      count: 0
  }},
  methods: {
    addCount () {
      this.count++;
    }
  }

  이런 경우 $set 을 사용하지 않아도 Vue가 변화를 감지하지만
  새로운 속성이 추가되거나 제거욀 때 객체가 면봐하는 것은 감지 못한다.

  data () { 
    retrun {
      message: { text: 'Hello'}
  }},
  mounted() {
    // 추가한 것을 Vue 객체가 알지못함
    message.author = 'Jang'

    // 삭제한 것을 Vue 객체가 알지못함
    delete message.text 
  },

  이럴 때 사용한다

  mounted() {
    this.$set(this.message, 'author', 'Jang') // 속성을 추가할 객체 , 추가할 키 , 추가할 값
    this.$delete(this.message, 'text') // 속성을 제거할 객체 , 제거할 키
  },

vm.$emit -> 인자로 주어진 이벤트를 트리거링한다... // this.$emit('click', { message: 'Hi' }) -> ('이벤트 이름', 이벤트 리스터 콜백 함수의 인자)

vm.$on -> 인스턴스에 이벤트 핸들러를 등록할 수 있는 메소드 // $emit 메소드에 의해 호출된다
  + ex)
  vm.$emit('click', 'Hi ~ Hello') // 두번째 인자는 콜백 함수의 인자... 즉 payload 값이 됨
  vm.$on('click', payload => {
    console.log(payload) // Hi ~ Hello 호출
  })

vm.$once -> 이벤트 핸들러가 단 한번만 실행됨, 호출되면 바로 제거됨
vm.$off -> 사용자 정의 이벤트를 제거함

vm.$off() // 인자가 없으면 모든 이벤트 리스너를 제거함
vm.$off('click') // click 이벤트의 모든 이벤트 리스너를 제거함
vm.$off('click', sayHi) // click 이벤트 리스너중 sayHi 콜백 함수를 이벤트 핸들러로 가진 리스너만 제거함

vm.$forceUpdate() -> 인스턴스를 강제로 다시 렌더링 하는 메소드, 하위 컴포넌트나 인스턴스에 영향을 끼치지 않고 메소드가 실행된 인스턴스만 렌더링 된다.

vm.$nextTick -> 렌더링 사이클 이후 실행될 콜백 함수를 등록할 수 있는 기능을 제공하는 메소드 ... ...? 갱신된 상태를 토대로 화면을 다시 그리는 주기를 틱(Tick)이라고 부른다.
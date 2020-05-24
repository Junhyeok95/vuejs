<template>
  <div>
    <!-- <div v-bind:id"'element-' + userId"> </div> -->

    <!-- 입력한 값을 자동으로 숫자 자료형으로 변환 -->
    <input v-model.number="productPrice">

    <!-- 마우스 오른쪽 버튼으로 클릭되었을때만 이벤트 리스너가 호출 -->
    <button v-on:click.right="onLeftClick"></button>

--------------------------------------------------  

    <!-- v-bind -->
    <!-- v-bind -->
    <!-- href 속성에 url 변수의 값을 바인딩 ... -->
    <a v-bind:href="url"></a>
    <!-- 약어로는 :를 사용한다 -->
    <!-- 약어를 사용한 모습 -->
    <a :href="url"></a>
    <!-- 전달인자를 사용하지 않고 속성 객체를 바인딩할 수도 있다 -->
    <a v-bind="{ id: 'test-link', href: url }"></a>
    <!-- 클래스를 바인딩할 때는 배열을 사용할 수도 있다 -->
    <div :class="['classA', 'classB']"></div>
    <!-- 컴포넌트의 props에 user 객체의 name 속성 값을 주입한다 -->
    <UserProfile :name="user.name">

--------------------------------------------------

    <!-- v-on -->
    <!-- v-on -->
    <!-- 선언되어 있는 메소드 이름을 사용하여 바인딩 -->
    <button v-on:click="onClick"> Click Me </button>
    <!-- 약어로는 @를 사용한다 -->
    <!-- 약어를 사용한 모습 -->
    <button @click="onClick"> Click Me </button>
    <!-- 한 줄로 표현할 수 있는 문을 사용하여 바인딩한다 -->
    <button v-on:click="isToggle = !isToggle"> Click Me </button>
    <!-- 전달인자를 사용하지 않고 속성 객체를 바인딩할 수도 있다 -->
    <button v-on="{ click: onClick, hover: onHover }"> Click Me </button>

    <!--
      + 다양한 수식어들
      .stop -> event.stopPropagation 호출하여 이벤트 전파를 금지한다.
      .prevent -> event.preventDefault 호출하여 이벤트의 기본 동작을 방지한다.
      .capture -> 이벤트 캡처 모드로 이벤트 리스너를 추가한다.
      .self -> 이벤트가 이 엘리먼트에서 전달된 경우에만 처리돤다. 즉  event.target 속성의 값이 이벤트 리스너를 바인딩한 엘리먼트여야 리스너가 호출 ...
      .keyCode, keyAlias -> 특정 키에 대한 이벤트만 처리된다. @keyup.enter와 같이 별칭을 사용하거나 @keyup.13과 같은 키코드를 사용할 수도 있다.
      .once -> 이벤트 리스너가 단 한번만 호출된다.
      .left , .right, .middle -> 마우스 버튼 이벤트 트리거

      .passive -> 이벤트의 passive속성을 true로 변경하여 이벤트 호출 시 브라우저에 이 이벤트가 event.preventDefalut를 호출하지 않는다는 것을 알린다 ... ?
        scroll, touchmove 등 스크롤 관련 이벤트에서 사용되는 수식어 , event.preventDefalut 메소드와 깊은 연관이 있다. 브라우저는 언제 호출될지 알 수 없기 때문이다.
        addEventListner('scroll, function (event) {
          if (isTrue) {
            event.preventDefalut()
              -> 조건이 참일 때만 이벤트의 기본 기능을 금지 ...
              -> 이 내부가 길어질경우 스크롤이 끊기는 현상이 발생,
          }
        }, { passive: true } -> 이 기능을 사용하여 부드러운 경험 ... 익스플로어에서는 지원하지 않음 )
    -->

--------------------------------------------------

    <!-- v-if, v-else-if, v-else -->
    <!-- v-if, v-else-if, v-else -->
    <div>
      <p v-if="count === 0">      카운터가 0</p>
      <p v-else-if="count === 1"> 카운터가 1</p>
      <p v-else>                  이외의 경우</p>
    </div>

    <!--
      + Vue는 재사용 가능한 요소는 최대한 재사용 하려고 하므로 주의하자.
      v-if 로 토글을 구성할 시 내부를 최대한 활용하는 경우가 있다

      <template v-if="inputType === 'text' ">
        <label> 텍스트 필드 </label>
        <input type="text">
      </template>
      <template v-else>
        <label> 이메일 필드 </label>
        <input type="email">
      </template>

      값을 입력 후 이메일 필드로 변경하더라도 DOM 자체가 대체된 것이 아니기 때문에 이전 입력 내용이 남게된다

      <template v-if="inputType === 'text' " key="textField"> -> 이렇게 key 속성을 사용하여 고유한 요소임을 의미할 수 있다
        <label> 텍스트 필드 </label>
        <input type="text">
      </template>
      <template v-else key="emailField"> -> 이렇게 key 속성을 사용하여 고유한 요소임을 의미할 수 있다
        <label> 이메일 필드 </label>
        <input type="email">
      </template>
    -->

--------------------------------------------------

    <!-- v-show -->
    <!-- v-show -->
    <!-- v-if와 차이점은 v-show 디렉티브를 사용하면 항상 렌더링되고 DOM에도 남아있다는 것 -->
    <div v-show="count === 0">      카운터가 0</div>
    <div v-show="count !== 0">      카운터가 0 아닐 경우</div>

    <!--
      + v-if 는 조건에 따라 실제로 렌더하고 제거한다.
      사용자에게 보이지 않는 DOM 엘리먼트까지 추가로 렌더링 하지 않아도 된다는 점이 장점이다.
      그러나 엘리먼트를 토글할 경우 실제로 렌더를 수행해야된다.
      v-show 디렉티브는 사용자에게 보이지 않는 DOM 엘리먼트라도 렌더가 되지만
      조건에 따라 노출되는 토글 기능을 가진 일레먼트의 경우 보이는 상태와 안 보이는 상태를 오가는 비용이 낮다 ...

      결론
        -> v-if 는 렌더링과 제거를 함, 토글시 불리함
        -> v-show 는 전체를 렌더링하고 , 스타일 속성만 변경하므로 토글시 유리함
    -->

--------------------------------------------------

    <!-- v-for -->
    <!-- v-for -->
    <!-- 변수 in 표현식 을 사용하며 표현식으로는 배열과 객체를 사용할 수 있다 -->
    <div v-for="(item, index) in items" v-bind:key="index">
      items 배열의 {{index}} 번째 요소의 값은 {{time}} 입니다.
    </div>

    <div v-for="(value, key, index) in object" v-bind:key="index">
      object 객체의 {{index}} 번째 키인 {{key}} 값은  {{value}} 입니다.
    </div>

--------------------------------------------------

    <!-- v-model -->
    <!-- v-model -->
    <!-- 폼 요소처럼 사용자의 입력을 받을 수 있는 요소에 양방향 데이터 바인딩을 생성할 수 있는 디렉티브다 -->
    <input v-model="message">
    <p>입력한 메시지 : {{message}}</p>
    <p>100 같은 숫자를 입력하더라고 문자열 '100' 으로 해석하기 때문에 주의가 필요하다</p>

    <!-- 단일체크박스는 선택 여부에 대한 하나의 불리언 값을 가짐 -->
    <input type="checkbox" v-model="isChecked">

    <!-- 여러 개의 체크박스 요소에 데이터를 바인딩한 모습 -->
    <input type="checkbox" v-model="isCheckedValues" value="1">
    <input type="checkbox" v-model="isCheckedValues" value="2">
    <input type="checkbox" v-model="isCheckedValues" value="3">

    <!--
      + 집합의 성격을 가지므로 isCheckedValues 값은 배열이 된다.
      바인딩할 데이터를 배열로 초기화하지 않는다면 데이터가 값의 집합이라고 판단하지 않고 ... 불리언 자료형으로 처리해버린다 !!!

      export default {
        data () {
          return {
            checkedValues: []
          }
        }
      }
      값의 집합으로 사용할 데이터를 빈 배열로 초기화한 모습

      value 속성을 꼭 입력하도록 하자.
    -->
    
--------------------------------------------------

    <!-- 라디오 버튼과 셀렉트 요소는 반드시 하나만 선택 가능하기 때문에 선택된 버튼의 value를 값으로 가진다 -->
    <input type="radio" v-model="selected" value="Evan">
    <input type="radio" v-model="selected" value="Martin">

    <select v-model="selected">
      <option>Evan</option>
      <option>Martin</option>
    </select>

    <!-- 단 ... 셀렉트 요소는 멀티플 속성을 사용가능하다 -->
    <select v-model="selected" multiple>
      <option>Evan</option>
      <option>Martin</option>
    </select>

    <!-- 또한 라디오, 체크박스, 셀렉트 요소의 경우 기본적으로 문자열 또는 불리언 형의 값을 가지지만 ... ! v-bind 디렉티브를 사용하면 다양한 자료형의 값을 바인딩할 수도 있다. -->
    <select v-model="selected" multiple>
      <option :value="{ name: 'Evan' }">Evan</option>
      <option v-bind:value="{ name: 'Martin '}">Martin</option>
    </select>

--------------------------------------------------

    <!-- v-once -->
    <!-- v-once -->
    <!-- '한 번만' 렌더링 하도록 만들어주는 디렉티브다. 성능을 최적하하기에 도움을 준다 -->
    <span v-once>{{ message }}</span>

--------------------------------------------------

    <!-- v-pre -->
    <!-- v-pre -->
    <!-- 하위 요소에 대한 모든 컴파일을 하지 않는다. 즉, Vue에서 제공해주는 보간법을 사용해도 템플릿 문법으로 인식하지 않고 ... 문자열 그대로 인식한다는 모습 -->
    <span v-per>{{ message }}</span>
    <!-- 결과값 -> {{ message }} 그대로 나옴, 렌더링 성능에 좋은 영향을 줄 수 있음 -->

--------------------------------------------------

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
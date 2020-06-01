<template>
  <li class="memo-item">
    <strong>{{memo_props.title}}</strong>
    <!-- 더블 클릭을 위해 감싸준다 -->
    <p @dblclick="handleDblClick">
      
      <!-- 태그를 이용하여 제목 텍스트를 감싸준다 -->
      <template
        v-if="!isEditing"> {{memo_props.content}} </template>

      <!-- 수정 필드를 위한 태그를 추가해준다 -->
      <!-- !! 특수기능 blur 이벤트 발생 시 handleBlur -->
      <input
        v-else
        type="text"
        ref="content"
        :value="memo_props.content"
        @blur="handleBlur"
        @keydown.enter="updateMemo" />

    </p>
    <button type="button" @click="deleteMemo">
      <i class="fas fa-times"></i>
    </button>
  </li>
</template>

<script>
export default {
  name: 'Memo',
  props: {
    // 부모에게 받은 props를 등록 ..
    memo_props: {
      typo: Object
    }
  },
    // ========================= 디버깅용
      // beforeUpdate() {
      //   console.log("beforeUpdate => ", this.$refs.content);
      // },
      // updated() {
      //   console.log("updated => ", this.$refs.content);
      // },
    // ========================= 디버깅용
  data () {
    return {
      isEditing: false
    }
  },
  methods: {
    deleteMemo () {
      // props 로 받은 memo_props 의 id 를 함수의 파라미터로 전달한다.
      const id = this.memo_props.id;
      this.$emit('deleteMemo', id);
      // console.log(id);
    },
    handleDblClick () {
      // 더블 클릭 할 경우, 수정상태를 true 로 변경
      this.isEditing = true;
        // ========================= 디버깅용
          // console.log("handleDblClick => ", this.$refs.content);
          // this.$refs.content.focus();
        // ========================= 디버깅용
      // !! 우회하는 방법
      this.$nextTick(() => {
        this.$refs.content.focus();
      });
    },
    updateMemo (e) {
      const id = this.memo_props.id;
      const content = e.target.value.trim();
      if (content.length <= 0) {
        return false;
      }
      this.$emit('updateMemo', { id, content });
      this.isEditing = false;
    },
    handleBlur () {
      this.isEditing = false;
    }
  }
}
</script>

<style scoped>
  .memo-item {
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
    padding: 24px;
    box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.2);
    background-color: #fff;
    list-style: none;
  }
  .memo-item input[type="text"] {
    border: 1px solid #ececec;
    font-size: inherit;
  }
  .memo-item button {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 20px;
    color: #e5e5e5;
    border: 0;
  }
  .memo-item strong {
    display: block;
    margin-bottom: 12px;
    font-size: 18px;
    font-weight: normal;
    word-break: break-all;
  }
  .memo-item p {
    margin: 0;
    font-size: 14px;
    line-height: 22px;
    color: #666;
  }
  .memo-item p input[type="text"] {
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    border: 1px solid #CCC;
  }
  .memo-item p input[type="text"] {
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
  }
</style>
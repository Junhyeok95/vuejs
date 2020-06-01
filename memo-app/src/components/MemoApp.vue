<template>
  <div class="memo-app">
    <!-- <memo-form v-on:addMemo="addMemo" /> -->
    <memo-form @addMemo="addMemo" />
    <ul class="memo-list">
      <memo
        v-for="memo in memos"
        :key="memo.id"
        :memo_props="memo"
        @deleteMemo="deleteMemo"
        @updateMemo="updateMemo"/>
    </ul>
  </div>
</template>

<script>
import MemoForm from './MemoForm';
import Memo from './Memo';

export default {
  name: 'MemoApp',
  components: {
    MemoForm,
    Memo
  },
  data () {
    return {
      memos: [],
    };
  },
  created() {
    // localStorage 에 데이터가 있다면 여기서 데이터를 컴포넌트 내의 memos 에 넣어준다. 아니면 빈 배열로 초기화 한다.
    this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
  },
  // MemoForm 에서 submit 으로 emit 로 발생시킨 데이터를 받는다
  methods: {
    addMemo (payload) {
      // 폼에서 올려 받은 데이터를 배열에 추가
      this.memos.push(payload);
      // 문자열로 변환 후, 로컬 스토리지에 저장
      this.storeMemo(); // 아래쪽에 선언
    },
    storeMemo () {
      const memosToString = JSON.stringify(this.memos);
      localStorage.setItem('memos', memosToString);
    },
    deleteMemo (id) {
      // 1. 자식 컴포넌트에서 주는 id 를 통해서 인덱스를 찾는다 ...
      const targetIndex = this.memos.findIndex( v => v.id === id );
      // 2. 찾은 인덱스 번호에 해당하는 메모 데이털르 삭제한다
      this.memos.splice(targetIndex, 1);
      // 3. 삭제된 후 다시 저장한다.
      this.storeMemo();
    },
    updateMemo (payload) {
      // 1. 수정된 메모를 저장
      const { id, content } = payload;
      const targetIndex = this.memos.findIndex( v => v.id === id );
      const targetMemo = this.memos[targetIndex];
      this.memos.splice(targetIndex, 1, { ...targetMemo, content }); // 변환
      this.storeMemo(); // 저장
    }
  },
}
</script>

<style scoped>
  .memo-list {
    padding: 20px 0;
    margin: 0;
  }
</style>
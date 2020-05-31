<template>
  <div class="memo-app">
    <!-- <memo-form v-on:addMemo="addMemo" /> -->
    <memo-form @addMemo="addMemo" />
    <ul class="memo-list">
      <memo
        v-for="memo in memos"
        :key="memo.id"
        :memo_props="memo"/>
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
<template>
  <div class="memo-app">
    <memo-form />
    <memo />
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
  }
}
</script>

<style scoped>

</style>
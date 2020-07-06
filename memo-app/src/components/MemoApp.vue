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

import axios from 'axios';
import { mapActions, mapState } from 'vuex';

const memoAPICore = axios.create({
  baseURL: 'http://localhost:8000/api/memos'
});

export default {
  name: 'MemoApp',
  components: {
    MemoForm,
    Memo
  },
  // !! API
  // data () {
  //   return {
  //     memos: [],
  //   };
  // },
  computed: {
    ...mapState([
      'memos'
    ])
  },
  created() {
    // !! localStorage
      // localStorage 에 데이터가 있다면 여기서 데이터를 컴포넌트 내의 memos 에 넣어준다. 아니면 빈 배열로 초기화 한다.
      // this.memos = localStorage.memos ? JSON.parse(localStorage.memos) : [];
    
    // !! API
      // memoAPICore.get('/')`
      //   .then(res => {
      //     this.memos = res.data;
      //   })`

    // !! vuex
    this.fetchMemos();
  },
  // MemoForm 에서 submit 으로 emit 로 발생시킨 데이터를 받는다
  methods: {
    // addMemo (payload) {
    //   // !! localStorage
    //     // 폼에서 올려 받은 데이터를 배열에 추가
    //     // this.memos.push(payload);
    //     // 문자열로 변환 후, 로컬 스토리지에 저장
    //     // this.storeMemo(); // 아래쪽에 선언

    //   // !! API
    //   memoAPICore.post('/', payload)
    //    .then(res => {
    //      this.memos.push(res.data); // 저장된 데이터를 푸시한다
    //    })
    // },
    // // !! localStorage
    //   // storeMemo () {
    //   //   const memosToString = JSON.stringify(this.memos);
    //   //   localStorage.setItem('memos', memosToString);
    //   // },
    // deleteMemo (id) {
    //   // !! localStorage
    //     // // 1. 자식 컴포넌트에서 주는 id 를 통해서 인덱스를 찾는다 ...
    //     // const targetIndex = this.memos.findIndex( v => v.id === id );
    //     // // 2. 찾은 인덱스 번호에 해당하는 메모 데이털르 삭제한다
    //     // this.memos.splice(targetIndex, 1);
    //     // // 3. 삭제된 후 다시 저장한다.
    //     // this.storeMemo();

    //   // !! API
    //   const targetIndex = this.memos.findIndex( v => v.id === id );
    //   memoAPICore.delete(`/${id}`)
    //     .then(() => {
    //       this.memos.splice(targetIndex, 1);
    //     })

    //   /*
    //     기존의 작동 순서
    //     1. id를 사용하여 배열에서 삭제
    //     2. 삭제된 데이터를 로컬스토리지에 다시 저장

    //     api 작동 순서
    //     1. id를 사용하여 delete API 호출
    //     2. 정상처리 되었다면 memos에서 삭제

    //     차이점 -> 요청이 실패할 수도 있기 때문에, 혹은 서버에서 요청을 처리하지 못하는 경우
    //     팁 -> 알림창등 UX로 사용자에게 알림을 줘야한다
    //   */
    // },
    // updateMemo (payload) {
    //   // !! localStorage
    //     // // 1. 수정된 메모를 저장
    //     // const { id, content } = payload;
    //     // const targetIndex = this.memos.findIndex( v => v.id === id );
    //     // const targetMemo = this.memos[targetIndex];
    //     // this.memos.splice(targetIndex, 1, { ...targetMemo, content }); // 변환
    //     // this.storeMemo(); // 저장

    //   // !! API
    //   const { id, content } = payload;
    //   const targetIndex = this.memos.findIndex( v => v.id === id );
    //   const targetMemo = this.memos[targetIndex];
    //   memoAPICore.put(`/${id}`, { content })
    //     .then(() => {
    //       this.memos.splice(targetIndex, 1, { ...targetMemo, content });
    //     })
      
    // },
    ...mapActions([
      'fetchMemos',
      'addMemo', // mapActions 헬퍼 함수를 여기에 넣으면 원래있던 addMemo methods 에 있는건 오버라이딩 되어 실행되지 않을것
      'deleteMemo',
      'updateMemo'
    ])
    // ,
    // addMemo () {
      // ### 이렇게 하면 mapActions 이후여서 오버라이딩 된다
    // },
  },
}
</script>

<style scoped>
  .memo-list {
    padding: 20px 0;
    margin: 0;
  }
</style>
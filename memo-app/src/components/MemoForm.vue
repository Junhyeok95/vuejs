<template>
  <div class="memo-form">
    <!-- form 을 이용하여 사용자가 입력할 수 있는 필드를 추가 -->
    <!-- form 의 submit 기본 동작을 방지 후, 선언한 addMemo 를 실행 -->
    <form action="" @submit.prevent="addMemo">
      <fieldset>
        <div>
          <!-- title 을 v-model 을 이용하여 연결 -->
          <input
            v-model="title"
            type="text" class="memo-fo rm__title-form" placeholder="메모의 제목을 입력하세요" />
          <!-- content 을 v-model 을 이용하여 연결 -->
          <textarea
            v-model="content"
            name="" id="" cols="30" rows="10" class="memo-form__content-form" placeholder="메모의 내용을 입력하세요" />
          <button type="reset"><i class="fas fa-sync-alt"></i></button>
        </div>
        <button type="submit">등록</button>
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MemoForm',
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    resetFields () {
      this.title = '';
      this.content = '';
    },
    addMemo () {
      // !! localStorage
        // // 비구조화 할당
        // const {title, content} = this;
        // // 식별자
        // const id = new Date().getTime();
        // // 방어 코드
        // const isEmpty = title.length <= 0 || content.length <= 0;
        // if (isEmpty) {
        //   return fasle;
        // }

        // // payload 로 사용자가 입력한 데이터를 입력
        // this.$emit('addMemo', { id, title, content });
        // this.resetFields();

       // !! API
      const { title, content } = this;
      const isEmpty = title.length <= 0 || content.length <= 0;
      // 방어코드
      if (isEmpty) {
        return false;
      }
      this.$emit('addMemo', { title, content });
      this.resetFields();
    }
  }
}
</script>

<style scoped>
  .memo-form {
    margin-bottom: 24px;
    padding-bottom: 40px;
    border-bottom: 1px solid #eee;
  }
  .memo-form form fieldset div {
    position: relative;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
  }
  .memo-form form fieldset div button[type="reset"] {
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 16px;
    background: none;
  }
  .memo-form form fieldset button[type="submit"] {
    float: right;
    width: 96px;
    padding: 12px 0;
    border-radius: 4px;
    background-color: #ff5a00;
    color: #fff;
    font-size: 16px;
  }
  .memo-form form fieldset .memo-form__title-form {
    width: 100%;
    margin-bottom: 12px;
    font-size: 18px;
    line-height: 26px;
  }
  .memo-form form fieldset .memo-form__content-form {
    width: 100%;
    height: 66px;
    font-size: 14px;
    line-height: 22px;
    vertical-align: top;
  }
  .memo-form input:focus {
    outline: none;
  }
</style>
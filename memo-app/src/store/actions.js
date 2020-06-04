import axios from 'axios';
import { FETCH_MEMOS } from './mutations-types';

const memoAPICore = axios.create({
  baseURL: 'http://localhost:8000/api/memos'
})

export function fetchMemos ({ commit }) {
  // memoAPICore 에서 created 훅에서 실행되는 함수를 가져온다
  memoAPICore.get('/')
    .then(res => {
      commit(FETCH_MEMOS, res.data);
    });
}

export default {
  fetchMemos
}
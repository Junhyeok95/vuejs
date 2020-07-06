import axios from 'axios';
import {
  FETCH_MEMOS,
  ADD_MEMO,
  DELETE_MEMO,
  EDIT_MEMO
} from './mutations-types';

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

export function addMemo ({ commit }, payload) {
  memoAPICore.get('/', payload)
    .then(res => {
      // ADD_MEMO 변이를 호출하고 API를 통해 받아온 메모 데이터를 넘김
      commit(ADD_MEMO, res.data);
    });
}

// 삭제 키워드
export function deleteMemo ({ commit }, id) {
  memoAPICore.get(`/${id}`)
    .then(() => {
      commit(DELETE_MEMO, id);
    });
}

// 삭제 키워드
export function updateMemo ({ commit }, payload) { // 이건 왜 edit 아니고 update 일까...
  const { id, content } = payload;
  memoAPICore.get(`/${id}`, { content }) // 업데이트를 해야하니까 찾아서
    .then(() => {
      commit(DELETE_MEMO, id);
    });
}

export default {
  fetchMemos,
  addMemo,
  deleteMemo,
  updateMemo,
}
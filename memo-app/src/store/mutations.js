  // const FETCH_MEMOS = 'FETCH_MEMOS';
import {
  FETCH_MEMOS,
  ADD_MEMO, // ADD_MEMO 상수 추가
  DELETE_MEMO, // 추가
  EDIT_MEMO // UPDATE
} from './mutations-types';

export default {
  // Flux 패턴에서 변이 이름을 상수로 사용하는 경우가 일반적
  [FETCH_MEMOS] (state, payload) {
    state.memos = payload;
  },
  [ADD_MEMO] (state, payload) {
    state.memos.push(payload);
  },
  [DELETE_MEMO] (state, id) {
    const targetIndex = state.memos.findIndex(v => v.id === id);
    state.memos.splice = (targetIndex, 1); // 배열 맨 마지막 한개만 업엠
  },
  [EDIT_MEMO] (state, payload) {
    const { id, content } = payload;
    const targetIndex = state.memos.findIndex(v => v.id === id);
    const targetMemo = state.memos[targetIndex];
    state.memos.splice(targetIndex, 1, { ...targetMemo, content });
  },
}; 
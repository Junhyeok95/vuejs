  // const FETCH_MEMOS = 'FETCH_MEMOS';
import { FETCH_MEMOS } from './mutations-types';

export default {
  // Flux 패턴에서 변이 이름을 상수로 사용하는 경우가 일반적
  [FETCH_MEMOS] (state, payload) {
    state.memos = payload;
  }
};
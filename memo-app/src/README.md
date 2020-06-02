# Http Axios

## 기본
```
axios.get(url, config?) -> get 메소드
axios.post(url, data?, config?) -> post 메소드
axios.put(url, data?, config) -> put 메소드
axios.patch(url, data?, config) -> patch 메소드
axios.delete(url, config?) -> delete 메소드
```

Promise 객체를 반환 ...  then 과 catch 체인을 사용하여 동작을 제어할 수 있음

``` example

import axios from 'axios';

async function getUserMemo () {
  try {
    const response = await axios.get('https://api.example.com/user/1/memos');
    alert('요청 성공');
  }
  catch (error) {
    alert('요청 실패');
  }
  finally {
    alert('항상 실행');
  }
}
```

## 옵션
Axios 는 사용자가 직접 커스터마이징 하여 라이브러리를 사용할 수 있도록 많은 옵션을 제공한다

1. defaluts 키를 사용하여 옵션을 적용할 수 있다.

``` example 1
import axios from 'axios';

axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['X-Example-Key'] = 'example';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/*
 * baseURL 옵션을 사용해서 실제론 
 * 'https://api.example.com/users/1/memos' 이 된다.
 */
axios.get('/users/1/memos');
```

2. Axios 를 초기화하는 시점에 create 메소드를 사용해 옵션을 적용할 수 있다.
``` example 2
import axios from 'axios';

const AuthAPI = axios.create({
  baseURL = 'https://api.example.com',
});
const UserAPI = axios.create({
  baseURL = 'https://api.users.com',
});
```

3. Axios 의 메소드를 사용하는 시점에 옵션을 적용할 수 있다.
``` example 3
import axios from 'axios';

axios.post('/users/1/memos', {
  title: '메모 제목',
  content: '메모의 내용',
}, {
  headers: { 'Content-Type': 'application/json' },
});
```

다양한 옵션의 종류
```
{
  baseURL,            -> 베이스 주소
  transformRequest,   -> 보내기 전 가공
  transformResponse,  -> 응답 받아 사용하기 전 가공
  headers,            -> 커스터마이징 된 값을 HTTP 헤더에 ... X-Custom-Value
  params,             -> URL 에 쿼리스트링 인자를 사용가능 ... params: { id: 1 } 은 `?id=` 으로 변환 후 url 맨 뒤 추가
  paramsSerializer,   -> 가공할 방법을 커스터마이징
  data,               -> HTTP 바디에 데이터를 담을 수 있음 ... fetch 는 body / axios 는 data
  timeout,            -> 응답을 대기하는 시간 ... RN은 whatwh-fetch 런타임을 사용하므로 기본적으로 시간 초과가 없습
  withCredentials,    -> Access-Control 사용 여부
  responseType,       -> HTTP 응답의 자료형을 정의
  responseEncoding,   -> 인코딩 형식을 정의 ... stream 일 경우 이 옵션은 무시됨
  xsftCookieName,     -> XSRF 토큰을 담고 있는 쿠키의 이름을 의미
  xsrfHeaderName,     -> XSRF 토큰을 헤더에 담아 보낼 때의 키 값
  maxContentLength,   -> HTTP 응답의 최대 크기를 정함
  validateStatus      -> 응답 상태 코드 중 어떤 것을 '성공'으로 처리할 지 ... 200 ~ 300 이 기본 값 ... axios.catch 로 제어
}
```

Axios의 응답 구조
```
{
  data: {},           -> 서버에서 응답에 실어 보낸 값
  status: 200,        -> 서버 응답의 상태 코드
  statusText: 'OK',   -> 서버 응답의 상태 메시지
  config: {},         -> 서버로 요청을 보낼 때 어떤 설정을 가지고 있었는지를 의미
  request: {}         -> 현재 응답을 받기 위해 서버로 보낸 데이터
}
```

요청이 성공했다면 axios.then 함수를 사용하여 응답을 확인하고 제어할 수 있음
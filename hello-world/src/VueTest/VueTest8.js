import Vue from 'vue'
import VueRouter from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(VueRouter)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/foo',
      component: Foo
    },
    {
      path: '/bar',
      component: Bar
    },
  ]
});

// ex ~~~
// src/router/auth.js
export const AuthRouters = [
  {
    path: '/auth/login',
    name: 'Login',
    component: Login
  }
]

// src/router/user.js
export const UserRouters = [
  {
    path: '/user/profile',
    name: 'Profile',
    component: Profile
  }
]

// src/router/index.js
import { AuthRouters } from '@/router/auth'
import { UserRouters } from '@/router/user'

export default new Router({
  routes: [
    ...AuthRouters,
    ...UserRouters
  ]
});

// 여러가지 속성
/*
  path -> 라우트가 가질 경로
  name -> 라우트의 이름
  component -> 라우트가 불러와졌을 때 <router-view> 에 주입될 컴포넌트
  components -> 라우트가 불러와졌을 때 !! 이름을 가지는 뷰에 주입될 컴포넌트들
  redirect -> 리다이렉트할 라우트
  alias -> 라우트의 별칭
  children -> 중첩된 라우트들
  props -> 동적 세그먼트 변수를 컴포넌트의 props 속성으로 주입할 것인지 여부
*/

// 동적 세그먼트란 ?
// path 속성을 사용하여 패턴을 정의해준다 ...
new VueRouter({
  routes: [
    // 동적 세그먼트는 콜론으로 시작함.
    { path: '/posts/:postId', component: PostDetailPage }
  ]
})

// 이렇게 postId를 동적으로 설정하면
created() {
  console.log(`${this.$route.params.postId}`); // 이렇게 호출하는 것이 가능함
}

// 이 경우에 컴포넌트가 다시 로딩되는 것이 아니기 때문에 ,,, created 나 ounted 같은 기존에 불러왔던 컴포넌트의 라이프 사이클 훅이 홏루되지 않는다는 것을 의미
// Vue 의 watch 속성을 사용하여 $route 객체를 감시함으로써 동적 세그먼트가 변경되었다는 것을 감지할 수 있음
export default {
  name: 'PostDetailPage',
  watch: {
    '$route' (to, from) {
      console.log(' 라우트 객체가 변경되었음 ');
    }
  }
}

// 이외에도 내비게이션 가드의 일종인 beforeRouteUpdate 가드를 사용하여 라우트 객체가 갱신되었음을 감지할 수도 있다
export default {
  name: 'PostDetailPage',
  beforeRouteUpdate (to, from, next) {
    console.log('라우트 객체가 변경되었음');
    // next 함수를 호출하지 않으면 다음 라우트로 이동하지 않는다
    next()
  }
}

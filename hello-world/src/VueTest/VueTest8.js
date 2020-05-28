// 4.2 Vue Router 사용하는 법 =======================================================================================================
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

// 4.3 여러가지 속성 =======================================================================================================
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

// 4.4 동적 세그먼트란 ? =======================================================================================================
// path 속성을 사용하여 패턴을 정의해준다 ...
new VueRouter({
  routes: [
    // 동적 세그먼트는 콜론으로 시작함.
    { path: '/posts/:postId', component: PostDetailPage }
  ]
})

// 이렇게 postId를 동적으로 설정하면
export default {
  name: 'PostDetailPage',
  created() {
    console.log(`${this.$route.params.postId}`); // 이렇게 호출하는 것이 가능함
  }
}
// 여러개의 동적 세그먼트를 가진 라우트
// { path: '/users/:userId/post/:postId', name: 'UserPost' }

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

// 매칭 우선순위 !!
new VueRouter({
  // 이것은 /hello 도 :postId로 반응해버리기 때문에 올바르지 않다
  routes: [
    { path: '/posts/:postId', name: 'PostDetailPage' },
    { path: '/posts/hello', name: 'HelloPost' },
  ]
})

new VueRouter({
  // 바람직한 코딩방법
  routes: [
    { path: '/posts/hello', name: 'HelloPost' },
    { path: '/posts/:postId', name: 'PostDetailPage' },
  ]
})

// 4.5 중첩된 라우트 =======================================================================================================
// 사용하지 않은 경우 아래와 같은 라우트가 있을 때
new VueRouter({
  routes: [
    {
      path: '/posts/foo',
      name: 'Foo',
      component: Post
    },
    {
      path: '/posts/bar',
      name: 'Bar',
      component: Post
    }
  ]
})

/*
  이렇게 구성해야한다
    <template>
      <div>
        <Foo v-if="$route.fullPath === '/posts/foo' "/>
        <Bar v-else-if="$route.fullPath === '/posts/bar' "/>
      </div>
    </template>
*/

/*
  중첩된 라우트를 사용했을 경우
    <div id="app">
      <router-view></router-view>
    </div>
  이렇게 구성하고 아래와같이 사용하는 것이 가능
*/
new VueRouter({
  routes: [
    {
      path: '/posts',
      component: Post,
      children: [
        {
          path: '', // /posts 경로인 경우 , 리다이렉트나 컴포넌트를 할당할 수도 있음
        },
        {
          path: '/foo', // /posts/foo 경로와 일치하는 라우트
          component: Foo
        },
        {
          path: '/bar', // /posts/bar 경로와 일치하는 라우트
          component: Bar
        }
      ]
    }
  ]
})

// 4.6 프로그래밍 방식 내비게이션 =======================================================================================================
// router-link 컴포넌트를 사용하여 anchor 태그를 만드는 방법 외에도 라우팅할 수 있도록 지원하고 있음
// router.push

push: Function(location, onComplete?, onAbort?)

$route.push('/posts') // 경로를 직접 전달
$route.push({ path: '/posts' }) // 라우트 객체를 통해 경로를 전달
$route.push({ name: 'Posts' }) // 라우트 객체를 통해 라우트 이름을 전달
$route.push(
  { path: '/posts' },
  () => {
    console.log('라우트 이동이 완료');
  },
  () => {
    console.log('라우트 이동이 중단');
  }
);

replace: Function(location, onComplete?, onAbort?)
// push와 같은 역할을 하지만 브라우저의 히스토리에 이동한 라우트가 추가되지 않는다. ->>> push 는 히스토리에 라우트가 추가됨
// 즉, replace 메소드를 사용하여 라우트를 변경하게 되면 이후 사용자가 뒤로가기 버튼을 눌러도 돌아갈 수 없다

// 이동을 하는 명령어
go: Function(n)
$route.go(1) // 히스토리 스택에서 한 단계 앞으로 이동
$route.go(-1) // 히스토리 스택에서 한 단계 뒤로 이동

// 4.7 이름을 가지는 뷰 =======================================================================================================

// 이렇게 여러가지 이름을 부여할 수 있다.
<router-view name="header"></router-view>
<router-view name="aside"></router-view>
<router-view></router-view>
<router-view name="footer"></router-view>

// 사용 예시
new VueRouter({
  routes: [
    {
      path: '/',
      component: {
        header: AppHeader,
        aside: AppAside,
        default: Content, // 주의
        footer: AppFooter
      }
    }
  ]
})

// 4.8 리다이렉트와 별칭 =======================================================================================================
new VueRouter({
  routes: [
    {
      // 리다이렉트할 페이지의 경로를 지정
      path: '/a', redirect: '/b'
    },
    {
      // 리다이렉트할 라우트의 이름을 지정
      path: '/a2', redirect: { name: 'PageB' }
    },
    {
      // 함수를 통해 라우트를 반환할 수도 있음
      path: '/a3', redirect: to => {
        return { name: 'PageC' }
      }
    }
  ]
})

// 별명 ==============
new VueRouter({
  routes: [
    {
      // /a 에 방문해서 /b 로 가는 것
      path: '/a', redirect: '/b'
    },
    {
      // /a 에 방문해서 URL만 /b 로 변경되는것
      path: '/a', alias: '/b'
    }
  ]
})
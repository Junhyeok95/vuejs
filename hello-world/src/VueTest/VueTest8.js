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

// 4.9 라우트 컴포넌트에 속성 전달 =======================================================================================================
// this.$route.params.xxx 를 통해서 undefined 가 될 수도 있다.
// 강한 결합 라우트의 동적 세그먼트를 props 속성으로 주입할 수 있는 기능을 제공한다

new VueRouter({
  routes: [
    {
      path: '/posts/:postId',
      component: Example,
      props: true // 이 옵션을 true
    }
  ]
})

new VueRouter({ // 이름이 있는 경우
  routes: [
    {
      path: '/posts/:postId',
      component: {
        header: AppHeader,
        contents: Example
      },
      props: {
        contents: true
      }
    }
  ]
})

// 사용 예시
export default {
  name: 'Example',
  props: {
    postId: {
      type: String,
      required: true // 여기에 true
    }
  },
  created() {
    console.log(this.postId);
  }
}

// 4.10 해시 모드와 히스토리 모드 =======================================================================================================
// 두 가지 라우팅 모드를 지원한다. 아무 설정도 하지 않은 Vue Router는 기본적으로 해시모드로 작동한다
// -> http://localhost:8000/#/example/page

/*
  해시 모드는 단일 페이지 SPA 가 개발되기 시작하면서 고안된 방법이다.
  단일 페이지 이동은 보기에는 페이지가 이동하는 것처럼 보이지만 ...
  실제로 페이지가 이동되지 않지만 사용자는 마치 페이지가 이동하는 것 같은 사용자 경험을 받을 수 있다.
  그러나 이렇게 페이지 이동을 흉내만 낸다면 사용자는 어떤 페이지를 들어가더라도 항상 같은 URL을 보게 된다.

  URL이 변경되지 않으면 사용자가 사이트 내에서 자신의 현재 위치를 인지하기 어렵고,
  링크 공유와 같이 URL과 직접적인 연관이 있는 행동이 불가능하다는 등의 문제점이 발생하기 때문에...
  그래서 나온 방법이 해시(#)를 이용하는 방법이다

  -> http://localhost:8000#hello
  이렇게 해서 해시 뒤쪽으로 오는 문자열을 프래그먼트 (Fragment) 라고 부른다.
  원래 역할은 어던 페이지 내부의 앵커로 이동 이다 ...
  
  http://localhost:8000#hello 의 경우
  1. 응답으로 받은 HTML 내부에서 이름이 hello인 엘리먼트 를 찾는다
  2. 이후 브라우저가 <a id="hello"></a> 라는 태그를 발견하면 자동으로 스크롤을 옮겨줌

  Vue Router의 해시 모드는 브라우저가 페이지의 경로를 읽어올 때 해시(#) 뒤쪽으로 오는 문자열은 경로로 인식하지 않는다는 성질을 이용한 것
  + URL에 불필요한 해시(#)가 들어가서 미관상 좋지 않음
  최근에는 HTML5 History API를 사용하는 URL 변경 방법을 더 선호하고 있다.
  
  !!!
    pushState라는 메소드를 제공해주는데, 이 메소드는 URL을 변경하고 브라우저의 히스토리도 남겨지지만 실제로 페이지를 이동하지 않는 기능을 가짐
    물론 해시 모드도 history API를 사용하여 라우팅을 진행하기 때문에 히스토리가 쌓이지 않는 것은 아니다.

  가장 큰 차이점 !!!
  해당 브라우저가 History API를 지원하지 않는 경우
*/

// 4.11 내비게이션 가드 =======================================================================================================
// 라우터의 이동을 막거나 혹은 다른 라우터로 리다이렉팅 할 수 있는 기능이다.
// 전역 가드, 라우트별 가드, 컴포넌트별 가드로 나뉜다.


// 4.11.1 전역가드 -> 주로 어플리케이션 내에서 공통적으로 수행해야 하는 동작을 정의할 때 사용
const router = new VueRouter({ ... })
router.berforeEach((to, from, next) => {
  // to -> 다음에 이동할 라우트 정보 , from -> 이전 라우트 정보 , next -> 명시적으로 호출되어야 다음 라우트로 이동
  next() // 이렇게

  // + 팁
  next(false) // 내비게이팅을 중단하고 이전 라우트로 돌아감

  next('/') // 이 인자로 주어진 라우트로 이동
  next({ path: '/' }) // 이 인자로 주어진 라우트로 이동

  // 인자가 Error 객체라면 라우트 이동이 취소되고 router.onError를 사용하여 등록된 콜백이 호출됨
  const error = new Error('Navigating Failed')
  next(error)
})

router.afterEach((to, from) => {
  // 라우트 이동을 제한하는 기능은 없다 ...
  // 이동이 완료된 후 호출되는 훅이라서 next가 없다
})

// 4.11.2 라우터별 가드
new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      berforeEach: (to, from, next) => {
        // 설정 ...
      }
    }
  ]
})

// 4.11.3 컴포넌트별 가드
export default {
  name: 'Foo',
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // ...
    // 라우팅이 아직 끝나지 않았기 때문에 컴포넌트가 생성되지 않은 상태 !! this 컨텍스트를 동해서 컴포넌트에 접근할 수 없다는 것을 의미 ㅜㅜ
  },
  beforeRouteLeave (to, from, next) {
    // ...
    // this 컨텍스트를 통해서 컴포넌트에 접근 할 수 있다.
    // 사용자가 저장하지 않은 편집 내용을 두고 시룻로 현재 라우트를 떠나는 것을 방지하는 등의 동작에 사용될 수 있다.
    
    // 예를 들어 컴포넌트의 어떤 값이 있을때 라우팅을 하면 의사를 묻고
    // next(false)를 활용한 코딩을 하자 !!
  },
}
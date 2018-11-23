import Home from '@/views/Home.vue'
export default [
  {
    path: "/",
    alias: "home_page",
    name: "home",
    component: Home,
    props: route => ({
      food: route.query.food
    }),
    beforeEnter: (to, from, next) => {
      // 在里面我们可以做一些对逻辑的处理，
      // if (from.name === 'about') {
      //   alert("这是从about来的");
      // } else {
      //   alert("这不是从about来的");
      // }
      next();
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login.vue")
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
    props: {
      food: "banana"
    },
    meta: {
      title: "关于"
    }
  },
  {
    path: "/argu/:name",
    component: () => import("@/views/argu.vue"),
    props: true
  },
  {
    path: "/count-to",
    name: "count_to",
    component: () => import("@/views/count-to.vue")
  },
  {
    path: "/split-pane",
    name: "split-pane",
    component: () => import("@/views/split-pane.vue")
  },
  // 嵌套路由
  {
    path: "/parent",
    component: () => import("@/views/parent.vue"),
    // children属性是一个数组，里面包含嵌套在parent组件里面的子集页面
    children: [
      {
        // 子集的path里面是不需要斜线的,只有父级的path才需要写 加 "/"。作为嵌套路由，他会自动补全子集里面的 "/" 所以path的值直接就是 'child'
        path: "child",
        component: () => import("@/views/child.vue")
      }
    ]
  },
  // 命名视图
  {
    path: "/named_view",
    // 这个是 components 之前的都是 component 没有 s。 加上 s 之后说明我们要加载多个组件
    components: {
      // 如果在之前的 app.vue 中的 router-view 没有命名的话，那么就加载 default 对应的组件的
      default: () => import("@/views/child.vue"),
      email: () => import("@/views/email.vue"),
      tel: () => import("@/views/tel.vue")
    }
  },
  {
    path: "/main",
    redirect: to => "/"
  },
  {
    path: "/store",
    component: () => import("@/views/store.vue")
  },
  {
    // path 为 * ，代表匹配任何的路径
    path: "*",
    component: () => import("@/views/error_404.vue")
  }
];

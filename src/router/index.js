import Vue from 'vue'
import VueRouter from 'vue-router'
import UserList from '../components/UserList.vue'
import UserComponentSon from '../components/UserComponentSon'

Vue.use(VueRouter)


const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/users' },
        { path: '/users', component: UserList },
        { path: '/users/:id', component: UserComponentSon, props: true },
    ]
    // 在这里声明路由规则
})
export default router
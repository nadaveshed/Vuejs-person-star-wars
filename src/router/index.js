import Vue from 'vue'
import VueRouter from 'vue-router'
import PeopleList from '../components/PeopleList.vue'
import PersonInfo from '../components/PersonInfo.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'PeopleList',
        component: PeopleList
    },
    {
        path: '/person-Info/:id',
        name: 'PersonInfo',
        component: PersonInfo,
        params: true
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
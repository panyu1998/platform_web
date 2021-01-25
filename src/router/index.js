import Vue from 'vue'
import ElementUI from 'element-ui'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import ELogin from '@/ELogin'
import EVerify from '@/EVerify'
import EIndex from '@/EIndex'
import EMaterials from '@/EMaterials'
import ESurvey from '@/ESurvey'
import EReport from '@/EReport'
import EAdd from '@/EAdd'
import EHealthEdu from '@/EHealthEdu'
import EMaterialed from '@/EMaterialed'
import errohtml from '@/errohtml'
Vue.use(Router)
Vue.use(ElementUI)
Vue.use(VueResource)
const router= new Router({
  routes: [
		{
		  path: '/',
		  name: 'ELogin',
		  component: ELogin,
		  meta:{
		  	title: '突发事件登录页',
			  keepAlive: false,
			  
		  }
		},
		{
			path: '/EIndex',
			name: 'EIndex',
			component: EIndex,
			meta: {
				title: '首页',
				keepAlive: true,
				requireAuth: true
			}
		},
		{
			path: '/EAdd',
			name: 'EAdd',
			component: EAdd,
			meta: {
				title: '核实处置',
				keepAlive: true,
				requireAuth: true
			}
		},
		{
			path: '/EVerify',
			name: 'EVerify',
			component: EVerify,
			meta: {
				title: '核实处置',
				keepAlive: true,
				requireAuth: true
			}
		},

		{
			path: '/EMaterials/:eid',
			name: 'EMaterials',
			component: EMaterials,
			meta: {
				title: '物资准备',
				keepAlive: true,
				requireAuth: true
			}
		},
    {
    	path: '/EMaterialed',
    	name: 'EMaterialed',
    	component: EMaterialed,
    	meta: {
    		title: '物资准备（事件列表）',
    		keepAlive: true,
			requireAuth: true
    	}
    },
		{
			path: '/ESurvey',
			name: 'ESurvey',
			component: ESurvey,
			meta: {
				title: '疫情调查',
				keepAlive: true,
				requireAuth: true
			}
		},
		{
			path: '/EHealthEdu',
			name: 'EHealthEdu',
			component: EHealthEdu,
			meta: {
				title: '健康教育',
				keepAlive: true,
				requireAuth: true
			}
		},
		{
			path: '/EReport',
			name: 'EReport',
			component: EReport,
			meta: {
				title: '查看报告',
				keepAlive: true,
				requireAuth: true
			}
		},
    {
    	path: '*',
    	  name: 'errohtml',
    	  component: errohtml
    }
  ]
})
export default router

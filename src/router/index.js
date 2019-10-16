import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Login from '@/components/Login'
import LoginByEnt from '@/components/LoginByEnt'
import Register from '@/components/Register'
import RegisterEnt from '@/components/RegisterEnt'
import Dashboard from '@/components/Dashboard'
import HrDashboard from '@/components/HrDashboard'
import HrRecruit from '@/components/HrRecruit'
import AddRecruit from '@/components/AddRecruit'
import BaseInfo from '@/components/BaseInfo'
import Agreement from '@/components/Agreement'
import HrAgreement from '@/components/HrAgreement'
import IdCardAuth from '@/components/IdCardAuth'
import CreateProfile from '@/components/CreateProfile'
import EditProfile from '@/components/EditProfile'
import AddExperience from '@/components/AddExperience'
import AddNews from '@/components/AddNews'
import EditInformation from '@/components/EditInformation'
import AddEducation from '@/components/AddEducation'
import Profiles from '@/components/Profiles'
import PostManager from '@/components/PostManager'
import EditNews from '@/components/EditNews'
import Profile from '@/components/profile/Profile'
import Posts from '@/components/posts/Posts'
import Post from '@/components/posts/Post'
Vue.use(Router)

export default new Router({
  routes: [
		{ path: '*',redirect: "/" },
		{ path: '/',component: Landing },
		{ path: '/login',component: Login },
		{ path: '/loginByEnt',component: LoginByEnt },
		{ path: '/registerEnt',component: RegisterEnt },
		{ path: '/register',component: Register },
		{ path: '/dashboard',component: Dashboard },
		{ path: '/hrDashboard',component: HrDashboard },
		{ path: '/hrRecruit',component: HrRecruit },
		{ path: '/idCardAuth',component: IdCardAuth },
		{ path: '/baseInfo',component: BaseInfo },
		{ path: '/agreement',component: Agreement },
		{ path: '/edit-Information',component: EditInformation },
		{ path: '/edit-news/:id',component: EditNews },
		{ path: '/hrAgreement',component: HrAgreement },
		{ path: '/create-profile',component: CreateProfile },
		{ path: '/edit-profile',component: EditProfile },
		{ path: '/add-experience',component: AddExperience },
		{ path: '/add-news',component: AddNews },
		{ path: '/add-Recruit',component: AddRecruit },
		{ path: '/add-education',component: AddEducation },
		{ path: '/profiles',component: Profiles },
		{ path: '/postManager',component: PostManager },
		{ path: '/profile/:handle',component: Profile },
		{ path: '/feed',component: Posts },
		{ path: '/post/:id',component: Post }
  ],
	linkActiveClass: 'active', //当前路由激活状态
	mode:"history"
})

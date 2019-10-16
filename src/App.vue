<template>
  <div id="app">
    <NavBar></NavBar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <!-- <Landing></Landing> -->
    <footes-app></footes-app>
    <Loading v-show="loading"></Loading>
  </div>
</template>

<script>
    import NavBar from './components/NavBar'
    import Landing from './components/Landing'
    import Footer from './components/Footer'
    import Loading from './components/common/Loading'

    export default {
        name: 'App',
        components: {
            NavBar,
            Landing,
            "footes-app": Footer,
            Loading
        },
        computed: {
            loading() {
                return this.$store.getters.loading;
            }
        },
        created() {
            if (localStorage.jwtToken) {
                this.$store.dispatch("setUser", JSON.parse(window.localStorage.getItem('cUser')));
                this.$store.dispatch("setIsAuthenticated", localStorage.jwtToken);

                let item = window.localStorage.getItem("identity");
                if (item == "HR") {

                } else if (item == "USER") {
                    this.$axios.post('/api/hrbase/personalAuth/info/getUser').then(res => {
                        console.log(res.data);
                        if (res.data.code !== 0 && res.data.code !== 5000) {
                            console.log('hi')
                            this.$store.dispatch("setIsAuthenticated", false);
                            this.$store.dispatch("setUser", null);
                            this.$store.dispatch("clearCurrentState");
                            this.$router.push('/login');
                        } else {
                            this.$store.dispatch("setUser", res.data.data);
                        }
                    }).catch(err => {
                        this.$store.dispatch("setIsAuthenticated", false);
                        this.$store.dispatch("setUser", null);
                        this.$store.dispatch("clearCurrentState");
                        this.$router.push('/login');
                    })
                } else {

                }
                //检查token是否过期
            } else {
                this.$store.dispatch("setIsAuthenticated", false);
                this.$store.dispatch("setUser", null);
                this.$store.dispatch("clearCurrentState");
            }
        },
        methods: {
            isEmpty(value) {
                return value === undefined || value === null ||
                    (typeof value === "object" && Object.keys(value).length === 0) ||
                    (typeof value === "string" && value.trim().length === 0)
            }
        },
    }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>

/* global Vue, VueRouter, Vuetify */
const ContributionPage = () => import('./pages/contribution/main.js')
const ContributorPage = () => import('./pages/contributor/main.js')
const ContributorStatsPage = () => import('./pages/contribution-stats/main.js')
const TexturePage = () => import('./pages/texture/main.js')
const AuthPage = () => import('./pages/auth/main.js')
const ProfilePage = () => import('./pages/profile/main.js')

Vue.config.devtools = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

const routes = [
  { path: '/', redirect: '/profile/' }
]

const router = new VueRouter({ routes })

const EMPTY_USER = {
  avatar: '',
  banner: '',
  id: 0,
  username: '',
  email: '',
  roles: []
}

// eslint-disable-next-line no-unused-vars
let v = new Vue({
	router,
	el: '#app',
  data: {
    user: EMPTY_USER,
    tabs: [
      { 
        label: 'User', subtabs: [
          { to: "/profile/", label: "Profile", routes: [{ path: '/profile/', component: ProfilePage }] },
          { to: "/contributions-stats/", label: "Contributions Stats", routes: [{ path: '/contributions-stats/', component: ContributorStatsPage }] },
        ]
      },
      {
        label: 'Admin/Dev', subtabs: [
          { to: "/contributions/", label: "Contributions", routes: [{ path: '/contributions/', component: ContributionPage }] },
          { to: "/contributors/", label: "Contributors", routes: [{ path: '/contributors/', redirect: '/contributors/all/' }, { path: '/contributors/:type?/:name?/', component: ContributorPage }] },
          { to: "/textures/", label: "Textures", routes: [{ path: '/textures/', redirect: '/textures/all/' }, { path: '/textures/:type?/:name?/', component: TexturePage }] }
        ],
        roles: [ "Developer", "Administrator" ]
      }
    ],
    bg: 'transparent',
    snackbar: {
      show: false,
      message: '',
      color: '#222',
      timeout: 20000
    }
  },
  computed: {
    /**
     * Check user perms & add (or not) tabs & routes following user perms
     * @returns all tabs to be added in the html
     */
    validsTabs: function() {
      let res = [];
      let roles = this.userRoles

      for (let i = 0; i < this.tabs.length; i++) {
        let found = false
        
        if (this.tabs[i].roles) {
          this.tabs[i].roles.forEach(role => {
            if (roles.includes(role)) found = true
          })
        } else found = true

        if (found) {
          res.push(this.tabs[i])
          this.tabs[i].subtabs.forEach(subtab => {
            subtab.routes.forEach(route => {
              router.addRoute(route)
            })
          })
        }
      }
      
      return res;
    },
    year: function() {
      return new Date().getFullYear()
    },
    /**
     * Tell if the user is logged
     * @returns true if the user is logged
     */
    isUserLogged: function() {
      return this.user && this.user.id != 0 && this.user.id != null
    },
    /**
     * Get in real time the roles of a user
     * @returns user discord roles
     */
    userRoles: function() {
      return this.user.roles
    }
  },
  methods: {
    showSnackBar: function(message, color = '#222', timeout = 2000) {
      this.snackbar.message = message
      this.snackbar.color = color
      this.snackbar.timeout = timeout
      this.snackbar.show = true
    },
    logout: function() {
      this.user = EMPTY_USER
      window.localStorage.removeItem('auth')

      this.update()
    },
    logUser: function() {
      let auth
      try {
        auth = JSON.parse(window.localStorage.getItem('auth'))
      }
      catch (err) {
        auth = {}
      }

      this.user = Object.assign({}, this.user, auth)
    },
    fetchRoles: function() {
      if (!this.isUserLogged) return

      const data = JSON.parse(JSON.stringify(this.user))

      axios.post('/profile/roles', data)
      .then((res) => {
        this.user.roles = res.data
      })
      .catch(err => {
        console.error(err)
        this.showSnackBar(`${err.message}: ${err.response.data.error}`, 'error')
      })
    },
    /**
     * Use this function in sub-components to check perms
     */
    checkPermissions: function() {
      console.log(this.$route)
      console.log(this.$router.options.routes)
    },
    update: function() {
      this.logUser()
      this.fetchRoles()
    }
  },
  mounted: function() {
    const urlSearchParams = new URLSearchParams(window.location.search)
    let auth = Object.fromEntries(urlSearchParams.entries())

    if (auth.access_token && auth.refresh_token) {
      fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: `Bearer ${auth.access_token}`
        }
      })
      .then(response => response.json())
      .then(json => {

        auth.id = json.id
        auth.avatar = `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}?size=1024`
        auth.banner = json.banner != null ? `https://cdn.discordapp.com/banners/${json.id}/${json.banner}?size=1024` : 'https://raw.githubusercontent.com/Compliance-Resource-Pack/Branding/main/banner/forest.png'
        auth.email = json.email
        auth.username = `${json.username}#${json.discriminator}`

        window.localStorage.setItem('auth', JSON.stringify(auth))

        this.update()
      })
      .finally(() => {
        setTimeout(() => {
          window.location.search = ""
        }, 20);
      })
      .catch(console.error)
    } else this.update()

  },
  vuetify: new Vuetify({
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#fafafa',
          accent:  '#5e3631',
          success: '#22a831',
        },
      }
    },
  }),
})
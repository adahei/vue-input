<template lang="html">
  <section>
    <ul>
      <li v-for="nav in navs">
        <router-link :to="nav.path" exact>{{nav.name}}</router-link>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'Start',
  data () {
    return {
      navs: []
    }
  },
  created () {
    this.createNavigation(this.$router.options.routes[0].children)
  },
  methods: {
    createNavigation (paths) {
      paths.forEach(path => {
        if (path.path !== '') {
          this.navs.push({
            path: path.path || '/',
            name: path.name
          })
        }
      })
    },
    toggleMenu () {
      this.navOpen = !this.navOpen
    }
  }
}
</script>

<style lang="css">
</style>

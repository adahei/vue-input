<template>
  <div id="app">
    <nav class="nav" :class="{'nav--open': navOpen}">
      <ul>
        <li v-for="nav in navs">
          <router-link :to="nav.path" exact>{{nav.name}}</router-link>
        </li>
      </ul>
    </nav>
    <div class="wrap">
      <div class="nav-toggler">
        <button type="button" @click="toggleMenu">Menu</button>
      </div>
      <h1>V-INPUT</h1>
      <Home/>
    </div>
  </div>
</template>

<script>
import Home from '@/views/Home'

export default {
  name: 'app',
  components: {
    Home
  },
  data () {
    return {
      navs: [],
      navOpen: false
    }
  },
  created () {
    this.createNavigation(this.$router.options.routes[0].children)
  },
  methods: {
    createNavigation (paths) {
      paths.forEach(path => {
        this.navs.push({
          path: path.path || '/',
          name: path.name
        })
      })
    },
    toggleMenu () {
      this.navOpen = !this.navOpen
    }
  },
  watch: {
    '$route.path': function () {
      this.navOpen = false
    }
  }
}
</script>

<style lang="scss">
@import 'styles/variables';
@import 'styles/styles';
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
#app {
  position: relative;
  display: flex;
  height: 100%;
}

.nav {
  position: fixed;
  left: 0;
  top: 0;
  width: 220px;
  max-width: 80%;
  overflow: auto;
  height: 100%;
  background-color: $blue-light-2;
  z-index: 999;
  transform: translate3d(-100%,0,0);
  transition: transform .2s ease-in-out;
  backface-visibility: hidden;
  &--open {
    transform: translate3d(0,0,0);
  }
  @media (min-width: 800px) {
    position: relative;
    transform: translate3d(0,0,0);
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    > li {
      flex: 1;
    }
    a {
      display: block;
      padding: $gutter-md $gutter;
      text-decoration: none;
      color: $white;
      &.router-link-active {
        background-color: $blue;
      }
    }
  }
}

.nav-toggler {
  text-align: right;
  @media (min-width: 800px) {
    display: none;
  }
}

.wrap {
  position: relative;
  flex: 1;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  margin: 0 auto;
  background-color: $white;
  padding: 1.4rem;
  h1 {
    text-align: center;
    font-size: 2.4rem;
  }
  section {
    max-width: 550px;
    margin: 0 auto 2rem auto;
    padding-bottom: 2rem;
    border-bottom: 1px solid $gray-light-2;
  }
}
.attention {
  position: relative;
  background-color: $pale;
  color: $pale-dark-4;
  padding: $gutter;
  margin: $gutter-sm 0;
  > p {
    margin: 0;
  }
  &:before {
    content: 'Note:';
    position: absolute;
    top: 2px;
    left: 2px;
    font-size: .7rem;
  }

  &--tip {
    background-color: $blue-light-7;
    color: $blue;
    &:before {
      content: 'Tip:';
    }
  }
}
code {
  display: inline-block;
  padding: 0 $gutter-xs;
  background-color: $gray-dark-4;
  color: $white;
  font-size: .9rem;
  margin-bottom: 2px;
}

.output {
  font-size: .8rem;
  &:before {
    content: 'Output: '
  }
  color: $gray-dark-4;
  font-family: monospace;
  margin-bottom: 1rem;
}

.table, .props-table {
  width: 100%;
  font-size: .9rem;
  border-spacing: 0;
  border-collapse: collapse;
  margin: $gutter-sm 0 $gutter-lg 0;
  th, td {
    padding: $gutter-sm;
    border: 1px solid $gray-light-2;
  }
  thead {
    tr {
      background-color: $blue-light-2;
      color: $white;
    }
    th {
      text-align: left;

    }
  }
  tbody {
    tr {
      background-color: $white;
      &:nth-child(even) {
        background-color: $gray-light-4;
      }
    }
    td {
      font-family: monospace;
      color: $black;
      &.text {
        font: normal 1rem/1.3 'Avenir', Helvetica, Arial, sans-serif;
      }
      &.str { color: $green }
      &.bool { color: $orange }
      &.num { color: $blue-light-2 }
      .y { color: $green }
      .n { color: $red }
      .footnote { color: $gray-dark-4 }
    }
  }
  tfoot {
    td {
      font-size: .9rem;
      border: 0;
      padding: 0;
    }
  }
}
</style>

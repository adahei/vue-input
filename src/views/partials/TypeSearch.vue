<template lang="html">
  <section>
    <h2>Search</h2>

    <props general />
    <props :customProps="customProps" visible />

    <pre v-highlightjs><code class="html">{{ examples.basic }}</code></pre>

    <v-input
      label="Basic Search"
      id="basicSearch"
      type="search"
      v-model="search.basic"
    />
    <div class="output">{{ search.basic }}</div>

    <form @submit.prevent="submit" class="form">
      <v-input
        label="Required Search"
        id="requiredSearch"
        type="search"
        required
        v-model="search.required"
      />
      <div class="output">{{ search.required }}</div>
      <button type="submit">Submit</button>
    </form>

    <v-input
      label="Readonly Search"
      id="readonlySearch"
      initValue="readonly"
      type="search"
      readonly
      v-model="search.readonly"
    />
    <div class="output">{{ search.readonly }}</div>

    <v-input
      label="Disabled Search"
      id="disabledSearch"
      initValue="disabled"
      type="search"
      disabled
      v-model="search.disabled"
    />
    <div class="output">{{ search.disabled }}</div>
  </section>
</template>

<script>
import vInput from '@/components/v-input'
import props from '@/components/props'
export default {
  name: 'SearchInput',
  components: { vInput, props },
  data () {
    return {
      customProps: [],
      examples: {
        basic: '<!-- This is a basic input --> \n' +
               '<v-input \n' +
                '  label="Basic Search" \n' +
                '  id="basicSearch" \n' +
                '  type="search" \n' +
                '  v-model="search.basic" \n' +
                '/>'
      },
      search: {
        basic: {},
        required: {},
        readonly: {},
        disabled: {}
      }
    }
  },
  computed: {
    sortedProps () {
      function compare (a, b) {
        if (a.name < b.name) { return -1 }
        if (a.name > b.name) { return 1 }
        return 0
      }
      return this.componentProps.sort(compare)
    }
  },
  methods: {
    submit () {
      alert('Submit!')
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #eee;
}
</style>

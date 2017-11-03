<template lang="html">
  <section>
    <h2>Password</h2>

    <props general />
    <props :customProps="customProps" visible />

    <pre v-highlightjs><code class="html">{{ examples.basic }}</code></pre>

    <v-input
      label="Basic Password"
      id="basicPassword"
      type="password"
      v-model="password.basic"
    />
    <div class="output">{{ password.basic }}</div>

    <form @submit.prevent="submit" class="form">
      <v-input
        label="Required Password"
        id="requiredPassword"
        type="password"
        required
        v-model="password.required"
      />
      <div class="output">{{ password.required }}</div>
      <button type="submit">Submit</button>
    </form>

    <v-input
      label="Readonly Password"
      id="readonlyPassword"
      initValue="readonly"
      type="password"
      readonly
      v-model="password.readonly"
    />
    <div class="output">{{ password.readonly }}</div>

    <v-input
      label="Disabled Password"
      id="disabledPassword"
      initValue="disabled"
      type="password"
      disabled
      v-model="password.disabled"
    />
    <div class="output">{{ password.disabled }}</div>
  </section>
</template>

<script>
import vInput from '@/components/v-input'
import props from '@/components/props'
export default {
  name: 'PasswordInput',
  components: { vInput, props },
  data () {
    return {
      customProps: [],
      examples: {
        basic: '<!-- This is a basic input --> \n' +
               '<v-input \n' +
                '  label="Basic Password" \n' +
                '  id="basicPassword" \n' +
                '  type="password" \n' +
                '  v-model="password.basic" \n' +
                '/>'
      },
      password: {
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

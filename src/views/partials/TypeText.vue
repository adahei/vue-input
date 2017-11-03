<template lang="html">
  <section>
    <h2>Text</h2>

    <props general />

    <pre v-highlightjs><code class="html">{{ examples.basic }}</code></pre>

    <v-input
      label="Basic Text"
      id="basicText"
      v-model="text.basic"
    />
    <div class="output">{{ text.basic }}</div>

    <form @submit.prevent="submit" class="form">
      <v-input
        label="Required Text"
        id="requiredText"
        required
        v-model="text.required"
      />
      <div class="output">{{ text.required }}</div>
      <button type="submit">Submit</button>
    </form>

    <v-input
      label="Readonly Text"
      id="readonlyText"
      initValue="readonly"
      readonly
      v-model="text.readonly"
    />
    <div class="output">{{ text.readonly }}</div>

    <v-input
      label="Disabled Text"
      id="disabledText"
      initValue="disabled"
      disabled
      v-model="text.disabled"
    />
    <div class="output">{{ text.disabled }}</div>
  </section>
</template>

<script>
import vInput from '@/components/v-input'
import props from '@/components/props'
export default {
  name: 'TextInput',
  components: { vInput, props },
  data () {
    return {
      componentProps: [],
      examples: {
        basic: '<!-- This is a basic input --> \n' +
               '<v-input \n' +
                '  label="Basic Text" \n' +
                '  id="basicText" \n' +
                '  v-model="text.basic" \n' +
                '/>'
      },
      text: {
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

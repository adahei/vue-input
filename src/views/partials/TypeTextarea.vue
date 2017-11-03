<template lang="html">
  <section>
    <h2>Textarea</h2>

    <props general />
    <props :customProps="customProps" visible />

    <pre v-highlightjs><code class="html">{{ examples.basic }}</code></pre>

    <v-input
      label="Basic Textarea"
      id="basicTextarea"
      type="textarea"
      v-model="textarea.basic"
    />
    <div class="output">{{ textarea.basic }}</div>

    <form @submit.prevent="submit" class="form">
      <v-input
        label="Required Textarea"
        id="requiredTextarea"
        type="textarea"
        required
        v-model="textarea.required"
      />
      <div class="output">{{ textarea.required }}</div>
      <button type="submit">Submit</button>
    </form>

    <v-input
      label="Readonly Textarea"
      id="readonlyTextarea"
      initValue="readonly"
      type="textarea"
      readonly
      v-model="textarea.readonly"
    />
    <div class="output">{{ textarea.readonly }}</div>

    <v-input
      label="Disabled Textarea"
      id="disabledTextarea"
      initValue="disabled"
      type="textarea"
      disabled
      v-model="textarea.disabled"
    />
    <div class="output">{{ textarea.disabled }}</div>
  </section>
</template>

<script>
import vInput from '@/components/v-input'
import props from '@/components/props'
export default {
  name: 'TextareaInput',
  components: { vInput, props },
  data () {
    return {
      customProps: [
        { name: 'rows', footnote: '', type: 'Number', default: '5', required: false },
        { name: 'cols', footnote: '', type: 'Number', default: '100', required: false }
      ],
      examples: {
        basic: '<!-- This is a basic input --> \n' +
               '<v-input \n' +
                '  label="Basic Textarea" \n' +
                '  id="basicTextarea" \n' +
                '  type="textarea" \n' +
                '  v-model="textarea.basic" \n' +
                '/>'
      },
      textarea: {
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

<template lang="html">
  <section>
    <h2>E-mail</h2>

    <props general />
    <props :customProps="customProps" visible />

    <pre v-highlightjs><code class="html">{{ examples.basic }}</code></pre>

    <v-input
      label="Basic Email"
      id="basicEmail"
      type="email"
      v-model="email.basic"
    />
    <div class="output">{{ email.basic }}</div>

    <form @submit.prevent="submitReq" class="form">
      <div class="attention">
        <p>This required input also trigger the validation function.</p>
      </div>
      <v-input
        label="Required Email"
        id="requiredEmail"
        required
        type="email"
        v-model="email.required"
      />
      <div class="output">{{ email.required }}</div>
      <button type="submit">Submit</button>
    </form>

    <form @submit.prevent="submitVal" class="form">
      <div class="attention">
        <p>If not required the validation only triggers when it has a value to validate.</p>
      </div>
      <v-input
        label="Validate Email"
        id="validateEmail"
        validate
        type="email"
        v-model="email.validate"
      />
      <div class="output">{{ email.validate }}</div>
      <button type="submit">Submit</button>
    </form>

    <form @submit.prevent="submitReqVal" class="form">
      <v-input
        label="Required and Validate Email"
        id="validateEmail"
        validate
        required
        type="email"
        v-model="email.reqAndVal"
      />
      <div class="output">{{ email.reqAndVal }}</div>
      <button type="submit">Submit</button>
    </form>

    <v-input
      label="Readonly Email"
      id="readonlyEmail"
      initValue="example@domain.com"
      readonly
      type="email"
      v-model="email.readonly"
    />
    <div class="output">{{ email.readonly }}</div>

    <v-input
      label="Disabled Email"
      id="disabledEmail"
      initValue="example@domain.com"
      disabled
      type="email"
      v-model="email.disabled"
    />
    <div class="output">{{ email.disabled }}</div>
  </section>
</template>

<script>
import vInput from '@/components/v-input'
import props from '@/components/props'
export default {
  name: 'EmailInput',
  components: { vInput, props },
  data () {
    return {
      customProps: [
        { name: 'step', footnote: '', type: 'Number', default: '1', required: false },
        { name: 'min', footnote: '', type: 'Number', default: '0', required: false },
        { name: 'max', footnote: '', type: 'Number', default: '100', required: false },
        { name: 'validate', footnote: '', type: 'Boolean', default: false, required: false },
        { name: 'validationMsg', footnote: '', type: 'String', default: '', required: false },
        { name: 'adjustmentButtons', footnote: '', type: 'Boolean', default: false, required: false }
      ],
      examples: {
        basic: '<!-- This is a basic input --> \n' +
               '<v-input \n' +
                '  label="Basic Email" \n' +
                '  id="basicEmail" \n' +
                '  type="email" \n' +
                '  v-model="email.basic" \n' +
                '/>'
      },
      email: {
        basic: {},
        required: {},
        validate: {},
        reqAndVal: {},
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
    submitReq () {
      alert('Submit required form!')
    },
    submitVal () {
      alert('Submit validation form!')
    },
    submitReqVal () {
      alert('Submit require and validation form!')
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

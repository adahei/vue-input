<template lang="html">
  <section>
    <h2>Number</h2>

    <props general />
    <props :customProps="customProps" visible />

    <pre v-highlightjs><code class="html">{{ examples.basic }}</code></pre>

    <v-input
      label="Basic Number"
      id="basicNumber"
      type="number"
      v-model="number.basic"
    />
    <div class="output">{{ number.basic }}</div>

    <form @submit.prevent="submitReq" class="form">
      <div class="attention">
        <p>This required input also trigger the validation function.</p>
      </div>
      <v-input
        label="Required Number"
        id="requiredNumber"
        required
        type="number"
        v-model="number.required"
      />
      <div class="output">{{ number.required }}</div>
      <button type="submit">Submit</button>
    </form>

    <form @submit.prevent="submitVal" class="form">
      <div class="attention">
        <p>If not required the validation only triggers when it has a value to validate.</p>
      </div>
      <v-input
        label="Validate Number"
        id="validateNumber"
        validate
        type="number"
        v-model="number.validate"
      />
      <div class="output">{{ number.validate }}</div>
      <button type="submit">Submit</button>
    </form>

    <form @submit.prevent="submitReqVal" class="form">
      <v-input
        label="Required and Validate Number"
        id="validateNumber"
        validate
        required
        type="number"
        v-model="number.reqAndVal"
      />
      <div class="output">{{ number.reqAndVal }}</div>
      <button type="submit">Submit</button>
    </form>

    <v-input
      label="Readonly Number"
      id="readonlyNumber"
      initValue="36"
      readonly
      type="number"
      v-model="number.readonly"
    />
    <div class="output">{{ number.readonly }}</div>

    <v-input
      label="Disabled Number"
      id="disabledNumber"
      initValue="42"
      disabled
      type="number"
      v-model="number.disabled"
    />
    <div class="output">{{ number.disabled }}</div>

    <v-input
      label="Number with adjustment buttons"
      id="AdjNumber"
      initValue="42"
      adjustmentButtons
      type="number"
      v-model="number.adjustment"
    />
    <div class="output">{{ number.adjustment }}</div>
  </section>
</template>

<script>
import vInput from '@/components/v-input'
import props from '@/components/props'
export default {
  name: 'NumberInput',
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
                '  label="Basic Number" \n' +
                '  id="basicNumber" \n' +
                '  type="number" \n' +
                '  v-model="number.basic" \n' +
                '/>'
      },
      number: {
        basic: {},
        required: {},
        validate: {},
        reqAndVal: {},
        readonly: {},
        disabled: {},
        adjustment: {}
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

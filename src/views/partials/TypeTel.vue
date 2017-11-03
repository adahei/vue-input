<template lang="html">
  <section>
    <h2>Tel</h2>

    <props general />
    <props :customProps="customProps" visible />

    <pre v-highlightjs><code class="html">{{ examples.basic }}</code></pre>

    <v-input
      label="Basic Tel"
      id="basicTel"
      type="tel"
      v-model="tel.basic"
    />
    <div class="output">{{ tel.basic }}</div>

    <form @submit.prevent="submitReq" class="form">
      <div class="attention">
        <p>This required input also trigger the validation function.</p>
      </div>
      <v-input
        label="Required Tel"
        id="requiredTel"
        required
        type="tel"
        v-model="tel.required"
      />
      <div class="output">{{ tel.required }}</div>
      <button type="submit">Submit</button>
    </form>

    <form @submit.prevent="submitVal" class="form">
      <div class="attention">
        <p>If not required the validation only triggers when it has a value to validate.</p>
      </div>
      <v-input
        label="Validate Tel"
        id="validateTel"
        validate
        type="tel"
        v-model="tel.validate"
      />
      <div class="output">{{ tel.validate }}</div>
      <button type="submit">Submit</button>
    </form>

    <form @submit.prevent="submitReqVal" class="form">
      <v-input
        label="Required and Validate Tel"
        id="validateTel"
        validate
        required
        type="tel"
        v-model="tel.reqAndVal"
      />
      <div class="output">{{ tel.reqAndVal }}</div>
      <button type="submit">Submit</button>
    </form>

    <v-input
      label="Readonly Tel"
      id="readonlyTel"
      initValue="123456789"
      readonly
      type="tel"
      v-model="tel.readonly"
    />
    <div class="output">{{ tel.readonly }}</div>

    <v-input
      label="Disabled Tel"
      id="disabledTel"
      initValue="123456789"
      disabled
      type="tel"
      v-model="tel.disabled"
    />
    <div class="output">{{ tel.disabled }}</div>
  </section>
</template>

<script>
import vInput from '@/components/v-input'
import props from '@/components/props'
export default {
  name: 'TelInput',
  components: { vInput, props },
  data () {
    return {
      customProps: [
        { name: 'validate', footnote: '', type: 'Boolean', default: false, required: false },
        { name: 'validationMsg', footnote: '', type: 'String', default: '', required: false }
      ],
      examples: {
        basic: '<!-- This is a basic input --> \n' +
               '<v-input \n' +
                '  label="Basic Tel" \n' +
                '  id="basicTel" \n' +
                '  type="tel" \n' +
                '  v-model="tel.basic" \n' +
                '/>'
      },
      tel: {
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

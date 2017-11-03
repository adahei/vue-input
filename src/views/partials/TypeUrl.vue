<template lang="html">
  <section>
    <h2>Url</h2>

    <props general />
    <props :customProps="customProps" visible />

    <pre v-highlightjs><code class="html">{{ examples.basic }}</code></pre>

    <v-input
      label="Basic Url"
      id="basicUrl"
      type="url"
      v-model="url.basic"
    />
    <div class="output">{{ url.basic }}</div>

    <form @submit.prevent="submitReq" class="form">
      <div class="attention">
        <p>This required input also trigger the validation function.</p>
      </div>
      <v-input
        label="Required Url"
        id="requiredUrl"
        required
        type="url"
        v-model="url.required"
      />
      <div class="output">{{ url.required }}</div>
      <button type="submit">Submit</button>
    </form>

    <form @submit.prevent="submitVal" class="form">
      <div class="attention">
        <p>If not required the validation only triggers when it has a value to validate.</p>
      </div>
      <v-input
        label="Validate Url"
        id="validateUrl"
        validate
        type="url"
        v-model="url.validate"
      />
      <div class="output">{{ url.validate }}</div>
      <button type="submit">Submit</button>
    </form>

    <form @submit.prevent="submitReqVal" class="form">
      <v-input
        label="Required and Validate Url"
        id="validateUrl"
        validate
        required
        type="url"
        v-model="url.reqAndVal"
      />
      <div class="output">{{ url.reqAndVal }}</div>
      <button type="submit">Submit</button>
    </form>

    <v-input
      label="Readonly Url"
      id="readonlyUrl"
      initValue="http://www.domain.se"
      readonly
      type="url"
      v-model="url.readonly"
    />
    <div class="output">{{ url.readonly }}</div>

    <v-input
      label="Disabled Url"
      id="disabledUrl"
      initValue="http://www.domain.se"
      disabled
      type="url"
      v-model="url.disabled"
    />
    <div class="output">{{ url.disabled }}</div>
  </section>
</template>

<script>
import vInput from '@/components/v-input'
import props from '@/components/props'
export default {
  name: 'UrlInput',
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
                '  label="Basic Url" \n' +
                '  id="basicUrl" \n' +
                '  type="url" \n' +
                '  v-model="url.basic" \n' +
                '/>'
      },
      url: {
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

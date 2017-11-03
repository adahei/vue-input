<template lang="html">
  <section>
    <h2>Range</h2>

    <props general />
    <props :customProps="customProps" visible />

    <pre v-highlightjs><code class="html">{{ examples.basic }}</code></pre>

    <v-input
      label="Basic Range"
      id="basicRange"
      type="range"
      initValue="12"
      :min="10"
      :max="35"
      v-model="range.basic"
    />
    <div class="output">{{ range.basic }}</div>

    <v-input
      label="Disabled Range"
      id="disabledRange"
      initValue="12"
      :min="10"
      :max="35"
      disabled
      type="range"
      v-model="range.disabled"
    />
    <div class="output">{{ range.disabled }}</div>

    <v-input
      label="Range with rangeValue"
      id="rangeValueRange"
      initValue="12"
      :min="10"
      :max="35"
      rangeValue
      type="range"
      v-model="range.rangeValue"
    />
    <div class="output">{{ range.rangeValue }}</div>
  </section>
</template>

<script>
import vInput from '@/components/v-input'
import props from '@/components/props'
export default {
  name: 'RangeInput',
  components: { vInput, props },
  data () {
    return {
      customProps: [
        { name: 'step', footnote: '', type: 'Number', default: '1', required: false },
        { name: 'min', footnote: '', type: 'Number', default: '0', required: false },
        { name: 'max', footnote: '', type: 'Number', default: '100', required: false },
        { name: 'rangeValue', footnote: '', type: 'Boolean', default: false, required: false }
      ],
      examples: {
        basic: '<!-- This is a basic input --> \n' +
               '<v-input \n' +
                '  label="Basic Range" \n' +
                '  id="basicRange" \n' +
                '  type="range" \n' +
                '  initValue="12" \n' +
                '  :min="10" \n' +
                '  :max="35" \n' +
                '  v-model="range.basic" \n' +
                '/>'
      },
      range: {
        basic: {},
        disabled: {},
        rangeValue: {}
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

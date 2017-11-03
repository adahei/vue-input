<template lang="html">
  <div v-if="propsData" class="props">
    <div class="props-header">
      <h3>{{ propsTitle }}</h3>
      <button @click="toggleProps">{{ expandText }}</button>
    </div>
    <table class="table props-table" v-if="expanded">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Required</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in propsData">
          <td>{{ item.name }}<sup class="footnote" v-if="item.footnote">{{ item.footnote }}</sup></td>
          <td
            :class="{
              'str': item.type === 'String',
              'bool': item.type === 'Boolean',
              'num': item.type === 'Number'
              }"
          >{{ item.type }}</td>
          <td>{{ item.default }}</td>
          <td>
            <span class="y" v-if="item.required">Yes</span>
            <span class="n" v-if="!item.required">No</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    general: {
      type: Boolean,
      default: false,
      required: false
    },
    customProps: {
      type: Array,
      required: false
    },
    visible: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      expanded: false,
      data: [
        { name: 'id', footnote: '', type: 'String', default: '', required: true },
        { name: 'name', footnote: '', type: 'String', default: '', required: false },
        { name: 'type', footnote: '', type: 'String', default: 'text', required: false },
        { name: 'autocomplete', footnote: '', type: 'String', default: '', required: false },
        { name: 'autofocus', footnote: '', type: 'Boolean', default: false, required: false },
        { name: 'label', footnote: '', type: 'String', default: '', required: false },
        { name: 'initValue', footnote: '', type: '*', default: '', required: false },
        { name: 'hint', footnote: '', type: 'String', default: '', required: false },
        { name: 'placeholder', footnote: '', type: 'String', default: '', required: false },
        { name: 'tabindex', footnote: '', type: 'Number', default: '', required: false },
        { name: 'required', footnote: '', type: 'Boolean', default: false, required: false },
        { name: 'readonly', footnote: '', type: 'Boolean', default: false, required: false },
        { name: 'disabled', footnote: '', type: 'Boolean', default: false, required: false },
        { name: 'minlength', footnote: '', type: 'Number', default: '', required: false },
        { name: 'maxlength', footnote: '', type: 'Number', default: '', required: false }
      ]
    }
  },
  mounted () {
    if (this.visible) {
      this.expanded = true
    }
  },
  computed: {
    expandText () {
      if (this.expanded) {
        return 'collapse'
      }
      return 'expand'
    },
    propsData () {
      if (this.general) {
        return this.data
      }
      if (this.customProps.length > 0) {
        return this.customProps
      }
      return null
    },
    propsTitle () {
      if (this.general) {
        return 'General props'
      }
      return 'Custom props'
    }
  },
  methods: {
    toggleProps () {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style lang="scss" scoped>
.props {
  background-color: #fafafa;
  padding: 0.2rem .5rem;
  margin-bottom: .5rem;
  border: 1px solid #eee;
}
.props-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    margin: .3rem 0;
  }
}
</style>

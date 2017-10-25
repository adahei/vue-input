<template lang="html">
  <div class="wrap">
    <h1>v-input</h1>
    <section>
      <h2>Basic input</h2>
      <v-input
        label="Label"
        id="text"
        v-model="text"
      />
      <div class="output">{{ text }}</div>
    </section>

    <section>
      <h2>Props</h2>
      <table class="props-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Required</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>id</td>
            <td>String</td>
            <td>-</td>
            <td>true</td>
          </tr>
          <tr>
            <td>type</td>
            <td>String</td>
            <td>text</td>
            <td>false</td>
          </tr>
          <tr>
            <td>label</td>
            <td>String</td>
            <td>-</td>
            <td>false</td>
          </tr>
          <tr>
            <td>hint</td>
            <td>String</td>
            <td>-</td>
            <td>false</td>
          </tr>
          <tr>
            <td>required</td>
            <td>Boolean</td>
            <td>false</td>
            <td>false</td>
          </tr>
          <tr>
            <td>disabled</td>
            <td>Boolean</td>
            <td>false</td>
            <td>false</td>
          </tr>
          <tr>
            <td>validate</td>
            <td>Boolean</td>
            <td>false</td>
            <td>false</td>
          </tr>
          <tr>
            <td>validationInvalidMsg</td>
            <td>String</td>
            <td>-</td>
            <td>false</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
import vInput from '@/components/v-input'
export default {
  data () {
    return {
      text: ''
    }
  },
  components: {
    vInput
  }
}
</script>

<style lang="scss">
@import '../styles/variables';
.wrap {
  max-width: 600px;
  margin: 0 auto;
  background-color: $white;
  padding: 1.4rem;
}
.output {
  &:before {
    content: 'Output: '
  }
  color: $gray-dark-4;
  font-family: monospace;
}

.props-table {
  width: 100%;
  th, td {
    padding: $gutter-sm;
  }
  thead {
    tr {
      background-color: $gray-light-2;
    }
    th {
      text-align: left;

    }
  }
  tbody {
    tr:nth-child(even) {
      background-color: $blue-light-7;
    }
    td {
      font-family: monospace;
      color: $blue-light-2;
    }
  }
}
</style>

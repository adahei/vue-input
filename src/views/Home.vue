<template lang="html">
  <div class="wrap">
    <h1>V-INPUT</h1>
    <section>
      <h2>Basic input</h2>
      <pre v-highlightjs><code class="html">{{ examples.basic }}</code></pre>

      <!-- Basic text input -->
      <v-input
        label="Basic Text"
        id="simpleText"
        v-model="simple.text"
      />
      <div class="output">{{ simple.text }}</div>

      <!-- Basic number input -->
      <v-input
        label="Basic Number"
        id="simpleNumber"
        :step="10"
        :min="0"
        :max="100"
        type="number"
        v-model="simple.number"
      />
      <div class="output">{{ simple.number }}</div>

      <!-- Basic e-mail input -->
      <v-input
        label="Basic E-mail"
        id="simpleEmail"
        type="email"
        v-model="simple.email"
      />
      <div class="output">{{ simple.email }}</div>

      <!-- Basic password input -->
      <v-input
        label="Basic Password"
        id="simplePassword"
        type="password"
        v-model="simple.password"
      />
      <div class="output">{{ simple.password }}</div>

      <!-- Basic search input -->
      <v-input
        label="Basic Search"
        id="simpleSearch"
        type="search"
        v-model="simple.search"
      />
      <div class="output">{{ simple.search }}</div>

      <!-- Basic tel input -->
      <v-input
        label="Basic Telephone"
        id="simpleTel"
        type="tel"
        v-model="simple.tel"
      />
      <div class="output">{{ simple.tel }}</div>
    </section>

    <section>
      <h2>Date / Time</h2>
      <div class="attention">
        <p>The date and time inputs have a pretty good browser support, but as always Internet Explorer lacks it.</p>
      </div>
      <!-- date input -->
      <v-input
        label="Date"
        id="simpleDate"
        type="date"
        v-model="date.date"
      />
      <div class="output">{{ date.date }}</div>

      <!-- date input -->
      <v-input
        label="Time"
        id="simpleTime"
        type="time"
        v-model="date.time"
      />
      <div class="output">{{ date.time }}</div>

      <!-- datetime-local input -->
      <div class="attention">
        <p>In order to get a value in the Datetime-local input, hours and minutes needs to have a value.</p>
      </div>
      <v-input
        label="Datetime-local"
        id="simpleDatetimeLocal"
        type="datetime-local"
        v-model="date.datetimeLocal"
      />
      <div class="output">{{ date.datetimeLocal }}</div>

      <!-- month input -->
      <v-input
        label="Month"
        id="simpleMonth"
        type="month"
        v-model="date.month"
      />
      <div class="output">{{ date.month }}</div>

      <!-- month input -->
      <v-input
        label="Week"
        id="simpleWeek"
        type="week"
        v-model="date.week"
      />
      <div class="output">{{ date.week }}</div>
    </section>

    <section>
      <h2>Required / Validation</h2>
      <pre v-highlightjs><code class="html">{{ examples.validation }}</code></pre>
      <form @submit.prevent="validationSubmit">
        <div class="attention">
          <p>If a pattern is added as a attribute, any custom validation is overwritten.</p>
        </div>
        <!-- Validate e-mail input -->
        <p>This field is <strong>not</strong> required but if it has a value it will validate it.</p>
        <v-input
          label="Validate E-mail"
          id="validateEmail"
          type="email"
          hint="name@example.com"
          validate
          validationMsg="Not a valid e-mail"
          v-model="validate.email"
        />
        <div class="output">{{ validate.email }}</div>

        <hr>

        <!-- Required number input -->
        <p>This number input field is required but does not have any other validation connected to it.</p>
        <v-input
          label="Number required"
          id="validateNumber"
          type="number"
          required
          v-model="required.number"
        />
        <div class="output">{{ required.number }}</div>

        <button type="submit">Submit</button>
      </form>
    </section>

    <section>
      <h2>File</h2>
      <pre v-highlightjs><code class="html">{{ examples.file }}</code></pre>
      <v-input
        label="File input"
        id="fileInput"
        type="file"
        :multiple="true"
        accept="image/*"
        v-model="file"
      />
      <div class="output">{{ file }}</div>
    </section>

    <section>
      <h2>Supported types</h2>
      <ul>
        <li>Text</li>
        <li>Number</li>
        <li>E-mail</li>
        <li>Password</li>
        <li>Search</li>
        <li>Tel</li>
        <li>Date</li>
        <li>Time</li>
        <li>Month</li>
        <li>Week</li>
        <li>Datetime-local</li>
        <li>File</li>
      </ul>

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
          <tr v-for="item in sortedProps">
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
        <tfoot>
          <tr><td colspan="4"><sup>[1]</sup> Only for file input </td></tr>
          <tr><td colspan="4"><sup>[2]</sup> Only for number input </td></tr>
          <tr><td colspan="4"><sup>[3]</sup> If pattern is added as an attribute, any custom validation will be overwritten </td></tr>
        </tfoot>
      </table>
    </section>
  </div>
</template>

<script>
import vInput from '@/components/v-input'
export default {
  data () {
    return {
      props: [
        { name: 'id', footnote: '', type: 'String', default: '', required: true },
        { name: 'name', footnote: '', type: 'String', default: '', required: false },
        { name: 'type', footnote: '', type: 'String', default: 'text', required: false },
        { name: 'autocomplete', footnote: '', type: 'String', default: '', required: false },
        { name: 'autofocus', footnote: '', type: 'Boolean', default: false, required: false },
        { name: 'label', footnote: '', type: 'String', default: '', required: false },
        { name: 'hint', footnote: '', type: 'String', default: '', required: false },
        { name: 'pattern', footnote: '[3]', type: 'String', default: '', required: false },
        { name: 'placeholder', footnote: '', type: 'String', default: '', required: false },
        { name: 'tabindex', footnote: '', type: 'Number', default: '', required: false },
        { name: 'required', footnote: '', type: 'Boolean', default: false, required: false },
        { name: 'readonly', footnote: '', type: 'Boolean', default: false, required: false },
        { name: 'disabled', footnote: '', type: 'Boolean', default: false, required: false },
        { name: 'validate', footnote: '', type: 'Boolean', default: false, required: false },
        { name: 'validationMsg', footnote: '', type: 'String', default: '', required: false },
        { name: 'minlength', footnote: '', type: 'Number', default: '', required: false },
        { name: 'maxlength', footnote: '', type: 'Number', default: '', required: false },
        { name: 'multiple', footnote: '[1]', type: 'Boolean', default: false, required: false },
        { name: 'accept', footnote: '[1]', type: 'String', default: '', required: false },
        { name: 'step', footnote: '[2]', type: 'Number', default: '', required: false },
        { name: 'min', footnote: '[2]', type: 'Number', default: '', required: false },
        { name: 'max', footnote: '[2]', type: 'Number', default: '', required: false }
      ],
      examples: {
        basic: '<v-input \n' +
                '  label="Basic input" \n' +
                '  id="simpleText" \n' +
                '  type="text" \n' +
                '  v-model="simpleText" \n' +
                '/>',
        validation: '<v-input \n' +
                    '  label="Validation input" \n' +
                    '  id="validationEmail" \n' +
                    '  type="email" \n' +
                    '  hint="name@example.com" \n' +
                    '  validate \n' +
                    '  validationMsg="Not a valid e-mail" \n' +
                    '  v-model="validationEmail" \n' +
                    '/>',
        file: '<v-input \n' +
              '  label="File input" \n' +
              '  id="fileInput" \n' +
              '  type="file" \n' +
              '  multiple="true" \n' +
              '  accept="images/*" \n' +
              '  v-model="formInput" \n' +
              '/>'
      },
      simple: {
        text: {},
        number: {},
        email: {},
        password: {},
        search: {},
        tel: {}
      },
      date: {
        datetimeLocal: {},
        date: {},
        time: {},
        month: {},
        week: {}
      },
      validate: {
        email: {}
      },
      required: {
        number: {}
      },
      file: {}
    }
  },
  components: {
    vInput
  },
  computed: {
    sortedProps () {
      function compare (a, b) {
        if (a.name < b.name) { return -1 }
        if (a.name > b.name) { return 1 }
        return 0
      }
      return this.props.sort(compare)
    }
  },
  methods: {
    validationSubmit () {
      alert('Form is valid!')
    }
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

  section {
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid $gray-light-2;
  }
}
.attention {
  background-color: $pale;
  color: $pale-dark-4;
  padding: $gutter;
  margin: $gutter-sm 0;
  > p {
    margin: 0;
  }
}
.output {
  font-size: .8rem;
  &:before {
    content: 'Output: '
  }
  color: $gray-dark-4;
  font-family: monospace;
  margin-bottom: 1rem;
}

.props-table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  th, td {
    padding: $gutter-sm;
    border: 1px solid $gray-light-2;
  }
  thead {
    tr {
      background-color: $blue-light-2;
      color: $white;
    }
    th {
      text-align: left;

    }
  }
  tbody {
    tr {
      background-color: $white;
      &:nth-child(even) {
        background-color: $gray-light-4;
      }
    }
    td {
      font-family: monospace;
      color: $black;
      &.str { color: $green }
      &.bool { color: $orange }
      &.num { color: $blue-light-2 }
      .y { color: $green }
      .n { color: $red }
      .footnote { color: $gray-dark-4 }
    }
  }
  tfoot {
    td {
      font-size: .8rem;
      border: 0;
      padding: 0;
    }
  }
}
</style>

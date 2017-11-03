<template lang="html">
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
      :step="2"
      type="week"
      v-model="date.week"
    />
    <div class="output">{{ date.week }}</div>
    <div class="attention attention--tip">
      <p>You can use <code>step</code>, <code>min</code> and <code>max</code> on these inputs!</p>
    </div>
  </section>
</template>

<script>
import vInput from '@/components/v-input'
export default {
  name: 'Date',
  components: {
    vInput
  },
  data () {
    return {
      date: {
        datetimeLocal: {},
        date: {},
        time: {},
        month: {},
        week: {}
      }
    }
  }
}
</script>

<style lang="css">
</style>

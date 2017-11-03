<template lang="html">
  <section>
    <h2>File</h2>

    <props general />

    <pre v-highlightjs><code class="html">{{ examples.basic }}</code></pre>

    <v-input
      label="Basic File"
      id="basicFile"
      type="file"
      v-model="file.basic"
    />
    <div class="output">{{ file.basic }}</div>

    <v-input
      label="Disabled File"
      id="disabledFile"
      type="file"
      disabled
      v-model="file.disabled"
    />
    <div class="output">{{ file.disabled }}</div>

    <div class="attention">
      <p>The value will return an <code>FileList</code> that contains <code>File</code> objects.</p>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Attributes</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>multiple</td>
          <td class="text">Add this attribute to enable select more than one image.</td>
        </tr>
        <tr>
          <td>accept</td>
          <td class="text">
            Specify allowed filetypes
            <ul>
              <li><code>accept="image/png"</code> or <code>accept=".png"</code> - Accepts PNG files.</li>
              <li><code>accept="image/png, image/jpeg"</code> or <code>accept=".png, .jpg, .jpeg"</code> - Accept PNG or JPEG files.</li>
              <li><code>accept="image/*"</code> - Accept any file with an image MIME type (Also enables camera on mobile devices).</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import vInput from '@/components/v-input'
import props from '@/components/props'
export default {
  name: 'FileInput',
  components: { vInput, props },
  data () {
    return {
      componentProps: [],
      examples: {
        basic: '<!-- This is a basic input --> \n' +
               '<v-input \n' +
                '  label="Basic File" \n' +
                '  id="basicFile" \n' +
                '  type="file" \n' +
                '  v-model="file.basic" \n' +
                '/>'
      },
      file: {
        basic: {},
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

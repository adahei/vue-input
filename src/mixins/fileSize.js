export default {
  methods: {
    fileSize: function (size) {
      // Expects the size to be Bytes
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      let i = Math.floor(Math.log(size) / Math.log(k))

      return parseFloat((size / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
    }
  }
}

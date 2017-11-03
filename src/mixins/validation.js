const emailPattern = /^[a-zA-Z0-9åäöÅÄÖ_.-]+@[a-zA-Z0-9åäöÅÄÖ_.-]+?\.[a-zA-Z0-9åäöÅÄÖ]{2,5}$/
const phonePattern = /^(?:(?:\+|0{0,2})\d{0,2}(\s*[-]\s*)?|[0]?)?\d{9,12}$/
const urlPattern = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/

export const isValidEmail = {
  methods: {
    isValidEmail: function (str) {
      const emailMinLength = 6
      const emailMaxLength = 64
      return (emailPattern.test(str) && str.length > emailMinLength && str.length < emailMaxLength)
    },
    patternEmail: function () {
      return emailPattern
    }
  }
}

export const isValidPhone = {
  methods: {
    isValidPhone: function (str) {
      const phoneMinLength = 7
      const phoneMaxLength = 18
      return (phonePattern.test(str) && str.length > phoneMinLength && str.length < phoneMaxLength)
    },
    patternPhone: function () {
      return phonePattern
    }
  }
}

export const isValidUrl = {
  methods: {
    isValidUrl: function (str) {
      return (urlPattern.test(str))
    },
    patternUrl: function () {
      return urlPattern
    }
  }
}

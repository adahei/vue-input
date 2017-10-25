const emailPattern = /^[a-zA-Z0-9åäöÅÄÖ_.-]+@[a-zA-Z0-9åäöÅÄÖ_.-]+?\.[a-zA-Z0-9åäöÅÄÖ]{2,5}$/
const phonePattern = /^\+?(\d| |-)*$/

export const isValidEmail = {
  methods: {
    isValidEmail: function (str) {
      const emailMinLength = 6
      const emailMaxLength = 64
      return (emailPattern.test(str) && str.length > emailMinLength && str.length < emailMaxLength)
    }
  }
}

export const patternEmail = {
  methods: {
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
    }
  }
}

export const patternPhone = {
  methods: {
    patternPhone: function () {
      return phonePattern
    }
  }
}

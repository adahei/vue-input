<template lang="html">
  <div class="input" :class="{'prestine': isPrestine, 'invalid': isInvalid, 'valid': isValid, 'required': required}">
    <label class="input__label" v-if="label" :for="id">{{ label }}</label>
    <small class="input__hint" v-if="hint">{{ hint }}</small>
    <input
      class="input__element"
      :class="{'animation-fail': isInvalid, 'animation-success': isValid}"
      ref="input"
      :required="required"
      :disabled="disabled"
      :id="id"
      :type="type"
      :pattern="addPattern"
      @input="handleUpdate($event.target.value)"
      @focus="handleFocus"
      @blur="handleBlur($event.target.value)"
    />
    <div v-if="validate || showRequiredMsg">
      <span class="input__validation" v-if="validate">{{ msg }}</span>
      <span class="input__require" v-if="showRequiredMsg">{{ requireMsg }}</span>
    </div>
  </div>
</template>

<script>
import {
  isValidEmail,
  patternEmail,
  isValidPhone,
  patternPhone
} from '@/mixins/validation'

export default {
  mixins: [
    isValidEmail,
    patternEmail,
    isValidPhone,
    patternPhone
  ],
  props: {
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text',
      required: false
    },
    label: {
      type: String,
      required: false
    },
    hint: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    validate: {
      type: Boolean,
      default: false,
      required: false
    },
    validationInvalidMsg: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      value: '',
      requireMsg: 'This field is required',
      state: {
        pristine: true,
        valid: null
      },
      msg: ''
    }
  },
  computed: {
    showRequiredMsg: function () {
      if (
        this.required &&
        !this.state.pristine &&
        !this.state.valid
      ) {
        return true
      }
      return false
    },
    isPrestine: function () {
      return this.state.pristine
    },
    isInvalid: function () {
      return this.state.valid === false
    },
    isValid: function () {
      return this.state.valid === true
    },
    addPattern: function () {
      if (this.validate) {
        switch (this.type) {
          case 'email':
            return this.patternEmail().source
          case 'tel':
            return this.patternPhone().source
          default:
            return null
        }
      }
    }
  },
  methods: {
    handleFocus: function () {
      this.state.pristine = true
    },
    handleUpdate: function (val) {
      this.$emit('input', val)
    },
    handleBlur: function (val) {
      this.state.pristine = false
      if (this.required || this.validate) {
        this.handleValidation(val)
      }
    },
    handleValidation: function (val) {
      let validationMsg = ''

      if (this.required) {
        if (val.length > 0) {
          this.state.valid = true
        } else {
          this.state.valid = false
        }
      }

      if (this.validate) {
        if (this.type === 'email') {
          this.state.valid = this.isValidEmail(val)
          if (!this.state.valid) {
            validationMsg = 'E-mail is not valid!'
          }
        } else if (this.type === 'tel') {
          this.state.valid = this.isValidPhone(val)
          if (!this.state.valid) {
            validationMsg = 'Phonenumber is not valid!'
          }
        }

        this.msg = !this.state.valid ? (this.validationInvalidMsg || validationMsg) : ''
      }
      this.$emit('valid', this.state.valid)
    }
  }
}
</script>
<style lang="scss">
@import '../styles/variables';

.input {
  margin-bottom: $gutter;
  &.invalid {
    .input__element {
      border-color: $red;
      color: $red;
    }
  }
  &.valid {
    .input__element {
      border-color: $green;
      color: $green;
    }
  }
  &.required {
    .input__label {
      &::after {
        content: ' *';
        color: $red;
      }
    }
  }
  &.prestine {
    .input__element {
      border-color: $gray;
      color: $gray-dark-6;
    }
  }
  &__label {
    display: block;
    font-weight: bold;
    cursor: pointer;
  }
  &__hint {
    color: $gray-dark-4;
  }
  &__validation, &__require {
    color: $red;
    font-size: .9rem;
  }
  &__element {
    display: block;
    width: 100%;
    border: 1px solid $gray;
    padding: $gutter-sm;
    font-size: $gutter;
    color: $gray-dark-6;
    line-height: 1;
    transition: border 400ms 200ms ease-in-out;
    &:active, &:focus {
      outline: none;
      box-shadow: 0 0 2px $blue-gray;
    }
  }
}
</style>

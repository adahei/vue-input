<template lang="html">
  <div class="input" :class="{'prestine': isPrestine, 'invalid': isInvalid, 'valid': isValid, 'required': required, 'isFile': isFileInput}">
    <label class="input__label" v-if="label" :for="id">{{ label }}</label>
    <small class="input__hint" v-if="hint">{{ hint }}</small>
    <input
      class="input__element"
      :class="{'animation-fail': isInvalid, 'animation-success': isValid}"
      ref="input"
      :required="required"
      :disabled="disabled"
      :readonly="readonly"
      :id="id"
      :name="name"
      :type="type"
      :autocomplete="autocomplete"
      :tabindex="tabindex"
      :autofocus="autofocus"
      :pattern="addPattern"
      :placeholder="placeholder"
      :multiple="isMultiple"
      :accept="acceptableFiles"
      :step="hasStep"
      :min="hasMin"
      :max="hasMax"
      :minlength="minlength"
      :maxlength="maxlength"
      @input="handleUpdate($event.target.value)"
      @focus="handleFocus"
      @blur="handleBlur($event.target.value)"
      @change="handleChange"
    />
    <div v-if="isFileInput">
      <label class="input__file-btn" :for="id">
        <span class="input__file__select">Add files</span>
      </label>
      <div v-for="file in state.value" class="input__file__item">
        <span class="input__file__item__name">{{ file.name }}</span>
        <span class="input__file__item__size">{{ fileSize(file.size) }}</span>
      </div>
      <div class="input__file__clear" v-if="!noValue" >
        <button type="button" @click="clearValue">Clear</button>
      </div>
    </div>
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
import fileSize from '@/mixins/fileSize'

export default {
  mixins: [
    isValidEmail,
    patternEmail,
    isValidPhone,
    patternPhone,
    fileSize
  ],
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    type: {
      type: String,
      default: 'text',
      required: false
    },
    tabindex: {
      type: Number,
      required: false
    },
    autocomplete: {
      type: String,
      default: null,
      required: false
    },
    autofocus: {
      type: Boolean,
      default: false,
      required: false
    },
    label: {
      type: String,
      required: false
    },
    pattern: {
      type: String,
      required: false
    },
    placeholder: {
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
    readonly: {
      type: Boolean,
      default: false,
      required: false
    },
    validate: {
      type: Boolean,
      default: false,
      required: false
    },
    validationMsg: {
      type: String,
      required: false
    },
    multiple: {
      type: Boolean,
      default: null,
      required: false
    },
    accept: {
      type: String,
      default: null,
      required: false
    },
    step: {
      type: Number,
      default: 1,
      required: false
    },
    min: {
      type: Number,
      default: null,
      required: false
    },
    max: {
      type: Number,
      default: null,
      required: false
    },
    minlength: {
      type: Number,
      default: null,
      required: false
    },
    maxlength: {
      type: Number,
      default: null,
      required: false
    }
  },
  data () {
    return {
      msg: '',
      requireMsg: 'This field is required',
      state: {
        pristine: true,
        valid: null,
        value: ''
      }
    }
  },
  mounted () {
    this.$emit('input', this.state)
  },
  computed: {
    noValue: function () {
      let value = this.state.value
      if (value === null) return true
      if (value.length > 0) return false
      if (value.length === 0) return true
      if (typeof value !== 'object') return true

      for (var key in value) {
        if (hasOwnProperty.call(value, key)) return false
      }
      return true
    },
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
    isFileInput: function () {
      if (this.type === 'file') {
        return true
      }
      return false
    },
    isMultiple: function () {
      if (this.type === 'file') {
        if (this.multiple) {
          return true
        }
        return false
      }
      return null
    },
    hasStep: function () {
      if (this.type === 'number' && this.step) {
        return this.step
      }
      return null
    },
    hasMin: function () {
      if (this.type === 'number' && this.min !== null) {
        return this.min
      }
      return null
    },
    hasMax: function () {
      if (this.type === 'number' && this.max !== null) {
        return this.max
      }
      return null
    },
    acceptableFiles: function () {
      if (this.type === 'file' && this.accept) {
        return this.accept
      }
      return null
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
      if (this.pattern) {
        return this.pattern
      } else {
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
    }
  },
  methods: {
    handleChange: function (e) {
      if (this.type === 'file') {
        this.handleUpdate(e.target.files)
      }
    },
    handleFocus: function () {
      this.state.pristine = true
    },
    handleUpdate: function (val) {
      this.state.value = val
      this.$emit('input', this.state)
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

        this.msg = !this.state.valid ? (this.validationMsg || validationMsg) : ''
      }
      this.$emit('valid', this.state)
    },
    clearValue: function () {
      this.state.value = ''
    }
  }
}
</script>
<style lang="scss">
@import '../styles/variables';

$input-border-color: $gray;
$input-border-radius: 2px;
$input-text: $gray-dark-6;
$input-shy-text: $gray-dark-4;
$input-success: $green;
$input-error: $red;
$input-focus-color: $blue-gray;

.input {
  margin-bottom: $gutter;
  &.invalid {
    .input__element {
      border-color: $input-error;
      color: $input-error;
    }
  }
  &.valid {
    .input__element {
      border-color: $input-success;
      color: $input-success;
    }
  }
  &.required {
    .input__label {
      &::after {
        content: ' *';
        color: $input-error;
      }
    }
  }
  &.prestine {
    .input__element {
      border-color: $input-border-color;
      color: $input-text;
    }
  }
  &__label {
    display: block;
    font-weight: bold;
    cursor: pointer;
  }
  &__hint {
    color: $input-shy-text;
  }
  &__validation, &__require {
    color: $input-error;
    font-size: .9rem;
  }
  &__element {
    display: block;
    width: 100%;
    border: 1px solid $input-border-color;
    border-radius: $input-border-radius;
    padding: $gutter-sm;
    font-size: $gutter;
    color: $input-text;
    line-height: 1;
    transition: border 400ms 200ms ease-in-out;
    &:active, &:focus {
      outline: none;
      box-shadow: 0 0 2px $input-focus-color;
    }
  }

  &.isFile {
    .input__element[type='file'] {
      display: none;
    }
    .input__file-btn {
      cursor: pointer;
    }
    .input__file__select {
      display: block;
      text-align: center;
      font-size: .9rem;
      color: $input-shy-text;
      background-color: $gray-light-4;
      padding: $gutter-xs;
      margin-bottom: $gutter-xs;
      transition: all .2s ease-in-out;
      &:active {
        transform: scale(.96);
        background-color: $gray-light-2;
      }
    }
    .input__file__item {
      border: 1px solid $input-border-color;
      padding: $gutter-xs;
      font-size: 1rem;
      margin-bottom: $gutter-xs;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &__size {
        color: $input-shy-text;
        font-size: .9rem;
      }
    }
    .input__file__clear {
      text-align: right;
    }
  }
}
</style>

<template lang="html">
  <div class="input" :class="{'prestine': isPrestine, 'invalid': isInvalid, 'valid': isValid, 'required': required, 'disabled': disabled, 'isFile': isFileInput}">
    <label class="input__label" v-if="label" :for="id">{{ label }}</label>
    <small class="input__hint" v-if="hint">{{ hint }}</small>
    <div class="input__wrap" :class="{'input__adjustment': hasAdjustmentButtons}" v-if="!isTextarea">
      <button type="button" class="input__adjustment__btn input__adjustment__btn--decr" v-if="hasAdjustmentButtons" @click="adjustDecr">-</button>
      <input
        class="input__element"
        :class="{'animation-fail': isInvalid, 'animation-success': isValid, 'input__element--range': type === 'range'}"
        ref="input"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :id="id"
        :value="setValue"
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
      <input
        v-if="type === 'range' && rangeValue"
        class="input__element input__element--range-result"
        type="number"
        :disabled="disabled"
        :readonly="readonly"
        :step="hasStep"
        :min="hasMin"
        :max="hasMax"
        v-model="state.value"
      >
      <button type="button" class="input__adjustment__btn  input__adjustment__btn--incr" v-if="hasAdjustmentButtons" @click="adjustIncr">+</button>
    </div>
    <div v-if="isTextarea">
      <textarea
        class="input__element input__element--textarea"
        :class="{'animation-fail': isInvalid, 'animation-success': isValid}"
        ref="input"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :cols="cols"
        :rows="rows"
        :tabindex="tabindex"
        :autofocus="autofocus"
        :minlength="minlength"
        :maxlength="maxlength"
        @input="handleUpdate($event.target.value)"
        @focus="handleFocus"
        @blur="handleBlur($event.target.value)"
        @change="handleChange"
      >{{ setValue }}</textarea>
    </div>
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
    <div v-if="validate || showRequiredMsg || msg">
      <span class="input__validation" v-if="validate || msg">{{ msg }}</span>
      <span class="input__require" v-if="showRequiredMsg">{{ requireMsg }}</span>
    </div>
  </div>
</template>

<script>
import {
  isValidEmail,
  isValidPhone,
  isValidUrl
} from '@/mixins/validation'
import fileSize from '@/mixins/fileSize'

export default {
  name: 'input',
  mixins: [
    isValidEmail,
    isValidPhone,
    isValidUrl,
    fileSize
  ],
  props: {
    id: {
      type: String,
      required: true
    },
    initValue: {
      required: false
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
      default: 0,
      required: false
    },
    max: {
      type: Number,
      default: 100,
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
    },
    adjustmentButtons: {
      type: Boolean,
      required: false
    },
    cols: {
      type: Number,
      default: 100,
      required: false
    },
    rows: {
      type: Number,
      default: 5,
      required: false
    },
    rangeValue: {
      type: Boolean,
      default: false,
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
        value: null
      }
    }
  },
  mounted () {
    this.initialValue()
    this.$emit('input', this.state)
  },
  computed: {
    setValue: function () {
      return this.state.value
    },
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
      if (this.required && !this.state.pristine && !this.state.valid) {
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
    isTextarea: function () {
      if (this.type === 'textarea') {
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
      if (
        (
          this.type === 'number' ||
          this.type === 'range' ||
          this.type === 'date' ||
          this.type === 'time' ||
          this.type === 'week' ||
          this.type === 'month'
        ) && this.step) {
        return this.step
      }
      return null
    },
    hasMin: function () {
      if (
        (
          this.type === 'number' ||
          this.type === 'range' ||
          this.type === 'date' ||
          this.type === 'time' ||
          this.type === 'week' ||
          this.type === 'month'
      ) && this.min !== null) {
        return this.min
      }
      return null
    },
    hasMax: function () {
      if (
        (
          this.type === 'number' ||
          this.type === 'range' ||
          this.type === 'date' ||
          this.type === 'time' ||
          this.type === 'week' ||
          this.type === 'month'
      ) && this.max !== null) {
        return this.max
      }
      return null
    },
    hasAdjustmentButtons: function () {
      if (this.type === 'number' && this.adjustmentButtons) {
        return true
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
        if (this.validate || this.required) {
          switch (this.type) {
            case 'email':
              return this.patternEmail().source
            case 'tel':
              return this.patternPhone().source
            case 'url':
              return this.patternUrl().source
            default:
              return null
          }
        }
      }
    }
  },
  methods: {
    initialValue: function () {
      if (this.initValue) {
        this.state.value = this.initValue
      }
    },
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
      if (this.type === 'tel') {
        let cleanedString = val.replace(/\s+/g, '')
        this.state.value = cleanedString
        val = cleanedString
      }
      if (this.required || this.validate) {
        this.handleValidation(val)
      }
    },
    handleValidation: function (val) {
      let validationMsg = ''

      if (this.validate || this.required) {
        this.state.valid = null

        switch (this.type) {
          case 'email':
            validationMsg = this.validateEmail(val)
            break
          case 'tel':
            validationMsg = this.validateTel(val)
            break
          case 'number':
            validationMsg = this.validateNumber(val)
            break
          case 'url':
            validationMsg = this.validateUrl(val)
            break
          default:
            if (this.required) {
              if (val.length === 0 || val === null) {
                this.state.valid = false
              } else {
                this.state.valid = true
              }
            }
            validationMsg = ''
        }

        // if (validationMsg) {
        //   this.state.valid = false
        // }
        this.msg = this.state.valid === false ? (this.validationMsg || validationMsg) : ''
      }
      this.$emit('valid', this.state)
    },
    validateEmail: function (val) {
      if (val.length > 0 || this.required) {
        this.state.valid = this.isValidEmail(val)
        if (!this.state.valid) {
          return 'E-mail is not valid'
        }
      }
    },
    validateTel: function (val) {
      if (val.length > 0 || this.required) {
        this.state.valid = this.isValidPhone(val)
        if (!this.state.valid) {
          return 'Phonenumber is not valid'
        }
      }
    },
    validateNumber: function (val) {
      let validMin = this.min
      let validMax = this.max
      if (val.length > 0 || this.required) {
        if (isNaN(val) || val === '' || val === null) {
          this.state.valid = false
          return 'This is not a number'
        } else {
          if (validMin && Number(val) < validMin) {
            this.state.valid = false
            return `Value must be greater or equal to ${validMin}`
          } else if (validMax && Number(val) > validMax) {
            this.state.valid = false
            return `Value must be less or equal to ${validMax}`
          } else {
            this.state.valid = true
          }
        }
      }
    },
    validateUrl: function (val) {
      if (val.length > 0 || this.required) {
        this.state.valid = this.isValidUrl(val)
        if (!this.state.valid) {
          return 'Not a valid URL'
        }
      }
    },
    clearValue: function () {
      this.state.value = ''
    },
    adjustDecr: function () {
      let step = this.step || 1
      let min = this.min || null
      let value = Number(this.state.value) || 0
      if (!min || value - step >= min) {
        this.state.value = value - step
      }
    },
    adjustIncr: function () {
      let step = this.step || 1
      let max = this.max || null
      let value = Number(this.state.value) || 0
      if (!max || value + step <= max) {
        this.state.value = value + step
      }
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
      &[disabled] {
        background-color: $gray-light-4;
        color: $input-shy-text;
      }
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
    display: block;
    color: $input-error;
    font-size: .9rem;
  }
  &__wrap {
    display: flex;
    &.input__adjustment {
      .input__element {
        flex: 1;
        border-radius: 0;
        border-left: 0;
        border-right: 0;
      }
    }
    .input__adjustment__btn {
      cursor: pointer;
      padding: $gutter-sm $gutter;
      height: auto;
      border: 1px solid $input-border-color;
      background-color: $gray-light-4;
      &:hover, &:focus {
        outline: none;
        background-color: $gray-light-1;
      }
      &:active {
        background-color: $gray-light-2;
      }
      &--decr {
        border-top-left-radius: $input-border-radius;
        border-bottom-left-radius: $input-border-radius;
      }
      &--incr {
        border-top-right-radius: $input-border-radius;
        border-bottom-right-radius: $input-border-radius;
      }
    }
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
    &[disabled] {
      cursor: not-allowed;
    }

    &--textarea {
      min-height: 50px;
      max-height: 500px;
      min-width: 50%;
      width: auto;
      max-width: 100%;
    }

    &--range {
      border: 0;
      margin-top: $gutter-sm;
      padding-left: 0;
      padding-right: 0;
      &:focus {
        box-shadow: none;
      }
      // WEBKIT
      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: 1px solid $input-border-color;
        height: $gutter;
        width: $gutter;
        border-radius: 50%;
        background: $gray-light-2;
        cursor: pointer;
        margin-top: -($gutter / 2);
        &:active {
          background: $gray-light-1;
        }
      }
      &::-webkit-slider-runnable-track {
        width: 100%;
        height: 1px;
        cursor: pointer;
        background: $gray;
        transition: all .2s ease-in-out;
      }
      &:active::-webkit-slider-runnable-track {
        background: $blue-gray;
      }

      // MOZ
      &::-moz-range-thumb {
        border: 1px solid $input-border-color;
        height: $gutter;
        width: $gutter;
        border-radius: 50%;
        background: $gray-light-2;
        cursor: pointer;
        &:active {
          background: $gray-light-1;
        }
      }
      &::-moz-range-track {
        width: 100%;
        height: 1px;
        cursor: pointer;
        background: $gray;
        transition: background .2s ease-in-out;
      }
      &:active::-moz-range-track {
        background: $blue-gray;
      }

      // IE / EDGE
      &::-ms-thumb {
        border: 1px solid $input-border-color;
        height: $gutter-lg;
        width: $gutter-lg;
        border-radius: $input-border-radius;
        background: $gray-light-2;
        cursor: pointer;
        &:active {
          background: $gray-light-1;
        }
      }
      &::-ms-track {
        width: 100%;
        height: $gutter-xl;
        cursor: pointer;
        background: transparent;
        color: transparent;
      }
      &::-ms-fill-lower {
        background-color: $gray;
      }
      &::-ms-fill-upper {
        background-color: $gray;
      }
      &:active::-ms-fill-lower {
        background: $blue-gray;
      }
      &:active::-ms-fill-upper {
        background: $blue-gray;
      }
    }
    &--range-result {
      max-width: 80px;
      margin-left: $gutter-sm;
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

    &.disabled {
      .input__file__select {
        cursor: not-allowed;
        opacity: .5;
        &:active {
          transform: scale(1);
          background-color: $gray-light-4;
        }
      }
    }
  }
}
</style>

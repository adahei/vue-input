# Vue Input Component
[![vue-js](https://img.shields.io/badge/vue.js-2.x-brightgreen.svg?maxAge=604800)](https://vuejs.org/)

Vuejs v2.x Input component

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Supported types
- Text
- Number
- E-mail
- Password
- Search
- Tel
- Date
- Time
- Month
- Week
- Datetime-local
- File

## Usage
### Minimal example

```html
<v-input
  label="Text"
  id="textInput"
  v-model="myText"
/>
```

## Props
|Name|Type|Default|Required|
|--- |--- |--- |--- |
|accept[1]|String||No|
|autocomplete|String||No|
|autofocus|Boolean|false|No|
|disabled|Boolean|false|No|
|hint|String||No|
|id|String||Yes|
|label|String||No|
|max[2]|Number||No|
|maxlength|Number||No|
|min[2]|Number||No|
|minlength|Number||No|
|multiple[1]|Boolean|false|No|
|name|String||No|
|pattern[3]|String||No|
|placeholder|String||No|
|readonly|Boolean|false|No|
|required|Boolean|false|No|
|step[2]|Number||No|
|tabindex|Number||No|
|type|String|text|No|
|validate|Boolean|false|No|
|validationMsg|String||No|

- [1] Only for file input
- [2] Only for number input
- [3] If pattern is added as an attribute, any custom validation will be overwritten

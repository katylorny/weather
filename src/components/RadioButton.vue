<template>
  <label :class="['radio-button',  isChecked ? 'checked' : '']">
    <input
        type="radio"
        :name="name"
        :value="value"
        :checked="isChecked"
        @change="$emit(`vmodelevent`, $event.target.value)"
    >
    <span class="radio-button__label">
      <slot/>
    </span>
  </label>
</template>

<script>
export default {
  name: "RadioButton",
  model: {
    prop: 'vmodelprop',
    event: 'vmodelevent'
  },
  props: {
    name: String,
    value: String,
    vmodelprop: String
  },
  computed: {
    isChecked() {
      return this.vmodelprop === this.value
    }
  },
}
</script>

<style lang="scss" scoped>

.radio-button {
  display: block;
  cursor: pointer;
  margin-bottom: 10px;
  opacity: 0.6;
  transition: opacity 0.4s ease;
  width: fit-content;

  &:hover {
    opacity: 1;
  }

  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
}

.radio-button.checked {
  opacity: 1;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    //border-bottom: 1px solid white;
    bottom: -6px;
    left: 0;
  }
}

</style>
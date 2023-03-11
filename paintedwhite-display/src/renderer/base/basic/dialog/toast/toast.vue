<template>
  <div class="dialog-black-mask">
    <div class="toast" :class="iconsClass == '' ? 'toast-none-icon' : ''">
      <div v-if="iconsClass" :class="iconsClass"></div>
      <p class="toast-content" v-html="text"></p>
    </div>
  </div>
</template>

<script>
/**
 * The only true toast.
 * 
 * @class Toast
 * @platform Base
 * @type Dialog
 */
export default {
  name: 'basic-dialog-toast',
  props: {
    text: String,
    icon: String,
    timeout: Number,
    callback: Function
  },
  computed: {
    iconsClass() {
      let _icon = '';
      if (this.icon === 'success' || this.icon === 'error') {
        _icon = 'toast-' + this.icon + '-icon';
      }
      return _icon;
    }
  }
}
</script>

<style>
.toast {
  min-width: 124px;
  max-width: 80%;
  padding-top: 27px;
  background: rgba(40, 40, 40, 0.85);
  text-align: center;
  border-radius: 3px;
  color: #FFF;
  animation: zoom-in 0.06s ease forwards;
}

.toast-success-icon, .toast-error-icon {
  display: block;
  margin-bottom: 6px;
}

.toast-success-icon:after {
  width: 38px;
  height: 38px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAByFBMVEX///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8ip6xsAAAAl3RSTlMAAQIDBAYHCAkKCwwNDg8SFBUWFx0fICEkJygpLi8wMTQ1NzxAQUVGR0hJSktMTU5PUFFSVVhZWlxda2xtb3Byc3R1dnd4e3yCg4SMjo+Qk5SYmZydnqeoq6ytsLe4ubq7vL2+v8DDxMXGyMrOz9DR0tXW19jZ2tvc3d7f4OHi4+Tl5ufp6uvs7e7v8PHy8/T19vn7/P3++FiVSgAAA/NJREFUWMOtmf9DEncYxx8xEbMtYJEoY5VtqWs5wXI1WtZcONsqm83cFxa1NtNVTk1sYxQWYhjzMJXXv7sfLkZwHNwd9/zG5/Pc67jPPZ/383yeE6lv7hORyfhSZovXL/9aiE9GTrjFunUMXn1UpMqKj64OdlihOfqnlTIml8vtlX8p0/0Ok7jOC0n12vTM+PARj0NExOU5Mjw+k1bHkxc6TeBcX2YBdu9E/NpJf+TOLkB2zGWUdyYFkLj0np6D99IKQOqMIZzvZ4CHp+uukuP0Q4CYrzHvbB5InGpp5NdyKgHkzzZwa78JbI+3GXmUtvFt4Pv2ej7eOWC2y+hid80Cc946Dk+geKXVeDi0ThThie4fCKyBEjYXsEMKrAVqz/mfQfaY2R11bB2e+WvNeFb171XPAmuw6qnxzuZhvcfKrg+sw7xTMzwFhV5rqtRbgClNPEMxbFXnQkWoinBfHr61rpwTkK/chTGYb7MObP0dYhX6AkqXNGFdCoy8pfUpGJWmbBRS5cwwBov7mgPuW4Kx//U+CyelSfsENkpZ4TzMSdM2B+ffqO/fMNQ8cAiSqsr3w2OHecDxd6uywgoMiIjINETN8/oKf1QRo3BLRKRDYc9ngQc/Ve22PZT9IhKC38zztmuo4D0IicgN+MIWnkTghogkIGgLT/yQEPFCtsUWnkgavDIAP9jEkxn4WC6bDRp9nkThskypr8YOnoRgSu7CBzbxJAi/yjK4beKJG5Ylw57DJp44imTkX17ZxRN5xZZATjvxTq8lnrwEec2mljdb+NAKT3IgG+xoxn8ELdEAT3bYkiRoatDu51D4yDyvHTLyJ2hLJy3RCE8Nm7s1xaaaaIgnQbint/UqicZ46tbTE4e3iQZ5qjjoyleZ2G+QJzNwso7AloiGearAyiq8L3WIxnlqCpDv9JNU93MoGObJ52qSCkFc6hAN8ySuBsx+hV3d01X3C+M8766a6OUWXNT16nlhlCcX35QiMgDL+om0xyjP8bhULDmSdpVz/zhsLjhL0dK5YXNJbHvRbv+xQkZgq+mDz2c2H81+qRg5nIdvrAO/hnzVE55r9nh7zuYD+E3NqHMe1rsttwja7Wti9Og0MUT8acgcNcs7moG0joAEnoJiUiY+VeCp7nMdWoTihNlW1eIhfYeD98030+4frOfivG623Xfd2cAtvGmmIbk53PjGvhjAg0Yt0wcAscOGlmYkBbAyqpsLvaNqU3fE6GK7xtS28+3abefbatv5K5eJ8DpQboxHw0F3i4iI0x0MR8uN8QMmd0BF676Yy+V2mmrdq5lh8NqC9uPCwjVrHxdKktEXmYwvZRRQMkvxyUifp8EF/wHnSfXkuFtvVAAAAABJRU5ErkJggg==) no-repeat;
  background-size: 38px 38px;
}

.toast-error-icon:after {
  width: 35px;
  height: 35px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAABxVBMVEX////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////sayP7AAAAlnRSTlMAAQIDBAYHCAkKCwwNDxIUFRYXGx0fICEkJygpLi8wMTQ1Njc/QEVGR0hJSktMTU5PUFFSVVhZWlxda2xtbm9wcnN0dXZ3eHt8goOEjI6PkJOUmJmcnZ6nqKust7i5uru8vb6/wMHCw8TFxsfIzs/Q0dLV1tfY2drb3N3e3+Dh4uPk5enq6+zt7u/w8fLz9PX2+fv8/f7QXI1oAAAENklEQVRYw62Z70NTVRjHH4b8dsJSZEmkhilkEgMlbTbRiCGVimFIkdM00w2VAAGL0DGGw8VFgfv5e3txpcF27r3nbjvvOOfhs91zn+d7nvOdiPNoPBkeic2k1nn3+q+p2Ej4ZKMUP+q6rj0zyRvms2tddcXQfB1jRg6TyWS2c38ZYx0+j7iGS4vW/ybHh3qPNvlERGqbjvYOjSet+cVLDR5wtd+kAbbuhoOFi8Hw3S2A9ECtLu/cEsD8lQ/sAgJX5gCWzmnhmn8BeHrWcZd8Z58CTDS7885ngfkzFW5xFWfmgex5l7CaW8DboSqdR6kaegv8VOMUE4gDj1p0N7vlERAPOAS8APO7Sv10qBw24YXtF2hdBqPHW8J2G7Dcql4LvoL0ca8VdXwFXgVVK00L9p/lNFqXYaFJ8c4mYeVIMVXfugKT1QXTo7DRXpwqtW/AaEE+g9lTrM6FTMjL8OYs/FC8cg5Ddm8VTsBkVfHAyj9gYo++gNEiJYwWA/p2af0S9EtJox+WcifDAEzvKw24bwYG/tf7NJyWEsfnsLpzKlyEuJQ84nDxvfr+Dd2lA7th0VL5DnjuKx3om4NOEREZg6iUYUThtohIncG2+qyxVVr1QvM2Rr2IhOCBMqD+wddqXuT3euX8fQiJyE2IKHkPMZXEiMlDJTEMN0VkHtpUy/5JlMSICQm/UvJhXiQAafUhrCba80SSEJBO+Nlm7/2JQqITT8bhMxl0SBp/AsyINk+iMCij1qvRIzrzJASjcg8+Fk2iC0/a4DeZBae2eTfRjSeNMCspth0LOUeMmBD3O5azSUr+5Y1zie4Q3Xkib1gXyIgOUYcnr0HeseYmI/44mDo8yYCssik6RB2ebLIui1DjGjgIMOgaVgMp+ROa3AIjJuTXjG3a3LMRm/x6S2gQ2+C+c+ntyme/BjEEo47isKc+NIhRGHSSr7x6U6lZgXyddhDYgvp1JSYhILIAH2nxXInWESA/2hxSKn1xJn5lHVIhiGnyXIgxK2HqDbYCmjxHYmDLOujlNly24xXWrz3x8vtWRDphVvGeDxpqPfAnwDioUNfnO82Sb1Hdzp3YUOuLP7Hxqbqd+8fn3HB+YqNX/nabhnMnWxpWy9wSl71pL/+1QvpgveSLz5dlvpr9umfmcBa+Lx54FbJ5T3ih1OvthTJfwG8VzFZPwsqHRVsENeUzMY7YmBgiwSSkjnnlHUtBMmjz3V+C4fHW94UBL22f69A0mMNerarpQ/YBBx57N9MeH3AKqb7h1e67Ue0S1rPmxZBc69WwTCcAnrhZpk8AJg5rbU3fEsBcv63TGOi3TN0+3c2uHbBs5ztq2/mOZTt/W+shvfbnjPFoT1tjhYhIdWNbTzRnjO/3aiHstu7NTCazWZJ1b50MXdenCn9cmLpe3I8LO5JxKjwSm0kZYKRmYiPhU24N+X9p2xPwBOaSwgAAAABJRU5ErkJggg==) no-repeat;
  background-size: 35px 35px;
}

.toast-success-icon:after, .toast-error-icon:after {
  display: inline-block;
  content: '';
}

.toast-content {
  font-size: 14px;
  padding: 0 15px 22px 15px;
  line-height: 22px;
  word-break: break-all;
}
</style>
/**
 * @description: 长按
 * @param {*}
 * @return {*}
 * @author: gumingchen
 */
export default {
  beforeMount(el, binding) {
    const callback = binding.value;
    if (typeof callback !== 'function') {
      return console.warn('[Directive warn]: Invalid value: validation failed for value. Must be a function.')
    }
    el.$duration = binding.arg || 2000; // 获取长按时长, 默认3秒执行长按事件
    let timer = null;
    const add = (event) => {
      const { type, button } = event
      if (type === 'click' && button !== 0) return;
      event.preventDefault();
      if (timer === null) {
        timer = setTimeout(() => {
          callback();
          timer = null;
        }, el.$duration)
      }
    }
    const cancel = () => {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    }
    // 添加计时器
    el.addEventListener('mousedown', add);
    el.addEventListener('touchstart', add);
    // 取消计时器
    el.addEventListener('click', cancel);
    el.addEventListener('mouseout', cancel);
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  },
  updated(el, binding) {
    // 可以实时更新时长
    el.$duration = binding.arg;
  },
  unmounted(el) {
    el.removeEventListener('mousedown', () => { });
    el.removeEventListener('touchstart', () => { });
    el.removeEventListener('click', () => { });
    el.removeEventListener('mouseout', () => { });
    el.removeEventListener('touchend', () => { });
    el.removeEventListener('touchcancel', () => { });
  }
}

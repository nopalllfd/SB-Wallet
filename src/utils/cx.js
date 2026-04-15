import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display-xs', 'display-sm', 'display-md', 'display-lg', 'display-xl', 'display-2xl'],
    },
  },
});

/**
 * Fungsi ini adalah wrapper untuk twMerge.
 * Digunakan untuk menggabungkan class Tailwind dengan benar (menghindari konflik).
 */
export const cx = twMerge;

/**
 * Fungsi ini sebenarnya cuma "dummy" supaya Tailwind IntelliSense mau
 * mengurutkan class di dalam objek style.
 */
export function sortCx(classes) {
  return classes;
}

import api from './request';
import { log } from './logger';

export { api, log };

export function rangeArray(size: number) {
  let _array: Array<number> = [];
  for (let i = 0; i < size; i++) {
    _array[i] = i;
  }
  return _array;
}

export function queryString(obj?: Object) {
  if (!obj) {
    return '';
  }
  return (
    '?' +
    Object.keys(obj)
      .map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
      })
      .join('&')
  );
}

/**
 * 将http转为https
 * @param url 链接
 */
export const parse2Https = (url: string) => {
  if (!url) return;
  return url.startsWith('https') ? url : url.replace('http', 'https');
};

export const parseDate = function (date: string) {
  var t = Date.parse(date);
  if (typeof t === 'number') {
    return new Date(Date.parse(date.replace(/-/g, '/')));
  } else {
    return new Date();
  }
};

export function parseWeekday(sDate: any) {
  var dt = typeof sDate === 'string' ? new Date(sDate.replace(/-/g, '/')) : sDate;
  var a = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return a[dt.getDay()];
}

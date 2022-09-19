'use strict';


export const host = (window as any)['__env']['apiUrl'] || 'http://127.0.0.1:8080';

export const Config = {
  Host: host,
}

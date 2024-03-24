declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';

declare module 'http-auth-connect' {
  export default function authConnect(auth: any): any;
}

export {};

type CookieName = 'jwt_token';

declare module 'js-cookie' {
  interface CookiesStatic {
    get(name: CookieName): string | undefined;
    set(name: CookieName, value: string | number | boolean): string;
  }
}

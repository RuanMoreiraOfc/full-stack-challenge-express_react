export type { Never };

type Never<T> = {
  [key in keyof T]?: never;
};

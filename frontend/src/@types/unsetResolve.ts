export type { UnsetResolve };

type UnsetResolve<T> = T extends never ? unknown : T;

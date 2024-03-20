export const pickProps = <Type extends Record<string, unknown>, Keys extends keyof Type>(
  obj: Type,
  keys: Keys[],
): { [k in Keys]: Type[k] } =>
  Object.entries(obj)
    .filter(([key]) => keys.includes(key as Keys))
    .reduce((red, [key, val]) => ({ ...red, [key]: val }), {} as { [k in Keys]: Type[k] })

// test const x = pickProps({ x: 11, d: 22, c: 4 }, ['c'])
export type AccessAuthProps = { access: Record<string, unknown> }
export const ModelRpcToProps = <K, P extends AccessAuthProps>(props: K, obj: P) => ({
  ...obj,
  access: { ...obj.access, ...props },
})

// const aNumber = resourceRpcToProps({ a: 1, b: 4 }, { k: 2, access: { a:2, c: 3 } }).access

/*
export const addAuthMissing =
  (missing: Record<string, unknown>) =>
  <T extends AccessAuthProps, P extends AccessAuthProps>(rpcResource: Promise<T>): Promise<P> =>
    rpcResource.then(r => resourceRpcToProps(missing, r))
W
*/

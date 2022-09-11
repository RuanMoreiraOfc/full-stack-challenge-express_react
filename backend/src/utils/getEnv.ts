export default getEnv;

type BaseTypes = string | number | boolean;
type Parser<T extends BaseTypes> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : 'boolean';

function getEnv<T extends BaseTypes = string>(
  name: string,
  forceParse: Parser<T>,
  defaultValue?: T,
): T {
  const ENV = process.env[name];

  if (ENV === undefined) {
    if (defaultValue === undefined) {
      throw new Error(`\`${name}\` is not defined!`);
    }

    return parse<T>(defaultValue, forceParse);
  }

  return parse<T>(ENV as any, forceParse);
}

const parse = <T extends BaseTypes>(value: T, parser?: Parser<T>): T => {
  let result;

  switch (parser) {
    case 'boolean':
      result = Boolean(value);
      break;

    case 'number':
      result = Number(value);
      break;

    default:
      result = String(value);
      break;
  }

  return result as T;
};

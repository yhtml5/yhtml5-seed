import {
  isUndefined,
  isNumber,
  isFunction,
  isArray, isArrayEmpty,
  isString, isStringEmpty, isStringNotEmpty,
  isObject, isObjectEmpty, isArrayNotEmpty
} from '../util/validator';

it('util.validator.isUndefined', () => {
  const values = [null, NaN, 111, '111', {}, [], () => { },]
  values.forEach((value) => {
    expect(isUndefined(value)).toEqual(false);
  });
  expect(isUndefined(undefined)).toEqual(true);
});

it('util.validator.isNumber', () => {
  expect(isNumber(111)).toEqual(true);
});
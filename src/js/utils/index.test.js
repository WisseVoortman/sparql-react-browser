import { getTextFromUri, isValidUri, addTripleToArray } from './index';

test('Test getTextFromUri', ()=> {
  expect(getTextFromUri('http://org.com/theTideIsHigh')).toBe('theTideIsHigh');
  expect(getTextFromUri('http://org.com/aaaaaaaaaaaaaaaaaaaaaa' +
  'aaaaaaaaaaaaaaaaaaaaa').length).toBe(20);
  expect(getTextFromUri('http://org.com#foo')).toBe('foo');
});

test('Test isValidUri', () => {
  expect(isValidUri('test')).toBeFalsy();
  expect(isValidUri('www.test.nl')).toBeFalsy();
  expect(isValidUri('http://test.nl')).toBeTruthy();
  expect(isValidUri('http://www.test.nl')).toBeTruthy();
});

test('Test addTripleToArray', () => {
  expect(addTripleToArray([], 'test', 'test', 'test').length).toBe(1);

});

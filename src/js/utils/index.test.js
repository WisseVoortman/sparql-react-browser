import {getTextFromUri, isValidUri, addTripleToArray} from './index';

test('Test getTextFromUri', ()=> {
  expect(getTextFromUri("http://org.com/theTideIsHigh")).toBe("theTideIsHigh");
})

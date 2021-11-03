import {DataframeModel} from "./dataframe.model";

describe('DataframeModel', () => {
  it('get Entries', () => {
    const entries = DataframeModel.getEntries({a: [1, 2]}, [10, 20]);
    expect(entries).toEqual([[10, {a: 1}], [20, {a: 2}]]);
  });

  it('constructor', () => {
    const df = new DataframeModel({a: [1, 2]}, [10, 20]);
    const value = df.loc(10, 'a');
    expect(value).toEqual(1);
  });
});

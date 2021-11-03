export class DataframeModel {

  private _dataContainer!: Map<string | number, { [k: string]: any[] }>;


  static getEntries(columnsData: { [p: string]: any[] }, index: string[] | number[]) {
    const columnIndices = Object.keys(columnsData);
    return index.map((iValue, iRank) => {
      return [iValue, Object.fromEntries(columnIndices.map(c => [c, columnsData[c][iRank]]))];
    });
  }

  constructor(columnsData: { [k: string]: any[] }, index?: string[] | number[]) {
    this.checkColumnsLength(columnsData);
    if (index === undefined) {
      index = this.getDefaultIndex(columnsData);
    } else {
      this.checkIndexLength(columnsData, index);
    }
    const mapEntries = DataframeModel.getEntries(columnsData, index);
    // @ts-ignore
    this._dataContainer = new Map<string | number, { [p: string]: any }>(mapEntries);
  }

  length() {
    return Array.from(this._dataContainer.keys()).length;
  }

  loc(line: any, col: any): any {
    const v = this._dataContainer.get(line);
    return v ? v[col] : null;
  }

  line(line: any): any {
    return this._dataContainer.get(line);
  }

  getDefaultIndex(columnsData: { [k: string]: any[] }) {
    return columnsData[Object.keys(columnsData)[0]].map((_, i) => i);
  }

  checkColumnsLength(columnsData: { [k: string]: any[] }) {
    let ref = columnsData[Object.keys(columnsData)[0]].length;
    Object.values(columnsData).forEach(col => {
      if (col.length !== ref) {
        console.error("All columns must have the same length");
        throw new Error("All columns must have the same length");
      }
    });
  }

  checkIndexLength(columnsData: { [k: string]: any[] }, index: string[] | number[]) {
    let ref = columnsData[Object.keys(columnsData)[0]].length;
    if (index.length !== ref) {
      console.error("Index must have the same length than columns");
      throw new Error("Index must have the same length than columns");
    }
  }
}

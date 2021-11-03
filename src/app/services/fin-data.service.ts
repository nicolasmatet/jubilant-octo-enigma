import {Injectable} from '@angular/core';
import {CBC2019} from "./fin_data";
import {DataframeModel} from "../models/dataframe.model";

@Injectable({
  providedIn: 'root'
})
export class FinDataService {

  private dataFiles = new Map<string, any>([['CBCR 2019', CBC2019]]);

  constructor() {
  }

  getDataFiles() {
    return Array.from(this.dataFiles.keys());
  }

  getData(dataFile: string): DataframeModel {
    const data: any[] = this.dataFiles.get(dataFile);
    const columnData = this.getColumnData(data, ['tag'], [1], 2);
    const index = columnData['tag'];
    return new DataframeModel(columnData, index);
  }


  getColumnData(data: any[], idCols: string[], pivotCols: number[], valueCol: number): { [k: string]: any[] } {
    const columnsData = {};
    data.map(row => {
      pivotCols.map(colIdx => {
        const pivotColName = row[colIdx];
        const value = row[valueCol];
        FinDataService.pushToColumn(columnsData, pivotColName, value);
        idCols.map((idColName, idColIdx) => {
          // @ts-ignore
          FinDataService.insertInColumn(columnsData, idColName, row[idColIdx], columnsData[pivotColName].length - 1);
        });
      });
    });
    return columnsData;
  }

  private static pushToColumn(data: any, colName: string, value: any) {
    if (data[colName] === undefined) {
      data[colName] = [];
    }
    data[colName].push(value);
  }

  private static insertInColumn(data: any, colName: string, value: any, index: number) {
    if (data[colName] === undefined) {
      data[colName] = [];
    }
    data[colName][index] = value;
  }
}

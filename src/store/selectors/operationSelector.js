import { createSelector } from 'reselect'
import {operations} from '../../pages/main';

const getChartData = (state) => state.chartData.data;
const getItemsOperations = (state) => state.items.operationData


export const getOperationsValue = createSelector(
  [getChartData],
  (chartData) => {
    console.log(operations(chartData));  
    return operations(chartData);//do it
  }
)
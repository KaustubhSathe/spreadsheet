import { configureStore } from '@reduxjs/toolkit'
import nameBoxReducer from './nameBoxSlice'
import formulaBarReducer from './formulaBarSlice'
import selectedCellReducer from './selectedCellSlice'
import spreadsheetsReducer from './spreadsheetsSlice'
import spreadSheetMetaDataReducer from './spreadSheetMetaDataSlice'
import formulaBarVisibleReducer from './formulaBarVisibleSlice'
import toolBarVisibleReducer from './toolBarVisibleSlice'
import savedReducer from './savedSlice'

const store = configureStore({
  reducer: {
    nameBox: nameBoxReducer,
    formulaBar: formulaBarReducer,
    selectedCell: selectedCellReducer,
    spreadsheets: spreadsheetsReducer,
    spreadSheetMetaData: spreadSheetMetaDataReducer,
    formulaBarVisible: formulaBarVisibleReducer,
    toolBarVisible: toolBarVisibleReducer,
    saved: savedReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
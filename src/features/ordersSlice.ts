import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IFeatureData as IDataFeature } from './feature.types'
import { IOrder, IOrderResponse } from '../types'
import { client } from '../api/client'

const initialState: IDataFeature<IOrderResponse> = {
  data: null,
  isLoading: false,
  errors: undefined,
}

export const fetchOrders = createAsyncThunk<IOrderResponse, { start: number, end: number }>(
  'orders/fetch',
  // if you type your function argument here
  async (params) => {
    return await client.get<IOrderResponse>('orders', { start: `${params.start}`, end: `${params.end}` })
  }
)

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state, action) => {
        state.errors = undefined
        state.data = null
        state.isLoading = true
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.data = action.payload
      })
      /*  TODO: обработать */
      .addCase(fetchOrders.rejected, (state, action) => {
        state.errors = [action.error.name + ': ' + (action.error.message || 'Unknown error')]
        state.data = null
        state.isLoading = false
      })
  }
})


const ordersReducer = ordersSlice.reducer

export default ordersReducer

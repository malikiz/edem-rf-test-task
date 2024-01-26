import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IFeatureData } from './features.types'
import { IOrderResponse } from '../types'
import { client } from '../api/client'

const initialState: IFeatureData<IOrderResponse> = {
  data: null,
  isLoading: false,
  errors: undefined,
}

export const fetchMoreOrders = createAsyncThunk<IOrderResponse, { start: number, end: number }>(
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
      .addCase(fetchMoreOrders.pending, (state, action) => {
        state.errors = undefined
        state.isLoading = true
      })
      .addCase(fetchMoreOrders.fulfilled, (state, action) => {
        state.errors = undefined

        for (const order of action.payload.orders) {
          if (!state.data) {
            state.data = action.payload
          } else if (!state.data.orders.some(stateOrder => stateOrder.id === order.id)) {
            state.data.orders.push(order)
          }
        }

        state.isLoading = false
      })
      /*  TODO: обработать */
      .addCase(fetchMoreOrders.rejected, (state, action) => {
        state.errors = [action.error.name + ': ' + (action.error.message || 'Unknown error')]
        state.isLoading = false
      })
  }
})

const ordersReducer = ordersSlice.reducer

export default ordersReducer

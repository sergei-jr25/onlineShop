import { ICart, ICartDto } from '@/shared/type/cart.interface'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { accessToken } from './api.helper'

// Define a service using a base URL and expected endpoints
export const api = createApi({
	reducerPath: 'api',
	tagTypes: ['Cart'],
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://localhost:5000/api',
		prepareHeaders: (headers, { getState }) => {
			// const token = (getState() as RootState).user.accessToken
			let token: string | undefined
			token = accessToken()

			if (token) {
				headers.set('Authorization', `Bearer ${token}`)
			}

			return headers
		}
	}),
	endpoints: builder => ({
		getCartProducts: builder.query<ICart[], number>({
			query: userId => `/shopping-cart/${userId}`,
			providesTags: (result, error, userId) => [{ type: 'Cart', userId }]
		}),
		createShopCart: builder.mutation<ICart, ICartDto>({
			query: body => ({
				url: '/shopping-cart/create',
				method: 'POST',
				body
			}),
			invalidatesTags: ['Cart']
		}),
		updateTotalPrice: builder.mutation<
			number,
			{ id: number; totalPrice: number }
		>({
			query: ({ id, totalPrice }) => ({
				url: `/shopping-cart/total-price/${id}`,
				method: 'PUT',
				body: { totalPrice }
			})
		}),
		updateCount: builder.mutation<number, { partId: number; count: number }>({
			query: ({ partId, count }) => ({
				url: `/shopping-cart/count/${partId}`,
				method: 'PUT',
				body: { count }
			}),
			invalidatesTags: ['Cart']
		}),
		remove: builder.mutation<any, number>({
			query: id => ({
				url: `/shopping-cart/remove/${id}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Cart']
		}),
		removeAll: builder.mutation<any, number>({
			query: id => ({
				url: `/shopping-cart/remove-user-id/:${id}`,
				method: 'DELETE'
			})
		})
	})
})

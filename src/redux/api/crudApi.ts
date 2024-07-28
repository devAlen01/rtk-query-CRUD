import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url =
  "https://api.elchocrud.pro/api/v1/fb19eaca07fcf37ebedc22b4e688a8f1/rtkq-crud";

export const crudApi = createApi({
  reducerPath: "api",
  tagTypes: ["crud"],
  baseQuery: fetchBaseQuery({
    baseUrl: url,
  }),

  endpoints: (builder) => ({
    getProduct: builder.query<IProduct[], CRUD.getReq>({
      query: () => "/",
      providesTags: ["crud"],
    }),

    postProduct: builder.mutation<CRUD.postReq, IProduct>({
      query: (newProduct) => ({
        url: "/",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["crud"],
    }),
    delProduct: builder.mutation({
      query: (id: number) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["crud"],
    }),
    updateProduct: builder.mutation<void, { id: number; editProd: IProduct }>({
      query: ({ id, editProd }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: editProd,
      }),
      invalidatesTags: ["crud"],
    }),
  }),
});

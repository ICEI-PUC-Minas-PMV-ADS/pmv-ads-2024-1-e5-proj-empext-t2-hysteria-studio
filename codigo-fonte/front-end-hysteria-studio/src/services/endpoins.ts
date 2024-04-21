import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetServicosResult {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  dt_criacao: string;
}

interface CreateServicoParams {
  nome: string;
  preco: number;
  descricao: string;
}

interface CreateServicoResult {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  createdAt: string;
  updatedAt: string;
}

interface DeleteServicoResult {
  message: string;
}

interface UpdateServicoParams {
  nome: string;
  preco: number;
  descricao: string;
  id: string;
}

interface UpdateServicoResult {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  createdAt: string;
  updatedAt: string;
}

export const endpointsApi = createApi({
  reducerPath: "endpointsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hysteria-studio-backend.onrender.com/",
  }),
  tagTypes: ["ServicosList"],
  endpoints: (builder) => ({
    getServicos: builder.query<Array<GetServicosResult>, void>({
      query: () => "servicos",
      providesTags: ["ServicosList"],
    }),
    createServico: builder.mutation<CreateServicoResult, CreateServicoParams>({
      query: (body) => ({
        url: "servico",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ServicosList"],
    }),
    deleteServico: builder.mutation<DeleteServicoResult, string>({
      query: (id) => ({
        url: `servico/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServicosList"],
    }),
    getOneServico: builder.query<GetServicosResult, string>({
      query: (id) => `servico/${id}`,
    }),
    updateServico: builder.mutation<UpdateServicoResult, UpdateServicoParams>({
      query: ({ id, ...body }) => ({
        url: `servico/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ServicosList"],
    }),
  }),
});

export const {
  useGetServicosQuery,
  useCreateServicoMutation,
  useDeleteServicoMutation,
  useGetOneServicoQuery,
  useUpdateServicoMutation,
} = endpointsApi;

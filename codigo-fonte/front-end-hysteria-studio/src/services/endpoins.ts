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

interface LoginArg {
  email: string;
  senha: string;
}

export interface LoginResult {
  cpf: string;
  createdAt: string;
  data_de_nascimento: string;
  email: string;
  flag_admin: boolean;
  id: number;
  nome: string;
  senha: string;
  telefone: string;
  updatedAt: string;
}
interface CreateUsuarioParams {
  nome: string;
  cpf: string;
  data_de_nascimento: string;
  telefone: string;
  email: string;
  senha: string;
  flag_admin: boolean;
}

interface CreateUsuarioResult {
  id: number;
  nome: string;
  cpf: string;
  data_de_nascimento: string;
  telefone: string;
  email: string;
  senha: string;
  flag_admin: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface GetPedidosResult {
  id_agendamento: number;
  data_hora_atendimento: string;
  servico: {
    id: number;
    nome: string;
  };
  usuario: {
    id: number;
    nome: string;
  };
}

export interface EditUsuarioParams {
  id: number;
  nome: string;
  cpf: string;
  data_de_nascimento: string;
  telefone: string;
  email: string;
  senha: string;
  flag_admin: boolean;
}

interface EditUsuarioResult {
  id: number;
  nome: string;
  cpf: string;
  data_de_nascimento: string;
  telefone: string;
  email: string;
  senha: string;
  flag_admin: boolean;
  updatedAt: string;
  createdAt: string;
}

export const endpointsApi = createApi({
  reducerPath: "endpointsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hysteria-studio-backend.onrender.com/",
  }),
  tagTypes: ["ServicosList", "OneServico"],
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
      invalidatesTags: ["ServicosList", "OneServico"],
    }),
    getOneServico: builder.query<GetServicosResult, string>({
      query: (id) => `servico/${id}`,
      providesTags: ["OneServico"],
    }),
    updateServico: builder.mutation<UpdateServicoResult, UpdateServicoParams>({
      query: ({ id, ...body }) => ({
        url: `servico/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["ServicosList", "OneServico"],
    }),
    login: builder.mutation<LoginResult, LoginArg>({
      query: (arg) => ({
        url: "login",
        method: "POST",
        body: arg,
      }),
    }),
    createUsuario: builder.mutation<CreateUsuarioResult, CreateUsuarioParams>({
      query: (body) => ({
        url: "usuario",
        method: "POST",
        body,
      }),
    }),
    getPedidos: builder.query<Array<GetPedidosResult>, void>({
      query: () => "agendamentos",
    }),
    editUsuario: builder.mutation<EditUsuarioResult, EditUsuarioParams>({
      query: ({ id, ...body }) => ({
        url: `usuario/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetServicosQuery,
  useCreateServicoMutation,
  useDeleteServicoMutation,
  useGetOneServicoQuery,
  useUpdateServicoMutation,
  useLoginMutation,
  useCreateUsuarioMutation,
  useGetPedidosQuery,
  useEditUsuarioMutation,
} = endpointsApi;

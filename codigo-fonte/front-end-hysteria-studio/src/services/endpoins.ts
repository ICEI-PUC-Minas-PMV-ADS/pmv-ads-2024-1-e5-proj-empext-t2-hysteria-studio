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

interface DeleteAgendaResult {
  message: string;
}

export interface GetAgendamentosResult {
  id_agendamento: number;
  horario_agendamento: {
    id: number;
    horario_disponivel: string;
  };
  servico: {
    id: number;
    nome: string;
  };
  usuario: {
    id: number;
    nome: string;
  };
  status: {
    status_agendamento:
      | "SOLICITACAO_EM_ESPERA"
      | "AGENDAMENTO_CONFIRMADO"
      | "CONCLUIDO"
      | "CANCELADO";
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

interface EditAgendamentosParams {
  id: number;
  id_usuario: number;
  id_servico: number;
  id_horario: number;
  createdAt: string;
  updatedAt: string;
}

interface EditAgendamentosResult {
  id: number;
  id_usuario: number;
  id_servico: number;
  data_hora_atendimento: string;
}
interface CreateAgendamentoParams {
  id_usuario: string;
  id_servico: string;
  data_hora_atendimento: string;
  id_horario: string;
}

interface CreateAgendamentoResult {
  id_agendamento: number;
  id_usuario: string;
  id_servico: string;
  data_hora_atendimento: string;
  id_horario: string;
  createdAt: string;
  updatedAt: string;
}

interface GetHorariosResult {
  id: number;
  horario_disponivel: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetAgendamentosUsuarioResult {
  id_agendamento: number;
  horario_agendamento: {
    id: number;
    horario_disponivel: string;
  };
  servico: {
    id: number;
    nome: string;
  };
  usuario: {
    id: number;
    nome: string;
  };
  status: {
    status_agendamento:
      | "SOLICITACAO_EM_ESPERA"
      | "AGENDAMENTO_CONFIRMADO"
      | "CONCLUIDO"
      | "CANCELADO";
  };
}

interface DeleteUsuarioResult {
  message: string;
}

export interface GetHistoricosResult {
  id_agendamento: number;
  horario_agendamento: {
    id: number;
    horario_disponivel: string;
  };
  servico: {
    id: number;
    nome: string;
  };
  usuario: {
    id: number;
    nome: string;
  };
  status: {
    status_agendamento:
      | "SOLICITACAO_EM_ESPERA"
      | "AGENDAMENTO_CONFIRMADO"
      | "CONCLUIDO"
      | "CANCELADO";
  };
}

export interface GetHistoricosUsuarioResult {
  id_agendamento: number;
  horario_agendamento: {
    id: number;
    horario_disponivel: string;
  };
  servico: {
    id: number;
    nome: string;
  };
  usuario: {
    id: number;
    nome: string;
  };
  status: {
    status_agendamento:
      | "SOLICITACAO_EM_ESPERA"
      | "AGENDAMENTO_CONFIRMADO"
      | "CONCLUIDO"
      | "CANCELADO";
  };
}

export const endpointsApi = createApi({
  reducerPath: "endpointsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://hysteria-studio-backend.onrender.com/",
  }),
  tagTypes: ["ServicosList", "OneServico", "AgendamentosList"],
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
    getAgendamentos: builder.query<Array<GetAgendamentosResult>, void>({
      query: () => "agendamentos",
      providesTags: ["AgendamentosList"],
    }),
    editUsuario: builder.mutation<EditUsuarioResult, EditUsuarioParams>({
      query: ({ id, ...body }) => ({
        url: `usuario/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteAgenda: builder.mutation<DeleteAgendaResult, number>({
      query: (id) => ({
        url: `agendamento/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AgendamentosList"],
    }),
    editAgendamento: builder.mutation<
      EditAgendamentosResult,
      EditAgendamentosParams
    >({
      query: ({ id, ...body }) => ({
        url: `agendamento/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["AgendamentosList"],
    }),
    createAgendamento: builder.mutation<
      CreateAgendamentoResult,
      CreateAgendamentoParams
    >({
      query: (body) => ({
        url: "agendamento",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AgendamentosList"],
    }),
    getHorarios: builder.query<Array<GetHorariosResult>, void>({
      query: () => "horarios",
    }),
    getAgendamentosUsuario: builder.query<
      Array<GetAgendamentosUsuarioResult>,
      number
    >({
      query: (id) => `agendamento/usuario/${id}`,
    }),
    deleteUsuario: builder.mutation<DeleteUsuarioResult, number>({
      query: (id) => ({
        url: `usuario/${id}`,
        method: "DELETE",
      }),
    }),
    getHistoricos: builder.query<Array<GetHistoricosResult>, void>({
      query: () => "agendamentos/historico",
    }),
    getHistoricosUsuario: builder.query<
      Array<GetHistoricosUsuarioResult>,
      number
    >({
      query: (id) => `agendamentos/usuario/historico/id/${id}`,
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
  useGetAgendamentosQuery,
  useEditUsuarioMutation,
  useDeleteAgendaMutation,
  useEditAgendamentoMutation,
  useGetHorariosQuery,
  useGetAgendamentosUsuarioQuery,
  useDeleteUsuarioMutation,
  useGetHistoricosQuery,
  useGetHistoricosUsuarioQuery,
  useCreateAgendamentoMutation,
} = endpointsApi;

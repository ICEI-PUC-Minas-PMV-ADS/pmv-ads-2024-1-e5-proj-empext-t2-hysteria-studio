import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetAgendaResult {
  data_hora_atendimento: string;
  dt_criacao: string;
  id: string;
  servico_id: string;
  usuarioId: string;
}

interface GetServicosResult {
  id: string;
  nome: string;
  preco: number;
  descricao: string;
  dt_criacao: string;
}

export const endpointsApi = createApi({
  reducerPath: "endpointsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://hysteria-ppxi.onrender.com/" }),
  endpoints: (builder) => ({
    getAgendas: builder.query<Array<GetAgendaResult>, void>({
      query: () => "agendas",
    }),
    getServicos: builder.query<Array<GetServicosResult>, void>({
      query: () => "servicos",
    }),
  }),
});

export const { useGetAgendasQuery, useGetServicosQuery } = endpointsApi;

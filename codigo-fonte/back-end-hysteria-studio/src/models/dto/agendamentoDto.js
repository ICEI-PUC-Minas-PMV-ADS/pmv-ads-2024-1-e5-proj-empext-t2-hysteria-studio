class AgendamentoDto {
    constructor(idAgendamento, data_hora_atendimento, servicoResumidoDto, usuarioResumidoDto) {
        this.id_agendamento = idAgendamento;
        this.data_hora_atendimento = data_hora_atendimento;
        this.servico = servicoResumidoDto;
        this.usuario = usuarioResumidoDto;
    }
}

module.exports = {AgendamentoDto};
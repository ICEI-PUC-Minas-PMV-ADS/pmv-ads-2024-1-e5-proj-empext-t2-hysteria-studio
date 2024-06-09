class AgendamentoDto {
    constructor(idAgendamento, dataHoraAtendimento, servicoResumidoDto, usuarioResumidoDto, statusAgendamento, usuarioInexistente) {
        this.id_agendamento = idAgendamento;
        this.horario_agendamento = dataHoraAtendimento;
        this.servico = servicoResumidoDto;
        if(usuarioResumidoDto.id != -1) this.usuario = usuarioResumidoDto;
        this.status = statusAgendamento;
        if(usuarioInexistente.id != -1) this.usuario_inexistente = usuarioInexistente;
    }
}

module.exports = {AgendamentoDto};
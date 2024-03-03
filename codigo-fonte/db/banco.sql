CREATE TABLE `usuario` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `data_de_nascimento` timestamp NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `flag_maior_idade` int NOT NULL,
  `responsavel` varchar(100),
  `login` varchar(20) NOT NULL,
  `senha` varchar(20) NOT NULL,
  `flag_admin` int NOT NULL,
  `dt_criacao` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `servico` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `preco` decimal(4,2) NOT NULL,
  `descricao` varchar(255),
  `dt_criacao` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE `agendamentos` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_servico` int NOT NULL,
  `data_hora_atendimento` timestamp NOT NULL,
  `dt_criacao` timestamp NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

ALTER TABLE `usuario` ADD CONSTRAINT `FK_usuario` FOREIGN KEY (`id`) REFERENCES `agendamentos` (`id_usuario`);

ALTER TABLE `servico` ADD CONSTRAINT `FK_servico` FOREIGN KEY (`id`) REFERENCES `agendamentos` (`id_servico`);

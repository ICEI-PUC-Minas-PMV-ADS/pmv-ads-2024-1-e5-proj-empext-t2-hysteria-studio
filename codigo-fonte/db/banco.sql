CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `data_de_nascimento` datetime NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `flag_admin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `usuarios_inexistentes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `status_agendamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status_agendamento` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `servicos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `preco` varchar(255) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `horarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `horario_disponivel` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `agendamentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_usuario` int NOT NULL,
  `id_servico` int NOT NULL,
  `id_horario` int NOT NULL,
  `id_status` int NOT NULL,
  `id_usuarioInexistente` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_servico` (`id_servico`),
  KEY `id_horario` (`id_horario`),
  KEY `id_status` (`id_status`),
  KEY `id_usuarioInexistente` (`id_usuarioInexistente`),
  CONSTRAINT `agendamentos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `agendamentos_ibfk_2` FOREIGN KEY (`id_servico`) REFERENCES `servicos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `agendamentos_ibfk_3` FOREIGN KEY (`id_horario`) REFERENCES `horarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `agendamentos_ibfk_4` FOREIGN KEY (`id_status`) REFERENCES `status_agendamentos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `agendamentos_ibfk_5` FOREIGN KEY (`id_usuarioInexistente`) REFERENCES `usuarios_inexistentes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);
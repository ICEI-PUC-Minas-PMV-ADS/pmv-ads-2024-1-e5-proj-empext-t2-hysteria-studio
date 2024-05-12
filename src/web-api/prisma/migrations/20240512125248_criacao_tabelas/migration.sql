-- CreateTable
CREATE TABLE `Usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NULL,
    `data_de_nascimento` DATETIME(3) NULL,
    `telefone` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `flag_maior_idade` INTEGER NULL,
    `responsavel` VARCHAR(191) NULL,
    `login` VARCHAR(191) NULL,
    `senha` VARCHAR(191) NOT NULL,
    `flag_admin` INTEGER NULL DEFAULT 1,
    `dt_criacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servicos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `dt_criacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `agendas` (
    `id` VARCHAR(191) NOT NULL,
    `data_hora_atendimento` DATETIME(3) NULL,
    `dt_criacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `servico_id` VARCHAR(191) NOT NULL,
    `usuarioId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsuariosLog` (
    `id` VARCHAR(191) NOT NULL,
    `id_Usuario` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NULL,
    `cpf` VARCHAR(191) NULL,
    `data_de_nascimento` DATETIME(3) NULL,
    `telefone` VARCHAR(191) NULL,
    `endereco` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `flag_maior_idade` INTEGER NULL,
    `responsavel` VARCHAR(191) NULL,
    `login` VARCHAR(191) NULL,
    `senha` VARCHAR(191) NOT NULL,
    `flag_admin` INTEGER NULL DEFAULT 1,
    `dt_criacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mtv_inclusao` VARCHAR(191) NULL,
    `dt_inclusao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UsuariosLog_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServicosLog` (
    `id` VARCHAR(191) NOT NULL,
    `id_servico` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `preco` DOUBLE NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `dt_criacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mtv_inclusao` VARCHAR(191) NULL,
    `dt_inclusao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AgendasLog` (
    `id` VARCHAR(191) NOT NULL,
    `id_agenda` VARCHAR(191) NOT NULL,
    `data_hora_atendimento` DATETIME(3) NULL,
    `dt_criacao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mtv_inclusao` VARCHAR(191) NULL,
    `dt_inclusao` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `agendas` ADD CONSTRAINT `agendas_servico_id_fkey` FOREIGN KEY (`servico_id`) REFERENCES `servicos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `agendas` ADD CONSTRAINT `agendas_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

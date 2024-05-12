-- This is an empty migration.
-- This is an empty migration.
DROP TRIGGER IF EXISTS `railway`.`servicos_AFTER_UPDATE`;

CREATE DEFINER = CURRENT_USER TRIGGER `railway`.`servicos_AFTER_UPDATE` AFTER UPDATE ON `servicos` FOR EACH ROW
BEGIN
   insert into ServicosLog(id, id_servico, nome, preco, descricao, dt_criacao, mtv_inclusao, dt_inclusao) values (uuid(), old.id, old.nome, old.preco, old.descricao, old.dt_criacao, 'U', now());
END

-- This is an empty migration.
-- This is an empty migration.
-- This is an empty migration.
-- This is an empty migration.
DROP TRIGGER IF EXISTS `railway`.`agenda_AFTER_DELETE`;

CREATE DEFINER = CURRENT_USER TRIGGER `railway`.`agenda_AFTER_DELETE` AFTER UPDATE ON `agendas` FOR EACH ROW
BEGIN
   insert into AgendasLog(id, id_agenda, data_hora_atendimento, dt_criacao, mtv_inclusao,  dt_inclusao) values (uuid(), old.id, old.data_hora_atendimento, old.dt_criacao, 'D', now());
END

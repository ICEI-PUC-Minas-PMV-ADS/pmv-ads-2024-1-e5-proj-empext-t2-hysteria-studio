-- This is an empty migration.
-- This is an empty migration.
-- This is an empty migration.
-- This is an empty migration.
-- This is an empty migration.
DROP TRIGGER IF EXISTS `railway`.`usuario_AFTER_DELETE`;

CREATE DEFINER = CURRENT_USER TRIGGER `railway`.`usuario_AFTER_DELETE` AFTER UPDATE ON `Usuarios` FOR EACH ROW
BEGIN
   insert into UsuariosLog(id, id_Usuario, nome, data_de_nascimento, telefone	,  endereco, email, flag_maior_idade, responsavel, login, senha, flag_admin, dt_criacao, mtv_inclusao, dt_inclusao) 
     values (uuid(), old.id, old.nome, old.data_de_nascimento, old.telefone, old.endereco, old.email, old.flag_maior_idade, old.responsavel, old.login, old.senha, old.flag_admin, old.dt_criacao, 'U', now());
END

-- TEST DATA
INSERT INTO `users` (`email`, `password`, `civility`, `firstname`, `lastname`)
VALUES  ('test@test.test', '$2a$05$WkcMIl.lXO8Qnz./o2l4HeLssZ.OYcHDZMVzXqXBtLhQshofMRfmy', 'Mr', 'Alex', 'Terrieur');

INSERT INTO  `admins` (`email`, `password`, `firstname`, `lastname`)
VALUES  ('admin@admin.admin', '$2a$05$WkcMIl.lXO8Qnz./o2l4HeLssZ.OYcHDZMVzXqXBtLhQshofMRfmy', 'Kevin', 'Nguyen');
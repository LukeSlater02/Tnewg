USE [Tnewg];
GO

set identity_insert [UserProfile] on
insert into [UserProfile] (Id, FirstName, LastName, DisplayName, UserType, FirebaseUserId) VALUES (1, 'Luke', 'Slater', 'le seigneur du bord', 'admin', '1UjZVH8s7ROdbxL45WQXaj5pknW2'), (2, 'Test', 'User', 'TestUser', 'user','BBiKNxkjWxW8EazfkEysCuaVHGR2')
set identity_insert [UserProfile] off

set identity_insert [Card] on
insert into [Card] (Id, Name, Damage, HitPoints, Cost, BackgroundColor, BorderColor, StatsBackgroundColor, Image)
VALUES
(1, 'The Ronin', 4, 6, 3, '../img/redCard.png',	'../img/silverCardBorder.png',	'../img/statsBackgroundBrown.png',	'../img/samurai.webp'),
(2,	'The Arcanist',	6,	3,	5,	'../img/blueCard.png',	'../img/yellowCardBorder.png',	'../img/statsBackgroundShinyYellow.png',	'../img/wizardCard2.png'),
(3,	'Skeleton',	2,	2,	2,	'../img/grayCard.png',	'../img/silverCardBorder.png',	'../img/statsBackgroundBrown.png',	'../img/skeletonCard.png'),
(4,	'The Huntress',	5,	4,	4,	'../img/greenCard.png',	'../img/brownCardBorder.png',	'../img/statsBackgroundBrown.png',	'../img/huntress.png'),
(5,	'Goblin',	2,	2,	2,	'../img/grayCard.png',	'../img/brownCardBorder.png',	'../img/statsBackgroundGray.png',	'../img/goblin.png'),
(6,	'Fire Worm',	3,	3,	3,	'../img/redCard.png',	'../img/silverCardBorder.png',	'../img/statsBackgroundGray.png',	'../img/fireWorm.png'),
(7,	'Winter Warrior',	2,	5,	3,	'../img/blueCard.png',	'../img/silverCardBorder.png',	'../img/statsBackgroundBrown.png',	'../img/winterWarrior.png'),
(8,	'Shadowspinner',	6,	6,	6,	'../img/grayCard.png',	'../img/yellowCardBorder.png',	'../img/statsBackgroundShinyYellow.png',	'../img/darkSorcerer.png'),
(9,	'Pyromancer',	7,	2,	5,	'../img/redCard.png',	'../img/yellowCardBorder.png',	'../img/statsBackgroundYellow.png',	'../img/pyromancer.png')
 set identity_insert [Card] off

 set identity_insert [Deck] on
 insert into [Deck] (Id, Name, UserProfileId) VALUES (1, 'Luke Deck', 1), (2, 'TestUser Deck', 2)
 set identity_insert [Deck] off
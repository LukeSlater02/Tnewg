USE [master]

IF db_id('Tnewg') IS NULl
  CREATE DATABASE [Tnewg]
GO

USE [Tnewg]
GO


DROP TABLE IF EXISTS [CardComment];
DROP TABLE IF EXISTS [DeckComment];
DROP TABLE IF EXISTS [DeckCard];
DROP TABLE IF EXISTS [Deck];
DROP TABLE IF EXISTS [Card];
DROP TABLE IF EXISTS [UserProfile];
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [DisplayName] nvarchar(255) NOT NULL,
  [UserType] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Card] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Damage] int NOT NULL,
  [HitPoints] int NOT NULL,
  [Cost] int NOT NULL,
  [BackgroundColor] nvarchar(255) NOT NULL,
  [BorderColor] nvarchar(255) NOT NULL,
  [StatsBackgroundColor] nvarchar(255) NOT NULL,
  [Image] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Deck] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] varchar NOT NULL,
  [UserProfileId] int NOT NULL
)
GO

CREATE TABLE [DeckCard] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [CardId] int NOT NULL,
  [DeckId] int NOT NULL
)
GO

CREATE TABLE [DeckComment] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [DeckId] int NOT NULL,
  [UserProfileId] int NOT NULL,
  [Content] varchar(200) NOT NULL,
  [CreateDateTime] datetime NOT NULL
)
GO

CREATE TABLE [CardComment] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [CardId] int NOT NULL,
  [UserProfileId] int NOT NULL,
  [Content] varchar(200) NOT NULL,
  [CreateDateTime] datetime NOT NULL
)
GO

ALTER TABLE [Deck] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [DeckComment] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [CardComment] ADD FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [CardComment] ADD FOREIGN KEY ([CardId]) REFERENCES [Card] ([Id])
GO

ALTER TABLE [DeckComment] ADD FOREIGN KEY ([DeckId]) REFERENCES [Deck] ([Id])
GO

ALTER TABLE [DeckCard] ADD FOREIGN KEY ([DeckId]) REFERENCES [Deck] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [DeckCard] ADD FOREIGN KEY ([CardId]) REFERENCES [Card] ([Id]) ON DELETE CASCADE
GO

USE [master]
GO
/****** Object:  Database [AppDB]    Script Date: 20/01/2014 19:44:39 ******/
CREATE DATABASE [AppDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AppDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\AppDB.mdf' , SIZE = 4160KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'AppDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.SQLEXPRESS\MSSQL\DATA\AppDB_log.ldf' , SIZE = 1040KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [AppDB] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AppDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [AppDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [AppDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [AppDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [AppDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [AppDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [AppDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [AppDB] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [AppDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [AppDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [AppDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [AppDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [AppDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [AppDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [AppDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [AppDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [AppDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [AppDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [AppDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [AppDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [AppDB] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO
ALTER DATABASE [AppDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [AppDB] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [AppDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [AppDB] SET RECOVERY FULL 
GO
ALTER DATABASE [AppDB] SET  MULTI_USER 
GO
ALTER DATABASE [AppDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [AppDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [AppDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [AppDB] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
USE [AppDB]
GO
/****** Object:  Table [dbo].[t_albums]    Script Date: 20/01/2014 19:44:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[t_albums](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NOT NULL,
	[artistid] [int] NOT NULL,
	[coverurl] [varchar](50) NULL,
	[year] [int] NULL,
 CONSTRAINT [PK_t_albums] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[t_artists]    Script Date: 20/01/2014 19:44:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[t_artists](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NOT NULL,
	[imageurl] [varchar](50) NULL,
 CONSTRAINT [PK_t_artists] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[t_comments]    Script Date: 20/01/2014 19:44:40 ******/
SET ANSI_NULLS OFF
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[t_comments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[body] [nvarchar](500) NOT NULL,
	[date] [smalldatetime] NOT NULL,
	[albumid] [int] NOT NULL,
	[userid] [varchar](100) NOT NULL,
 CONSTRAINT [PrimaryKey_68b8ff44-b31d-4a18-9830-c5003fc66dc5] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[t_rates]    Script Date: 20/01/2014 19:44:40 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[t_rates](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[albumid] [int] NOT NULL,
	[value] [numeric](3, 1) NOT NULL,
	[date] [smalldatetime] NOT NULL,
	[userid] [varchar](100) NOT NULL,
 CONSTRAINT [PK_t_rates] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[t_albums] ON 

INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (50, N'Living things', 1, N'livingthings.jpg', 2012)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (51, N'Abbey road', 2, N'abbeyroad.jpg', 1969)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (52, N'Raise of the fenix', 3, N'riseofthefenix.jpg', 2011)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (53, N'Wasting light', 4, N'wastinglight.jpg', 2010)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (54, N'Blunder buss', 5, N'blunderbuss.jpg', 2012)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (55, N'Back in black', 6, N'backinblack.jpg', 1980)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (56, N'Physical Graffiti', 7, N'physicalgraffiti.jpg', 1975)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (57, N'Meteora', 1, N'meteora.jpg', 2000)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (58, N'Live at River Plate', 6, N'liveatriverplate.jpg', 2012)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (59, N'Let there be rock', 6, N'letthereberock.jpg', 1977)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (60, N'High way to hell', 6, N'highwaytohell.jpg', 1979)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (61, N'High Voltage', 6, N'highvoltage.jpg', 1976)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (62, N'PowerRage', 6, N'powerrage.jpg', 1978)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (63, N'Elephant', 2008, N'elephant.jpg', 2005)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (64, N'Get behind me satan', 2008, N'getbehindmesatan.jpg', 2008)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (65, N'Paparoach', 2009, N'paparoach.jpg', 2000)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (66, N'In your honor', 4, N'inyourhonor.jpg', 2005)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (67, N'One by one', 4, N'onebyone.jpg', 2008)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (68, N'Led Zeppelin', 7, N'ledzeppelinII.jpg', 1969)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (69, N'Minutes to midnight', 1, N'minutestomidnight.jpg', 2010)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (70, N'Road to revolution', 1, N'roadtorevolution.jpg', 2010)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (71, N'Let it be', 2, N'letitbe.jpg', 1970)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (72, N'Yellow submarine', 2, N'yellowsubmarine.jpg', 1967)
INSERT [dbo].[t_albums] ([id], [name], [artistid], [coverurl], [year]) VALUES (73, N'Pick of destiny', 3, N'pickofdestiny.jpg', 2008)
SET IDENTITY_INSERT [dbo].[t_albums] OFF
SET IDENTITY_INSERT [dbo].[t_artists] ON 

INSERT [dbo].[t_artists] ([id], [name], [imageurl]) VALUES (1, N'Linkin Park', N'linkinpark.jpg')
INSERT [dbo].[t_artists] ([id], [name], [imageurl]) VALUES (2, N'The Beatles', N'thebeatles.jpg')
INSERT [dbo].[t_artists] ([id], [name], [imageurl]) VALUES (3, N'Tenacious D', N'tenaciousd.jpg')
INSERT [dbo].[t_artists] ([id], [name], [imageurl]) VALUES (4, N'Foo Fighters', N'foofighter.jpg')
INSERT [dbo].[t_artists] ([id], [name], [imageurl]) VALUES (5, N'Jack White', N'jackwhite.jpg')
INSERT [dbo].[t_artists] ([id], [name], [imageurl]) VALUES (6, N'AC/DC', N'acdc.jpg')
INSERT [dbo].[t_artists] ([id], [name], [imageurl]) VALUES (7, N'Led Zeppelin', N'ledzepellin.jpg')
INSERT [dbo].[t_artists] ([id], [name], [imageurl]) VALUES (2008, N'The White Stripes', N'whitestripes.jpg')
INSERT [dbo].[t_artists] ([id], [name], [imageurl]) VALUES (2009, N'Paparoach', N'paparoach.jpg')
SET IDENTITY_INSERT [dbo].[t_artists] OFF
SET IDENTITY_INSERT [dbo].[t_comments] ON 

INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (1, N'Hey ! the first comment', CAST(0xA2B604F4 AS SmallDateTime), 71, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (2, N'What an album !', CAST(0xA2B604F6 AS SmallDateTime), 67, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (3, N'Yeah great', CAST(0xA2B604F7 AS SmallDateTime), 67, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (4, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 50, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (5, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 51, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (6, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 52, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (7, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 53, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (8, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 54, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (9, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 55, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (10, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 56, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (11, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 57, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (12, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 58, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (13, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 59, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (14, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 60, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (15, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 61, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (16, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 62, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (17, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 63, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (18, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 64, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (19, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 65, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (20, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 66, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (21, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 67, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (22, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 68, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (23, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 69, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (24, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 70, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (25, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 71, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (26, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 72, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (27, N'What an album !', CAST(0xA2B7039C AS SmallDateTime), 73, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (28, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 50, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (29, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 51, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (30, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 52, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (31, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 53, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (32, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 54, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (33, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 55, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (34, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 56, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (35, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 57, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (36, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 58, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (37, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 59, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (38, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 60, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (39, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 61, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (40, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 62, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (41, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 63, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (42, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 64, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (43, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 65, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (44, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 66, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (45, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 67, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (46, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 68, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (47, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 69, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (48, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 70, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (49, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 71, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (50, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 72, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (51, N'Yeah great', CAST(0xA2B7039D AS SmallDateTime), 73, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (52, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 50, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (53, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 51, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (54, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 52, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (55, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 53, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (56, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 54, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (57, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 55, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (58, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 56, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (59, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 57, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (60, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 58, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (61, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 59, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (62, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 60, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (63, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 61, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (64, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 62, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (65, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 63, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (66, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 64, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (67, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 65, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (68, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 66, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (69, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 67, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (70, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 68, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (71, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 69, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (72, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 70, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (73, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 71, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (74, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 72, N'anonymous')
INSERT [dbo].[t_comments] ([Id], [body], [date], [albumid], [userid]) VALUES (75, N'I don''t like it', CAST(0xA2B7039D AS SmallDateTime), 73, N'anonymous')
SET IDENTITY_INSERT [dbo].[t_comments] OFF
SET IDENTITY_INSERT [dbo].[t_rates] ON 

INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (1, 67, CAST(5.0 AS Numeric(3, 1)), CAST(0xA2B60521 AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (2, 67, CAST(10.0 AS Numeric(3, 1)), CAST(0xA2B60521 AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (3, 71, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B60522 AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (4, 71, CAST(9.0 AS Numeric(3, 1)), CAST(0xA2B60522 AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (5, 50, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (6, 51, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (7, 52, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (8, 53, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (9, 54, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (10, 55, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (11, 56, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (12, 57, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (13, 58, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (14, 59, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (15, 60, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (16, 61, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (17, 62, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (18, 63, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (19, 64, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (20, 65, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (21, 66, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (22, 67, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (23, 68, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (24, 69, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (25, 70, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (26, 71, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (27, 72, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (28, 73, CAST(8.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (29, 50, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (30, 51, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (31, 52, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (32, 53, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (33, 54, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (34, 55, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (35, 56, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (36, 57, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (37, 58, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (38, 59, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (39, 60, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (40, 61, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (41, 62, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (42, 63, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (43, 64, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (44, 65, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (45, 66, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (46, 67, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (47, 68, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (48, 69, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (49, 70, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (50, 71, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (51, 72, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
INSERT [dbo].[t_rates] ([id], [albumid], [value], [date], [userid]) VALUES (52, 73, CAST(7.0 AS Numeric(3, 1)), CAST(0xA2B7039F AS SmallDateTime), N'anonymous')
SET IDENTITY_INSERT [dbo].[t_rates] OFF
ALTER TABLE [dbo].[t_albums]  WITH CHECK ADD  CONSTRAINT [FK_t_albums_t_artists] FOREIGN KEY([artistid])
REFERENCES [dbo].[t_artists] ([id])
GO
ALTER TABLE [dbo].[t_albums] CHECK CONSTRAINT [FK_t_albums_t_artists]
GO
ALTER TABLE [dbo].[t_comments]  WITH CHECK ADD FOREIGN KEY([albumid])
REFERENCES [dbo].[t_albums] ([id])
GO
ALTER TABLE [dbo].[t_rates]  WITH CHECK ADD FOREIGN KEY([albumid])
REFERENCES [dbo].[t_albums] ([id])
GO
ALTER TABLE [dbo].[t_rates]  WITH CHECK ADD  CONSTRAINT [FK_t_rates_t_albums] FOREIGN KEY([albumid])
REFERENCES [dbo].[t_albums] ([id])
GO
ALTER TABLE [dbo].[t_rates] CHECK CONSTRAINT [FK_t_rates_t_albums]
GO
USE [master]
GO
ALTER DATABASE [AppDB] SET  READ_WRITE 
GO


update t_rates set value = case when value = 7 then 3 else round(value/2,0) end
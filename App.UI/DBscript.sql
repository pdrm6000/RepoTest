USE [AppMusic]
GO
/****** Object:  Table [dbo].[t_artists]    Script Date: 12/03/2012 20:39:52 ******/
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
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[t_rates]    Script Date: 12/03/2012 20:39:53 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t_rates](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[albumid] [int] NOT NULL,
	[rate] [numeric](3, 1) NOT NULL,
 CONSTRAINT [PK_t_rates] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[t_albums]    Script Date: 12/03/2012 20:39:51 ******/
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
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  ForeignKey [FK_t_albums_t_artists]    Script Date: 12/03/2012 20:39:51 ******/
ALTER TABLE [dbo].[t_albums]  WITH CHECK ADD  CONSTRAINT [FK_t_albums_t_artists] FOREIGN KEY([artistid])
REFERENCES [dbo].[t_artists] ([id])
GO
ALTER TABLE [dbo].[t_albums] CHECK CONSTRAINT [FK_t_albums_t_artists]
GO
/****** Object:  ForeignKey [FK_t_rates_t_albums]    Script Date: 12/03/2012 20:39:53 ******/
ALTER TABLE [dbo].[t_rates]  WITH CHECK ADD  CONSTRAINT [FK_t_rates_t_albums] FOREIGN KEY([albumid])
REFERENCES [dbo].[t_albums] ([id])
GO
ALTER TABLE [dbo].[t_rates] CHECK CONSTRAINT [FK_t_rates_t_albums]
GO

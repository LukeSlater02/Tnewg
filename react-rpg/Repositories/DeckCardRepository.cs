using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Mvc;
using Tnewg.Models;
using Tnewg.Utils;

namespace Tnewg.Repositories
{
    public class DeckCardRepository : BaseRepository, IDeckCardRepository
    {
        public DeckCardRepository(IConfiguration configuration) : base(configuration) { }

        public List<DeckCard> GetAllByDeckId(int id)
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"SELECT DeckCard.Id as Id, Card.Id as CardId, Damage, HitPoints, BackgroundColor, BorderColor, Cost, StatsBackgroundColor, Image, Name FROM DeckCard JOIN Card on CardId = Card.Id WHERE DeckId = @Id ORDER BY Name ASC";
                    cmd.Parameters.AddWithValue("@Id", id);
                    using var reader = cmd.ExecuteReader();
                    {
                        List<DeckCard> cardList = new();
                        while (reader.Read())
                        {
                            DeckCard card = new DeckCard()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Card = new()
                                {
                                    Id = DbUtils.GetInt(reader, "CardId"),
                                    Name = reader.GetString(reader.GetOrdinal("Name")),
                                    Damage = reader.GetInt32(reader.GetOrdinal("Damage")),
                                    HitPoints = reader.GetInt32(reader.GetOrdinal("HitPoints")),
                                    Cost = reader.GetInt32(reader.GetOrdinal("Cost")),
                                    BackgroundColor = reader.GetString(reader.GetOrdinal("BackgroundColor")),
                                    BorderColor = reader.GetString(reader.GetOrdinal("BorderColor")),
                                    StatsBackgroundColor = reader.GetString(reader.GetOrdinal("StatsBackgroundColor")),
                                    Image = reader.GetString(reader.GetOrdinal("Image"))
                                }
                            };
                            cardList.Add(card);
                        }
                        return cardList;
                    }
                }
            }
        }

        bool HandleSqlException(SqlException e)
        {
            if (e.Message.Contains("The transaction ended in the trigger. The batch has been aborted."))
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        public bool Add(DeckCard dc)
        {
            using var conn = Connection;
            {
                bool cardMax = false;
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"EXEC sp_executeSQL
                                        N'create trigger LimitCardsInDeck
                                        on DeckCard
                                        after insert
                                        as
                                            declare @tableCount int
                                            select @tableCount = Count(DeckId)
                                            from DeckCard
                                            where DeckId = @deckId

                                            if @tableCount > 20
                                            begin
                                                rollback
                                            end',
                                        N'@deckIdVar int',
                                          @deckIdVar = @deckId
                                        INSERT INTO DeckCard(CardId, DeckId)
                                        VALUES(@cardId, @deckId)
                                        drop trigger LimitCardsInDeck";
                    cmd.Parameters.AddWithValue("@cardId", dc.CardId);
                    cmd.Parameters.AddWithValue("@deckId", dc.DeckId);
                    try
                    {
                        cmd.ExecuteNonQuery();
                    }
                    catch (SqlException dex)
                    {
                        cardMax = HandleSqlException((SqlException)dex);
                    }
                }
                return cardMax;
            }
        }

        public int GetCardsInDeckCount(int id)
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"SELECT count(CardId) FROM DeckCard WHERE DeckId = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    int count = (int)cmd.ExecuteScalar();
                    return count;
                }
            }
        }

        public void Delete(int id)
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"DELETE FROM DeckCard WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(DeckCard dc, int id)
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"UPDATE DeckCard
                                    SET CardId = @CardId,
                                        DeckId = @DeckId";
                    cmd.Parameters.AddWithValue("@CardId", dc.CardId);
                    cmd.Parameters.AddWithValue("@DeckId", dc.DeckId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

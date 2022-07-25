using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tnewg.Models;
using Tnewg.Utils;

namespace Tnewg.Repositories
{
    public class DeckCardRepository : BaseRepository, IDeckCardRepository
    {
        public DeckCardRepository(IConfiguration configuration) : base(configuration) { }

        public List<Card> GetAllByDeckId(int id)
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"SELECT Card.Id as CardId, Damage, HitPoints, BackgroundColor, BorderColor, Cost, StatsBackgroundColor, Image, Name FROM DeckCard JOIN Card on CardId = Card.Id WHERE DeckId = @Id ";
                    cmd.Parameters.AddWithValue("@Id", id);
                    var reader = cmd.ExecuteReader();
                    {
                        List<Card> cardList = new();
                        while (reader.Read())
                        {
                            Card card = new()
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
                            };
                            cardList.Add(card);
                        }
                        return cardList;
                    }
                }
            }
        }

        public void Add(DeckCard dc)
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"INSERT INTO DeckCard(CardId, DeckId)
                                        VALUES(@CardId, @DeckId)";
                    cmd.Parameters.AddWithValue("@CardId", dc.CardId);
                    cmd.Parameters.AddWithValue("@DeckId", dc.DeckId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int cardId, int deckId)
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"DELETE FROM DeckCard WHERE CardId = @CardId AND DeckId = @DeckId";
                    cmd.Parameters.AddWithValue("@CardId", cardId);
                    cmd.Parameters.AddWithValue("@DeckId", deckId);
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

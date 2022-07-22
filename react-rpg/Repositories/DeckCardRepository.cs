using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
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
                    cmd.CommandText = @"SELECT Id, CardId, DeckId FROM DeckCard WHERE DeckId = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);
                    var reader = cmd.ExecuteReader();
                    {
                        List<DeckCard> deckCardList = new();
                        while (reader.Read())
                        {
                            DeckCard deckCard = new()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                DeckId = DbUtils.GetInt(reader, "DeckId"),
                                CardId = DbUtils.GetInt(reader, "CardId")
                            };
                            deckCardList.Add(deckCard);
                        }
                        return deckCardList;
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

        public void Delete(int id)
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"DELETE FROM DeckCard WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
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

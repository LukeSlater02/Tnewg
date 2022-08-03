using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tnewg.Models;
using Tnewg.Utils;

namespace Tnewg.Repositories
{
    public class DeckRepository : BaseRepository, IDeckRepository
    {
        public DeckRepository(IConfiguration configuration) : base(configuration) { }

        public List<Deck> GetAllByUser(int id)
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"SELECT MAX(Deck.Id) as Id, count(deckId) as CardCount, MAX(Name) as Name, MAX(BackgroundImage) as BackgroundImage, MAX(UserProfileId) as UserProfileId FROM Deck LEFT JOIN DeckCard on Deck.Id = DeckId WHERE UserProfileId = @id GROUP BY Deck.Id";
                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    List<Deck> deckList = new();
                    while (reader.Read())
                    {
                        deckList.Add(new Deck()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                            BackgroundImage = DbUtils.GetString(reader, "BackgroundImage"),
                            CardCount = DbUtils.GetInt(reader, "CardCount")
                        });
                    }
                    return deckList;
                }
            }
        }

        public void Add(Deck deck)
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"INSERT INTO Deck(Name, UserProfileId, BackgroundImage)
                                        VALUES(@Name, @UserProfileId, @BackgroundImage)";
                    cmd.Parameters.AddWithValue("@Name", deck.Name);
                    cmd.Parameters.AddWithValue("@UserProfileId", deck.UserProfileId);
                    cmd.Parameters.AddWithValue("@BackgroundImage", deck.BackgroundImage);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Deck deck, int id)
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"UPDATE Deck
                                        Set Name = @Name
                                        WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.Parameters.AddWithValue("@Name", deck.Name);
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
                    cmd.CommandText = @"DELETE FROM Deck WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

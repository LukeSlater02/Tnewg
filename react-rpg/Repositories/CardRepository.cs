using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tnewg.Models;
using Tnewg.Utils;

namespace Tnewg.Repositories
{
    public class CardRepository : BaseRepository, ICardRepository
    {
        public CardRepository(IConfiguration configuration) : base(configuration) { }

        public List<Card> GetAll()
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"SELECT Id, Name, Damage, HitPoints, Cost,
                    BackgroundColor, BorderColor, StatsBackgroundColor, Image
                    FROM Card ORDER BY Name ASC";
                    var reader = cmd.ExecuteReader();
                    {
                        List<Card> cardList = new();
                        while (reader.Read())
                        {
                            Card card = new()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
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

        public List<Card> Search(string input)
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"SELECT Id, Name, Damage, HitPoints, Cost,
                    BackgroundColor, BorderColor, StatsBackgroundColor, Image
                    FROM Card
                    WHERE Name LIKE @input ORDER BY Name ASC";
                    cmd.Parameters.AddWithValue("@input", $"%{input}%");
                    var reader = cmd.ExecuteReader();
                    {
                        List<Card> cardList = new();
                        while (reader.Read())
                        {
                            Card card = new()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
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

        public Card GetById(int id)
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"SELECT Id, Name, Damage, HitPoints, Cost,
                    BackgroundColor, BorderColor, StatsBackgroundColor, Image
                    FROM Card WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Id", id);
                    var reader = cmd.ExecuteReader();
                    {
                        Card card = null;
                        if (reader.Read())
                        {
                            card = new()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                                Damage = reader.GetInt32(reader.GetOrdinal("Damage")),
                                HitPoints = reader.GetInt32(reader.GetOrdinal("HitPoints")),
                                Cost = reader.GetInt32(reader.GetOrdinal("Cost")),
                                BackgroundColor = reader.GetString(reader.GetOrdinal("BackgroundColor")),
                                BorderColor = reader.GetString(reader.GetOrdinal("BorderColor")),
                                StatsBackgroundColor = reader.GetString(reader.GetOrdinal("StatsBackgroundColor")),
                                Image = reader.GetString(reader.GetOrdinal("Image"))
                            };
                        }
                        return card;
                    }
                }
            }
        }

        public void Add(Card card)
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"INSERT INTO Card(Name, Damage, HitPoints, Cost, BackgroundColor, BorderColor, StatsBackgroundColor, Image)
                      VALUES(@Name, @Damage, @HitPoints, @Cost, @BackgroundColor, @BorderColor, @StatsBackgroundColor, @Image)";
                    cmd.Parameters.AddWithValue("@Name", card.Name);
                    cmd.Parameters.AddWithValue("@Damage", card.Damage);
                    cmd.Parameters.AddWithValue("@HitPoints", card.HitPoints);
                    cmd.Parameters.AddWithValue("@Cost", card.Cost);
                    cmd.Parameters.AddWithValue("@BackgroundColor", card.BackgroundColor);
                    cmd.Parameters.AddWithValue("@BorderColor", card.BorderColor);
                    cmd.Parameters.AddWithValue("@StatsBackgroundColor", card.StatsBackgroundColor);
                    cmd.Parameters.AddWithValue("@Image", card.Image);

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
                    cmd.CommandText = @"DELETE FROM Card WHERE Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Card card, int id)
        {
            using var conn = Connection;
            {
                conn.Open();
                using var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"UPDATE Card
                                    SET Name = @Name,
                                    Damage = @Damage,
                                    HitPoints = @HitPoints,
                                    BackgroundColor = @BackgroundColor,
                                    BorderColor = @BorderColor,
                                    StatsBackgroundColor = @StatsBackgroundColor,
                                    Image = @Image,
                                    Cost = @Cost
                                    WHERE Id = @Id";
                    cmd.Parameters.AddWithValue("@Name", card.Name);
                    cmd.Parameters.AddWithValue("@Damage", card.Damage);
                    cmd.Parameters.AddWithValue("@HitPoints", card.HitPoints);
                    cmd.Parameters.AddWithValue("@Cost", card.Cost);
                    cmd.Parameters.AddWithValue("@BackgroundColor", card.BackgroundColor);
                    cmd.Parameters.AddWithValue("@BorderColor", card.BorderColor);
                    cmd.Parameters.AddWithValue("@StatsBackgroundColor", card.StatsBackgroundColor);
                    cmd.Parameters.AddWithValue("@Image", card.Image);
                    cmd.Parameters.AddWithValue("@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}

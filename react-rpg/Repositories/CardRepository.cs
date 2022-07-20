using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tnewg.Models;

namespace Tnewg.Repositories
{
    public class CardRepository : BaseRepository, ICardRepository
    {
        public CardRepository(IConfiguration configuration) : base(configuration) { }

        public List<Card> GetAll()
        {
            var conn = Connection;
            {
                conn.Open();
                var cmd = conn.CreateCommand();
                {
                    cmd.CommandText = @"SELECT Id, Name, Damage, HitPoints, Cost,
                    BackgroundColor, BorderColor, StatsBackgroundColor, Image
                    FROM Card";
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
                        conn.Close();
                        return cardList;
                    }
                }
            }
        }
    }
}

using System.Collections.Generic;
using Tnewg.Models;

namespace Tnewg.Repositories
{
    public interface ICardRepository
    {
        List<Card> GetAll();
        void Add(Card card);
        void Delete(int id);
        void Update(Card card, int id);
    }
}
using System.Collections.Generic;
using Tnewg.Models;

namespace Tnewg.Repositories
{
    public interface IDeckRepository
    {
        void Add(Deck deck);
        void Delete(int id);
        List<Deck> GetAllByUser(int id);
        void Update(Deck deck, int id);
    }
}
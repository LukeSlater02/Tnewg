using System.Collections.Generic;
using Tnewg.Models;

namespace Tnewg.Repositories
{
    public interface IDeckCardRepository
    {
        void Add(DeckCard dc);
        void Delete(int id);
        List<Card> GetAllByDeckId(int id);
        void Update(DeckCard dc, int id);
    }
}
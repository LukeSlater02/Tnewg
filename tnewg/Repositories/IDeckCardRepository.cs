using System.Collections.Generic;
using Tnewg.Models;

namespace Tnewg.Repositories
{
    public interface IDeckCardRepository
    {
        void Add(DeckCard dc);
        void Delete(int cardId, int deckId);
        List<Card> GetAllByDeckId(int id);
        void Update(DeckCard dc, int id);
    }
}
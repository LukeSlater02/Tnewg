using System.Collections.Generic;
using Tnewg.Models;

namespace Tnewg.Repositories
{
    public interface ICardRepository
    {
        List<Card> GetAll();
    }
}
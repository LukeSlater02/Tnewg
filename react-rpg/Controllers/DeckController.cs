using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Tnewg.Models;
using Tnewg.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tnewg.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeckController : ControllerBase
    {
        private readonly IDeckRepository _deckRepository;

        public DeckController(IDeckRepository deckRepository)
        {
            _deckRepository = deckRepository;
        }


        // GET: api/<DeckController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<DeckController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_deckRepository.GetAllByUser(id));
        }

        // POST api/<DeckController>
        [HttpPost]
        public void Post(Deck deck)
        {
            _deckRepository.Add(deck);
        }

        // PUT api/<DeckController>/5
        [HttpPut("{id}")]
        public void Put(Deck deck, int id)
        {
            _deckRepository.Update(deck, id);
        }

        // DELETE api/<DeckController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _deckRepository.Delete(id);
        }
    }
}

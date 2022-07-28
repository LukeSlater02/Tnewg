using Microsoft.AspNetCore.Mvc;
using Tnewg.Repositories;
using Tnewg.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tnewg.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DeckCardController : ControllerBase
    {
        private readonly IDeckCardRepository _deckCardRepository;

        public DeckCardController(IDeckCardRepository deckCardRepository)
        {
            _deckCardRepository = deckCardRepository;
        }


        // GET: api/<DeckCardController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<DeckCardController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_deckCardRepository.GetAllByDeckId(id));
        }

        // POST api/<DeckCardController>
        [HttpPost]
        public bool Post(DeckCard dc)
        {
           return _deckCardRepository.Add(dc);
        }

        // PUT api/<DeckCardController>/5
        [HttpPut("{id}")]
        public void Put(int id, DeckCard dc)
        {
            _deckCardRepository.Update(dc, id);
        }

        // DELETE api/<DeckCardController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _deckCardRepository.Delete(id);
        }
    }
}

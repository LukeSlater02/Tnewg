using Microsoft.AspNetCore.Mvc;
using Tnewg.Repositories;
using Tnewg.Models;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tnewg.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly ICardRepository _cardRepository;

        public CardController(ICardRepository cardRepository)
        {
            _cardRepository = cardRepository;
        }


        // GET: api/<CardController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_cardRepository.GetAll());
        }

        // GET api/<CardController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Ok(_cardRepository.GetById(id));
        }

        [HttpGet("search")]
        public IActionResult Search(string q)
        {
            return Ok(_cardRepository.Search(q));
        }

        // POST api/<CardController>
        [HttpPost]
        public void Post(Card card)
        {
            _cardRepository.Add(card);  
        }

        // PUT api/<CardController>/5
        [HttpPut("{id}")]
        public void Put(Card card, int id)
        {
            _cardRepository.Update(card, id);
        }

        // DELETE api/<CardController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _cardRepository.Delete(id);
        }
    }
}

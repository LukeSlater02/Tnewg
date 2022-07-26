using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using Tnewg.Models;
using Tnewg.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tnewg.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DeckController : ControllerBase
    {
        private readonly IDeckRepository _deckRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public DeckController(IDeckRepository deckRepository, IUserProfileRepository userProfileRepository)
        {
            _deckRepository = deckRepository;
            _userProfileRepository = userProfileRepository;
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


        // GET: api/<DeckController>
        [HttpGet]
        public IActionResult Get()
        {
            var userProfileId = GetCurrentUserProfile().Id;
            return Ok(_deckRepository.GetAllByUser(userProfileId));
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

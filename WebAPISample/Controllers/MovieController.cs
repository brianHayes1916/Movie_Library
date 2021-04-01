using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Movie))]
        public IActionResult Get()
        {
            List<Movie> allMovies = _context.Movies.Select(movie => movie).ToList();
            return Ok(allMovies);
        }

        // GET api/movie/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Movie))]
        public IActionResult Get(int id)
        {
            Movie movie = _context.Movies.Where(m => m.MovieId == id).FirstOrDefault();

            return Ok(movie);
        }

        // POST api/movie
        [HttpPost]
        public IActionResult Post([FromBody]Movie value)
        {
            // Create movie in db logic
            return Ok();
        }

        // PUT api/movie
        [HttpPut]
        public IActionResult Put([FromBody] Movie movie)
        {
            // Update movie in db logic
            return Ok();
        }

        // DELETE api/movie/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Delete movie from db logic
            return Ok();
        }
    }
}
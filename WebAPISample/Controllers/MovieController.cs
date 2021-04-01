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
    [Route("api/[movie]")]
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
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Movie))]
        public IActionResult Post([FromBody]Movie movieToAdd)
        {
            _context.Movies.Add(movieToAdd);
            _context.SaveChanges();

            return Created("api/movie", movieToAdd);
        }

        // PUT api/movie
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Movie))]
        public IActionResult Put([FromBody] Movie movie)
        {
            Movie movieToUpdate = _context.Movies.Where(m => m.MovieId == movie.MovieId).FirstOrDefault();
            movieToUpdate.Director = movie.Director;
            movieToUpdate.Title = movie.Title;
            _context.Update(movieToUpdate);
            _context.SaveChanges();
            return Ok(movie);
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
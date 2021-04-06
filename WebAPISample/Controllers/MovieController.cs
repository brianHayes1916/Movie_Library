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
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(Movie))]
        public IActionResult Post([FromBody]Movie movieToAdd)
        {
            _context.Movies.Add(movieToAdd);
            _context.SaveChanges();

            return Created("api/controller", movieToAdd);
        }

        // PUT api/movie
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Movie))]
        public IActionResult Put(int id, [FromBody] Movie movie)
        {
            try
            {
                Movie movieToUpdate = _context.Movies.Where(m => m.MovieId == id).FirstOrDefault();
                movieToUpdate.Director = movie.Director;
                movieToUpdate.Title = movie.Title;
                movieToUpdate.Genre = movie.Genre;
                movieToUpdate.Image = movie.Image;
                _context.Update(movieToUpdate);
                _context.SaveChanges();
                return Ok(movie);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Something went wrong: {ex}");
                return StatusCode(400, "Bad Request, Movie Not found");
            }
            
        }

        // DELETE api/movie/5
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Movie))]
        public IActionResult Delete(int id)
        {
            Movie movieToDelete = _context.Movies.Where(m => m.MovieId == id).FirstOrDefault();
            _context.Remove(movieToDelete);
            _context.SaveChanges();
            return Ok(movieToDelete);
        }
    }
}
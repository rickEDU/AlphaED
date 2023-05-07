function availableMovies (movies, age){
    const allowedMovies = movies.filter((movies)=>{
        return movies.minAge < age;
    })
    return allowedMovies;
}

module.exports =  availableMovies ;
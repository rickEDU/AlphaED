const availableMovies = require('../main');


describe("Verifica se a função está funcionando corretamente:", ()=>{
    test('verifica se a função availableMovies esta sendo chamada no teste:', ()=>{
        const mockFn = jest.fn(availableMovies);
        const movies =[];
        const age = 0;
        mockFn(movies, age);
        expect(mockFn).toHaveBeenCalled();
    });
    test('verifica os parâmetros da função estão sendo passados corretamente availableMovies:', ()=>{
        const mockFn = jest.fn(availableMovies);
        const movies =[];
        const age = 0;
        mockFn(movies, age);
        expect(mockFn).toHaveBeenCalledWith([], 0);
    });
});

describe("teste o retorno de availableMovies com parâmetros inusitados", ()=>{
    test('verifica com o movies sendo um array vazio:', ()=>{
        const movies =[];
        const age = 19;
        const expected = [];
        expect(availableMovies(movies, age)).toEqual(expected);
    })
    test('verifica o resultado com o age negativo:', ()=>{
        const movies =[
            {title: "Filme 1", minAge: 18},
            {title: "Filme 2", minAge: 12},
            {title: "Filme 3", minAge: 10},
        ];
        const age = -1;
        const expected = [];
        expect(availableMovies(movies, age)).toEqual(expected);
    })
    test('verifica o resultado com o age = 0:', ()=>{
        const movies =[
            {title: "Filme 1", minAge: 18},
            {title: "Filme 2", minAge: 12},
            {title: "Filme 3", minAge: 10},
        ];
        const age = 0;
        const expected = [];
        expect(availableMovies(movies, age)).toEqual(expected);
    })
});

describe("teste se availableMovies está retornando corretamente com valores válidos:", ()=>{
    test('verifica o retorno da função está correto com o age = 21:', ()=>{
        const movies =[
            {title: "Filme 1", minAge: 18},
            {title: "Filme 2", minAge: 12},
            {title: "Filme 3", minAge: 10},
            {title: "Filme 4", minAge: 21},
        ];
        const age = 21;
        const expected = [
            {title: "Filme 1", minAge: 18},
            {title: "Filme 2", minAge: 12},
            {title: "Filme 3", minAge: 10},
        ];
        expect(availableMovies(movies, age)).toEqual(expected);
    })
    test('verifica o retorno da função está correto com o age = 15:', ()=>{
        const movies =[
            {title: "Filme 1", minAge: 18},
            {title: "Filme 2", minAge: 12},
            {title: "Filme 3", minAge: 10},
        ];
        const age = 15;
        const expected = [
            {title: "Filme 2", minAge: 12},
            {title: "Filme 3", minAge: 10},
        ];
        expect(availableMovies(movies, age)).toEqual(expected);
    })
    test('verifica o retorno da função está correto com o age = 11:', ()=>{
        const movies =[
            {title: "Filme 1", minAge: 18},
            {title: "Filme 2", minAge: 12},
            {title: "Filme 3", minAge: 10},
        ];
        const age = 11;
        const expected = [
            {title: "Filme 3", minAge: 10},
        ];
        expect(availableMovies(movies, age)).toEqual(expected);
    })
    test('verifica o retorno da função está correto com o age = 10:', ()=>{
        const movies =[
            {title: "Filme 1", minAge: 18},
            {title: "Filme 2", minAge: 12},
            {title: "Filme 3", minAge: 10},
        ];
        const age = 10;
        const expected = [];
        expect(availableMovies(movies, age)).toEqual(expected);
    })
})




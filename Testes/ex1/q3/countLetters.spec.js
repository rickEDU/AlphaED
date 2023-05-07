const countLetters = require("./countLetters");

describe("Testes para entradas inválidas", ()=>{
    test("Retorna objeto com erro quando a entrada não é uma string", () => {
        expect(countLetters(123)).toEqual({ error: "Invalid input" });
    });
}) 


describe("Testes para casos base", ()=>{
    test("Retorna contagens em 0 quando a entrada é  uma string vazia", () => {
        expect(countLetters("")).toEqual({ uppercase: 0, lowercase: 0 });
    });
});


describe("Testes para casos gerais", ()=>{
    test("Conta corretamente letras maiúsculas e minúsculas", () => {
        expect(countLetters("AbCdEf")).toEqual({ uppercase: 3, lowercase: 3 });
    });
    test("Conta corretamente quando a entrada é só letras maiúsculas", () => {
        expect(countLetters("ABC")).toEqual({ uppercase: 3, lowercase: 0 });
    });
        
    test("Conta corretamente quando a entrada é só letras minúsculas", () => {
        expect(countLetters("abc")).toEqual({ uppercase: 0, lowercase: 3 });
    });
        
    test("Conta corretamente quando a entrada tem caracteres não-letra", () => {
        expect(countLetters("A1b2C3")).toEqual({ uppercase: 3, lowercase: 2 });
    });
});

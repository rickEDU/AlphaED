const soma = require('./main');

test('verifica a soma 1:', ()=>{
    expect(soma(20, 10)).toBe(30);
})

test('verifica a soma 2:', ()=>{
    expect(soma(-10, 10)).toBe(0);
})

test('verifica a soma 3:', ()=>{
    expect(soma(2,2)).toBe(4);
})


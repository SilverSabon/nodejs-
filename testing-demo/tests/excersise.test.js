const lib = require('../exercise1');


describe('fuzzbuzz function', () => {
    it('should throw an exception if its not a number ,', () => {

        expect(() => { lib.fizzBuzz('a') }).toThrow();
        expect(() => { lib.fizzBuzz(null) }).toThrow();
        expect(() => { lib.fizzBuzz(undefined) }).toThrow();
        expect(() => { lib.fizzBuzz({}) }).toThrow();

    });
    it('should return FizzBuzz if it was devisibel by 3 and 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });
    it('should return Fizz if it was only devisibel by 3 ', () => {
        const result =lib.fizzBuzz(9) ;
        expect(result).toBe('Fizz');

    });

    it('should return Buzz if it was only devisibel by 5 ', () => {
        const result =lib.fizzBuzz(5) ;
        expect(result).toBe('Buzz');
    });

    it('should return FizzBuzzyyy if it was  not devisibel by 5 or 3 ', () => {
        const result =lib.fizzBuzz(1) ;
        expect(result).toBe(1);

    });
});
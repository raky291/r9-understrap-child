import route from './router';

describe('router', () => {
    it('route function expect to have been called', () => {
        // arrange
        document.body.classList.add('home');
        const callback = jest.fn();

        // act
        route('.home', () => callback());

        // assert
        expect(callback).toHaveBeenCalled();
    });

    it('route function expect not to have been called', () => {
        // arrange
        document.body.classList.add('home');
        const callback = jest.fn();

        // act
        route('.about', () => callback());

        // assert
        expect(callback).not.toHaveBeenCalled();
    });
});

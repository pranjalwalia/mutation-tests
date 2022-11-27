const { expect } = require('chai');
const { Stack } = require('../src/stack');

describe('stack tests', () => {
    const stack = new Stack();
    const ngeRightStack = new Stack();
    const histogram = new Stack();
    const sorter = new Stack();

    describe('.push(element)', () => {
        it('push elements to the top ', () => {
            stack.push(1);
            stack.push(2);
            stack.push(3);
        });
        it('should have size 3', () => expect(stack.size()).to.equal(3));
        it('should not be empty', () =>
            expect(stack.isEmpty()).to.equal(false));
    });

    describe('Stack Next Greater Element to the right', () => {
        it('prints the next greater array', () => {
            ngeRightStack.push(1);
            ngeRightStack.push(2);
            ngeRightStack.push(3);
            ngeRightStack.push(4);
            ngeRightStack.push(5);
            expect(ngeRightStack.printNGE()).to.deep.equal({
                1: 2,
                2: 3,
                3: 4,
                4: 5,
                5: -1
            });
        });
    });

    describe('.toArray()', () => {
        it('should be non empty array', () =>
            expect(stack.toArray().length).to.equal(3));
        it('returns an array', () => {
            expect(stack.toArray()).to.deep.equal([1, 2, 3]);
        });
    });

    describe('.size()', () => {
        it('should not be empty', () =>
            expect(stack.isEmpty()).to.equal(false));
        it('have length of 3', () => {
            expect(stack.size()).to.equal(3);
        });
    });

    describe('.histogram()', () => {
        it('compute the max rectangular area correctly', () => {
            let hist = [6, 2, 5, 4, 5, 1, 6];
            hist.forEach((current) => histogram.push(current));
            expect(histogram.computeHistogram()).to.equal(12);
        });
    });

    describe('.peek()', () => {
        it('should not be empty', () =>
            expect(stack.isEmpty()).to.equal(false));
        it('top element', () => {
            expect(stack.peek()).to.equal(3);
        });
    });

    describe('Stack.fromArray(list)', () => {
        it('creates a stack from an existing array', () => {
            const s = Stack.fromArray([1, 2, 3]);
            expect(s.peek()).to.equal(3);
            expect(s.size()).to.equal(3);
        });
    });

    describe('.sortStack()', () => {
        it('sorts the stack', () => {
            sorter.push(34);
            sorter.push(3);
            sorter.push(31);
            sorter.push(98);
            sorter.push(92);
            sorter.push(23);

            expect(sorter.sortStack()).to.deep.equal([3, 23, 31, 34, 92, 98]);
        });
    });

    describe('.isEmpty()', () => {
        it('not be empty', () => {
            expect(stack.isEmpty()).to.equal(false);
        });
    });

    describe('.slidingMaxOfKSubarrays()', () => {
        it('reverses the stack using a shallow copy', () => {
            let a = [9, 7, 2, 4, 6, 8, 2, 1, 5];
            let k = 3;
            a.forEach((curr) => sorter.push(curr));
            expect(sorter.slidingMaxOfKSubarrays(k)).to.deep.equal([
                9, 7, 6, 8, 8, 8, 5
            ]);
        });
    });

    describe('.pop()', () => {
        it('pop the elements', () => {
            expect(stack.pop()).to.equal(3);
            expect(stack.pop()).to.equal(2);
        });
    });
});

const { expect } = require('chai');
const { Queue } = require('../src/queue');

describe('Queue tests', () => {
    let queue;

    describe('new Queue()', () => {
        it('empty queue', () => {
            queue = new Queue();
        });

        it('should be empty', () => {
            expect(queue.isEmpty()).to.equal(true);
        });
    });

    describe('.fromArray(list)', () => {
        const q = Queue.fromArray([3, 2, 1]);
        it('creates a queue from an existing array', () => {
            expect(q.front()).to.equal(3);
            expect(q.size()).to.equal(3);
        });
        it('validate size to be 3', () => expect(q.size()).to.equal(3));
        it('validate not empty', () => expect(q.isEmpty()).to.equal(false));
    });

    describe('.enqueue(element)', () => {
        it('should enqueue 3 elements to the stack', () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.push(3);
        });
        it('should assert size to be 3', () =>
            expect(queue.size()).to.equal(3));
    });

    describe('.reverse()', () => {
        let rq = new Queue();
        rq.enqueue(1);
        rq.enqueue(2);
        rq.enqueue(3);
        rq.enqueue(4);
        it('validate size to be 4', () => expect(rq.size()).to.equal(4));
        it('reverse the queue', () => {
            expect(rq.toArray()).to.deep.equal([1, 2, 3, 4]);

            rq.reverse();

            expect(rq.toArray()).to.deep.equal([4, 3, 2, 1]);
        });
    });

    describe('.size()', () => {
        it('should not be empty', () =>
            expect(queue.isEmpty()).to.equal(false));
        it('size 3', () => {
            expect(queue.size()).to.equal(3);
        });
    });

    describe('.front()', () => {
        it('should not be empty', () =>
            expect(queue.isEmpty()).to.equal(false));

        it('should get the front', () => {
            expect(queue.front()).to.equal(1);
        });
    });

    describe('.sort()', () => {
        it('sort the queue', () => {
            const elements = [5, 4, 3, 2, 1];
            const sq = Queue.fromArray(elements);

            expect(sq.toArray()).to.deep.equal(elements);

            sq.sort();

            expect(sq.toArray()).to.deep.equal([1, 2, 3, 4, 5]);
        });
    });

    describe('.back()', () => {
        it('should not be empty', () =>
            expect(queue.isEmpty()).to.equal(false));

        it('back element', () => {
            expect(queue.back()).to.equal(3);
        });
    });

    describe('.reverseFirstK()', () => {
        it('should return false for empty array', () => {
            const rq = new Queue();
            const k = 5;
            const res = rq.reverseFirstK(k);
            expect(res).to.equal(false);
        });

        it('should return false for k > number of elements', () => {
            const rq = new Queue();
            rq.push(1);
            rq.push(2);
            rq.push(3);

            const k = 5;

            const res = rq.reverseFirstK(k);
            expect(res).to.equal(false);
        });

        it('reverse in groups of k and return true', () => {
            const rq = new Queue();
            rq.push(10);
            rq.push(20);
            rq.push(30);
            rq.push(40);
            rq.push(50);
            rq.push(60);
            rq.push(70);
            rq.push(80);
            rq.push(90);
            rq.push(100);

            const k = 5;

            expect(rq.toArray()).to.deep.equal([
                10, 20, 30, 40, 50, 60, 70, 80, 90, 100
            ]);

            const res = rq.reverseFirstK(k);
            expect(res).to.equal(true);

            expect(rq.toArray()).to.deep.equal([
                50, 40, 30, 20, 10, 60, 70, 80, 90, 100
            ]);
        });
    });

    describe('.isEmpty()', () => {
        it('should not have size as zero', () => {
            expect(queue.size()).to.not.equal(0);
        });
        it('not empty', () => {
            expect(queue.isEmpty()).to.equal(false);
        });
    });

    describe('.clone()', () => {
        it('clone', () => {
            queue.dequeue();

            const clone = queue.clone();
            clone.dequeue();

            expect(clone.front()).to.equal(3);
            expect(clone.size()).to.equal(1);
            expect(queue.front(8));

            expect(queue.isEmpty()).to.equal(false);
            expect(queue.size()).to.not.equal(0);
            expect(queue.size()).to.equal(2);
        });
    });

    describe('.interleave()', () => {
        const wrongElements = [1, 2, 3, 4, 5];
        const goodElements = [1, 2, 3, 4];
        const expectedResult = [1, 3, 2, 4];

        it('should abort operations on an odd length queue', () => {
            const q = Queue.fromArray(wrongElements);
            const res = q.interleave();
            expect(res).to.equal(false);
        });

        it('should interleave elements of odd and even positions', () => {
            const q = Queue.fromArray(goodElements);
            expect(q.toArray()).to.deep.equal(goodElements);

            const res = q.interleave();
            expect(res).to.equal(true);

            expect(q.toArray()).to.deep.equal(expectedResult);
        });
    });

    describe('toArray()', () => {
        it('should not be empty', () =>
            expect(queue.isEmpty()).to.equal(false));
        it('queue into an array', () => {
            expect(queue.toArray()).to.deep.equal([2, 3]);
        });
    });

    describe('dequeue()', () => {
        it('should not be empty', () =>
            expect(queue.isEmpty()).to.equal(false));
        it('dequeue all elements', () => {
            expect(queue.dequeue()).to.be.equal(2);
            expect(queue.pop()).to.be.equal(3);
        });
    });

    describe('.clear()', () => {
        it('clear the queue', () => {
            queue.enqueue(1);
            queue.enqueue(2);
            queue.enqueue(3);

            queue.clear();

            expect(queue.dequeue()).to.be.equal(null);
            expect(queue.front()).to.be.equal(null);
            expect(queue.back()).to.be.equal(null);
            expect(queue.size()).to.be.equal(0);
            expect(queue.isEmpty()).to.be.equal(true);
        });
    });
});

const { expect } = require('chai');
const { LinkedList, LinkedListNode } = require('../src/linkedList');

describe('linkedList tests', () => {
    describe('.head()', () => {
        it('get the head node', () => {
            const linkedList = new LinkedList();
            expect(linkedList.head()).to.equal(null);
        });
    });

    describe('.insertFirst(value)', () => {
        it('insert a node at the beginning', () => {
            const linkedList = new LinkedList();
            linkedList.insertFirst(10);
            const oldHead = linkedList.head();
            linkedList.insertFirst(20);

            expect(linkedList.head().getValue()).to.equal(20);
            expect(linkedList.head().getNext()).to.equal(oldHead);

            let count = 0;
            let head = linkedList.head();
            while (head) {
                count++;
                head = head.getNext();
            }

            expect(count).to.equal(2);
        });
    });

    describe('.count()', () => {
        it('get the count of nodes in the list', () => {
            const linkedList = new LinkedList();
            linkedList.insertFirst(1);
            linkedList.insertFirst(2);
            linkedList.insertFirst(3);
            linkedList.insertFirst(4);
            linkedList.insertFirst(5);
            expect(linkedList.count()).to.equal(5);
        });
    });

    describe('.isEmpty()', () => {
        it('checks if the list is empty', () => {
            const linkedList = new LinkedList();
            expect(linkedList.isEmpty()).to.equal(true);
        });
    });

    describe('.insertFirst(value)', () => {
        it('insert a node at the beginning', () => {
            const linkedList = new LinkedList();
            linkedList.insertFirst(10);
            const oldHead = linkedList.head();
            linkedList.insertFirst(20);

            expect(linkedList.head().getValue()).to.equal(20);
            expect(linkedList.head().getNext()).to.equal(oldHead);
            expect(linkedList.count()).to.equal(2);
        });
    });

    describe('.fromArray()', () => {
        it('convert the array into linked list in same order', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4]);
            expect(linkedList.count()).to.equal(4);

            let head = linkedList.head();
            const res = [1, 2, 3, 4];
            for (let i = 0; i < 4; i++) {
                expect(head.getValue()).to.equal(res[i]);
                head = head.getNext();
            }
        });

        it('throws an error for invalid array', () => {
            expect(() => LinkedList.fromArray())
                .to.throws(Error)
                .and.to.have.property(
                    'message',
                    'cannot create LinkedList from none-array values'
                );
        });
    });

    describe('.insertLast(value)', () => {
        it('insert a node at the ending', () => {
            const linkedList = new LinkedList();
            linkedList.insertLast(10);
            const head = linkedList.head();
            linkedList.insertLast(20);

            expect(linkedList.head().getValue()).to.equal(10);
            expect(linkedList.head().getNext().getValue()).to.equal(20);
            expect(linkedList.head()).to.equal(head);
            expect(linkedList.count()).to.equal(2);
        });
    });

    describe('.insertAt(position, value)', () => {
        it('Valid positive index in between', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            linkedList.insertAt(3, 8);

            expect(linkedList.count()).to.equal(6);

            let head = linkedList.head();
            const result = [1, 2, 3, 8, 4, 5];
            for (let i = 0; i < 6; i++) {
                expect(head.getValue()).to.equal(result[i]);
                head = head.getNext();
            }
        });

        it('index = 0', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            linkedList.insertAt(0, 8);

            expect(linkedList.count()).to.equal(6);

            let head = linkedList.head();
            const result = [8, 1, 2, 3, 4, 5];
            for (let i = 0; i < 6; i++) {
                expect(head.getValue()).to.equal(result[i]);
                head = head.getNext();
            }
        });

        it('Valid positive index in end', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            linkedList.insertAt(5, 8);

            expect(linkedList.count()).to.equal(6);

            let head = linkedList.head();
            const result = [1, 2, 3, 4, 5, 8];
            for (let i = 0; i < 6; i++) {
                expect(head.getValue()).to.equal(result[i]);
                head = head.getNext();
            }
        });

        it('throws an error position is not a valid number (negative)', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            expect(() => linkedList.insertAt(-1, 5))
                .to.throws(Error)
                .and.to.have.property(
                    'message',
                    '.insertAt expects a position num <= linked list size'
                );
        });

        it('throws an error position is not a valid number (exceed)', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            expect(() => linkedList.insertAt(6, 5))
                .to.throws(Error)
                .and.to.have.property(
                    'message',
                    '.insertAt expects a position num <= linked list size'
                );
        });

        it('throws an error position is not a valid number (non numerical)', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            expect(() => linkedList.insertAt('first', 5))
                .to.throws(Error)
                .and.to.have.property(
                    'message',
                    '.insertAt expects a position num <= linked list size'
                );
        });
    });

    describe('.removeFirst()', () => {
        it('remove the first node', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            const removed = linkedList.removeFirst();
            expect(removed.getValue()).to.equal(1);
            expect(linkedList.count()).to.equal(4);

            const res = [2, 3, 4, 5];
            let head = linkedList.head();
            for (let i = 0; i < 4; i++) {
                expect(head.getValue()).to.equal(res[i]);
                head = head.getNext();
            }
        });

        it('remove the first node in empty list', () => {
            const linkedList = new LinkedList();
            const removed = linkedList.removeFirst();
            expect(removed).to.equal(null);
        });
    });

    describe('.removeLast()', () => {
        it('in empty list', () => {
            const linkedList = new LinkedList();
            const removed = linkedList.removeLast();
            expect(removed).to.equal(null);
        });

        it('remove the last node in list with more than 1 nodes', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            const removed = linkedList.removeLast();
            expect(removed.getValue()).to.equal(5);
            expect(linkedList.count()).to.equal(4);

            const res = [1, 2, 3, 4];
            let head = linkedList.head();
            for (let i = 0; i < 4; i++) {
                expect(head.getValue()).to.equal(res[i]);
                head = head.getNext();
            }
        });

        it('remove the last node in list with 1 node', () => {
            const linkedList = LinkedList.fromArray([1]);
            const removed = linkedList.removeLast();
            expect(removed.getValue()).to.equal(1);
            expect(linkedList.count()).to.equal(0);
        });
    });

    describe('.removeAt(position)', () => {
        it('remove a node from between', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            const removed = linkedList.removeAt(3);
            expect(removed.getValue()).to.equal(4);
            expect(linkedList.count()).to.equal(4);

            const res = [1, 2, 3, 5];
            let head = linkedList.head();
            for (let i = 0; i < 4; i++) {
                expect(head.getValue()).to.equal(res[i]);
                head = head.getNext();
            }
        });

        it('remove a node from first', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            const removed = linkedList.removeAt(0);
            expect(removed.getValue()).to.equal(1);
            expect(linkedList.count()).to.equal(4);

            const res = [2, 3, 4, 5];
            let head = linkedList.head();
            for (let i = 0; i < 4; i++) {
                expect(head.getValue()).to.equal(res[i]);
                head = head.getNext();
            }
        });

        it('remove a node from last', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            const removed = linkedList.removeAt(4);
            expect(removed.getValue()).to.equal(5);
            expect(linkedList.count()).to.equal(4);

            const res = [1, 2, 3, 4];
            let head = linkedList.head();
            for (let i = 0; i < 4; i++) {
                expect(head.getValue()).to.equal(res[i]);
                head = head.getNext();
            }
        });

        it('does nothing if position is not valid (not number)', () => {
            const linkedList = LinkedList.fromArray([1]);
            expect(linkedList.removeAt('test')).to.equal(null);
        });

        it('does nothing if position is not valid (negative number)', () => {
            const linkedList = LinkedList.fromArray([1]);
            expect(linkedList.removeAt(-1)).to.equal(null);
        });

        it('does nothing if position is not valid (exceed limit)', () => {
            const linkedList = LinkedList.fromArray([1]);
            expect(linkedList.removeAt(2)).to.equal(null);
        });

        it('does nothing if position is not valid (exceed limit at boundary)', () => {
            const linkedList = LinkedList.fromArray([1]);
            expect(linkedList.removeAt(1)).to.equal(null);
        });
    });

    describe('.getByIndex(index)', () => {
        it('valid Index', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            const res = linkedList.getByIndex(3);
            expect(res.getValue()).to.equal(4);
            expect(linkedList.count()).to.equal(5);
        });

        it('Throws error when invalid index', () => {
            const linkedList = LinkedList.fromArray([1]);
            expect(() => linkedList.getByIndex(-1))
                .to.throws(Error)
                .and.to.have.property(
                    'message',
                    '.getByIndex: Index out of bounds error'
                );
        });

        it('Throws error when invalid index at boundary', () => {
            const linkedList = LinkedList.fromArray([1]);
            expect(() => linkedList.getByIndex(1))
                .to.throws(Error)
                .and.to.have.property(
                    'message',
                    '.getByIndex: Index out of bounds error'
                );
        });
    });

    describe('.search()', () => {
        it('Searching the list with element present', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            const res = linkedList.search(3);

            expect(linkedList.count()).to.equal(5);
            expect(res).to.equal(true);
        });

        it('Searching the list with element not present', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            const res = linkedList.search(7);

            expect(linkedList.count()).to.equal(5);
            expect(res).to.equal(false);
        });
    });

    describe('.reverse()', () => {
        it('Reversing a list', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            linkedList.reverse();

            expect(linkedList.count()).to.equal(5);
            const res = [5, 4, 3, 2, 1];
            for (let i = 0; i < 5; i++) {
                expect(linkedList.getByIndex(i).getValue()).to.equal(res[i]);
            }
        });

        it('Reversing an empty list', () => {
            const linkedList = LinkedList.fromArray([]);
            const res = linkedList.reverse();

            expect(res).to.equal(null);
            expect(linkedList.count()).to.equal(0);
        });
    });

    describe('.findMid()', () => {
        it('Finding middle element in the list', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            const res = linkedList.findMid();

            expect(linkedList.count()).to.equal(5);
            expect(res.getValue()).to.equal(3);
        });

        it('Finding middle element in the empty list', () => {
            const linkedList = new LinkedList();
            const res = linkedList.findMid();

            expect(linkedList.count()).to.equal(0);
            expect(res).to.equal(null);
        });
    });

    describe('.clear()', () => {
        it('Clearing a list', () => {
            const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
            linkedList.clear();

            expect(linkedList.head()).to.equal(null);
            expect(linkedList.count()).to.equal(0);
        });
    });

    describe('.mergeSort()', () => {
        it('Sorting the unsorted list (without repetition)', () => {
            const linkedList = LinkedList.fromArray([3, 2, 1, 5, 4]);
            linkedList.mergeSort();

            expect(linkedList.count()).to.equal(5);
            const res = [1, 2, 3, 4, 5];
            for (let i = 0; i < 5; i++) {
                expect(linkedList.getByIndex(i).getValue()).to.equal(res[i]);
            }
        });

        it('Sorting the unsorted list (with repetition)', () => {
            const linkedList = LinkedList.fromArray([1, 1, 1, 1, 1]);
            linkedList.mergeSort();

            expect(linkedList.count()).to.equal(5);
            const res = [1, 1, 1, 1, 1];
            for (let i = 0; i < 5; i++) {
                expect(linkedList.getByIndex(i).getValue()).to.equal(res[i]);
            }
        });

        it('Sorting the empty list', () => {
            const linkedList = new LinkedList();
            linkedList.mergeSort();

            expect(linkedList.count()).to.equal(0);
            expect(linkedList.head()).to.equal(null);
        });
    });
});

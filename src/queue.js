/**
 * @license MIT
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 *
 * @class
 */
class Queue {
    /**
     * Creates a queue.
     * @param {array} [elements]
     */
    constructor(elements) {
        this._elements = Array.isArray(elements) ? elements : [];
        this._offset = 0;
    }

    /**
     * Adds an element to the back of the queue.
     * @public
     * @param {number|string|object} element
     */
    enqueue(element) {
        this._elements.push(element);
        return this;
    }

    reverse() {
        let stack = [];
        while (this._elements.length > 0) {
            stack.push(this._elements[0]);
            this._elements.shift();
        }
        while (stack.length > 0) {
            this._elements.push(stack[stack.length - 1]);
            stack.pop();
        }
    }

    /**
     * Adds an element to the back of the queue.
     * @public
     * @param {number|string|object} element
     */
    push(element) {
        return this.enqueue(element);
    }

    sort() {
        this._elements = this._elements.sort();
    }

    /**
     * Dequeues the front element in the queue.
     * @public
     * @returns {number|string|object}
     */
    dequeue() {
        if (this.size() === 0) return null;

        const first = this.front();
        this._offset += 1;

        if (this._offset * 2 < this._elements.length) return first;

        // only remove dequeued elements when reaching half size
        // to decrease latency of shifting elements.
        this._elements = this._elements.slice(this._offset);
        this._offset = 0;
        return first;
    }

    /**
     * Dequeues the front element in the queue.
     * @public
     * @returns {number|string|object}
     */
    pop() {
        return this.dequeue();
    }

    /**
     * Returns the front element of the queue.
     * @public
     * @returns {number|string|object}
     */
    front() {
        return this.size() > 0 ? this._elements[this._offset] : null;
    }

    reverseFirstK(k) {
        if (this._elements.length == 0 || k > this._elements.length)
            return false;
        if (k <= 0) return false;
        let Stack = [];
        for (let i = 0; i < k; i++) {
            Stack.push(this._elements.shift());
        }
        while (Stack.length > 0) {
            this._elements.push(Stack.pop());
        }
        for (let i = 0; i < this._elements.length - k; i++) {
            this._elements.push(this._elements.shift());
        }
        return true;
    }

    /**
     * Returns the back element of the queue.
     * @public
     * @returns {number|string|object}
     */
    back() {
        return this.size() > 0
            ? this._elements[this._elements.length - 1]
            : null;
    }

    /**
     * Returns the number of elements in the queue.
     * @public
     * @returns {number}
     */
    size() {
        return this._elements.length - this._offset;
    }

    /**
     * Checks if the queue is empty.
     * @public
     * @returns {boolean}
     */
    isEmpty() {
        return this.size() === 0;
    }

    /**
     * Returns the remaining elements in the queue as an array.
     * @public
     * @returns {array}
     */
    toArray() {
        return this._elements.slice(this._offset);
    }

    interleave() {
        if (this._elements.length % 2 != 0) return false;
        let temp = [];
        let halfSize = this._elements.length / 2;
        for (let i = 0; i < halfSize; i++) {
            temp.push(this._elements[0]);
            this._elements.shift();
        }
        while (temp.length != 0) {
            this._elements.push(temp[0]);
            this._elements.push(this._elements[0]);
            this._elements.shift();
            temp.shift();
        }
        return true;
    }

    /**
     * Creates a shallow copy of the queue.
     * @public
     * @return {Queue}
     */
    clone() {
        return new Queue(this._elements.slice(this._offset));
    }

    clear() {
        this._elements = [];
        this._offset = 0;
    }

    /**
     * Creates a queue from an existing array.
     * @public
     * @static
     * @param {array} elements
     * @return {Queue}
     */
    static fromArray(elements) {
        return new Queue(elements);
    }
}

exports.Queue = Queue;

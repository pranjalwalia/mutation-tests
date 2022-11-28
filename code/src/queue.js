class Queue {
    constructor(elements) {
        this._elements = Array.isArray(elements) ? elements : [];
        this._offset = 0;
    }

    static fromArray(elements) {
        return new Queue(elements);
    }

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

    push(element) {
        return this.enqueue(element);
    }

    sort() {
        this._elements = this._elements.sort();
    }

    dequeue() {
        if (this.size() === 0) return null;

        const first = this.front();
        this._offset += 1;

        if (this._offset * 2 < this._elements.length) return first;

        this._elements = this._elements.slice(this._offset);
        this._offset = 0;
        return first;
    }

    pop() {
        return this.dequeue();
    }

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

    back() {
        return this.size() > 0
            ? this._elements[this._elements.length - 1]
            : null;
    }

    size() {
        return this._elements.length - this._offset;
    }

    clone() {
        return new Queue(this._elements.slice(this._offset));
    }

    isEmpty() {
        return this.size() === 0;
    }

    toArray() {
        return this._elements.slice(this._offset);
    }

    clear() {
        this._elements = [];
        this._offset = 0;
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
}

module.exports = { Queue };

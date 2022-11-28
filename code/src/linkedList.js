class LinkedListNode {
    constructor(value, next) {
        this._value = value;
        this.setNext(next);
    }

    setValue(value) {
        this._value = value;
        return this;
    }

    getValue() {
        return this._value;
    }

    setNext(next) {
        if (next && !(next instanceof LinkedListNode)) {
            throw new Error('setNext expects a LinkedListNode or null');
        }
        this._next = next || null;
        return this;
    }

    getNext() {
        return this._next;
    }

    hasNext() {
        return this._next instanceof LinkedListNode;
    }
}

class LinkedList {
    constructor() {
        this._head = null;
        this._count = 0;
    }

    head() {
        return this._head;
    }

    count() {
        return this._count;
    }

    insertFirst(value) {
        this._head = new LinkedListNode(value, this._head);
        this._count += 1;
        return this._head;
    }

    insertLast(value) {
        if (this.isEmpty()) {
            return this.insertFirst(value);
        }

        let current = this._head;
        while (current.hasNext()) {
            current = current.getNext();
        }

        current.setNext(new LinkedListNode(value, null));
        this._count += 1;
        return current.getNext();
    }

    insertAt(position, value) {
        if (Number.isNaN(+position) || position < 0 || position > this._count) {
            throw new Error(
                '.insertAt expects a position num <= linked list size'
            );
        }

        // head node is at position 0
        if (position === 0) {
            return this.insertFirst(value);
        }

        let currentPosition = 1;
        let prev = this._head;
        while (currentPosition < position) {
            currentPosition += 1;
            prev = prev.getNext();
        }

        // add it at a position after the head, between prev & prev.getNext()
        prev.setNext(new LinkedListNode(value, prev.getNext()));
        this._count += 1;
        return prev.getNext();
    }

    removeFirst() {
        if (this.isEmpty()) return null;

        const removed = this._head;
        this._head = this._head.getNext();
        this._count -= 1;
        return removed.setNext(null);
    }

    removeLast() {
        if (this.isEmpty()) return null;

        let prev = null;
        let current = this._head;
        while (current.hasNext()) {
            prev = current;
            current = current.getNext();
        }

        // linked list has 1 node
        if (prev === null) {
            return this.removeFirst();
        }

        prev.setNext(null);
        this._count -= 1;
        return current;
    }

    removeAt(position) {
        if (
            Number.isNaN(+position) ||
            position < 0 ||
            position >= this._count
        ) {
            return null;
        }

        if (position === 0) {
            return this.removeFirst();
        }

        let counter = 1;
        let prev = this._head;
        while (counter < position) {
            counter += 1;
            prev = prev.getNext();
        }
        const removed = prev.getNext();
        prev.setNext(prev.getNext().getNext());
        this._count -= 1;
        return removed.setNext(null);
    }

    getByIndex(index) {
        if (index < 0 || index >= this._count) {
            throw new Error('.getByIndex: Index out of bounds error');
        }

        let current = this._head;
        for (let i = 0; i < index; i++) {
            current = current.getNext();
        }
        return current;
    }

    search(value) {
        let current = this._head;

        while (current) {
            if (current.getValue() === value) {
                return true;
            }
            current = current.getNext();
        }

        return false;
    }

    reverse() {
        let prev = null;
        let cur = this._head;
        let cur_next;

        while (cur != null) {
            cur_next = cur.getNext();
            cur.setNext(prev);
            prev = cur;
            cur = cur_next;
        }

        let newHead = prev;
        this._head = newHead;
        return newHead;
    }

    findMid(head = this._head) {
        if (head === null) {
            return head;
        }

        let slow = head;
        let fast = head;

        while (fast.getNext() != null && fast.getNext().getNext() != null) {
            slow = slow.getNext();
            fast = fast.getNext().getNext();
        }

        return slow;
    }

    static sortedMerge(a, b) {
        let result = null;

        if (a === null) {
            return b;
        }

        if (b === null) {
            return a;
        }

        if (a.getValue() <= b.getValue()) {
            result = a;
            result.setNext(LinkedList.sortedMerge(a.getNext(), b));
        } else {
            result = b;
            result.setNext(LinkedList.sortedMerge(a, b.getNext()));
        }

        this._head = result;
        return result;
    }

    mergeSort(head = this._head) {
        if (head === null || head.getNext() === null) {
            return head;
        }

        let mid = this.findMid(head);
        let midNext = mid.getNext();

        mid.setNext(null);

        let left = this.mergeSort(head);
        let right = this.mergeSort(midNext);

        let sortedList = LinkedList.sortedMerge(left, right);
        this._head = sortedList;
        return sortedList;
    }

    isEmpty() {
        return this._head === null;
    }

    clear() {
        this._head = null;
        this._count = 0;
    }

    static fromArray(values) {
        if (!Array.isArray(values)) {
            throw new Error('cannot create LinkedList from none-array values');
        }

        const linkedList = new LinkedList();
        for (let i = 0; i < values.length; i++) {
            linkedList.insertLast(values[i]);
        }
        return linkedList;
    }
}

module.exports = { LinkedListNode, LinkedList };

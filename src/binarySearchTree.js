const { BinarySearchTreeNode } = require('./binarySearchTreeNode');

class BinarySearchTree {
    constructor(customComparator) {
        this._comparator = customComparator || comparator;
        this._root = null;
        this._count = 0;
    }

    constructPreOrder(pre, size) {
        this._root = new BinarySearchTreeNode(pre[0]);
        let s = [];
        s.push(this._root);
        for (let i = 1; i < size; ++i) {
            let temp = null;
            while (s.length > 0 && pre[i] > s[s.length - 1].getValue()) {
                temp = s.pop();
            }
            if (temp != null) {
                temp.setRight(new BinarySearchTreeNode(pre[i]));
                s.push(temp.getRight());
            } else {
                temp = s[s.length - 1];
                temp.setLeft(new BinarySearchTreeNode(pre[i]));
                s.push(temp.getLeft());
            }
        }
        return this._root;
    }

    insertKey(key) {
        const temp = new BinarySearchTreeNode(key);
        const insert = (node) => {
            const difference = this._comparator(
                temp.getValue(),
                node.getValue()
            );
            if (difference < 0) {
                if (node.hasLeft()) {
                    insert(node.getLeft());
                } else {
                    node.setLeft(temp.setParent(node));
                    this._count += 1;
                }
            } else if (difference > 0) {
                if (node.hasRight()) {
                    insert(node.getRight());
                } else {
                    node.setRight(temp.setParent(node));
                    this._count += 1;
                }
            } else {
                node.setValue(key);
            }
        };

        if (this._root === null) {
            this._root = temp;
            this._count += 1;
        } else {
            insert(this._root);
        }

        return this;
    }

    containsKey(value) {
        const contains = (current) => {
            if (current === null) return false;

            const difference = this._comparator(value, current.getValue());
            if (difference === 0) return true;
            if (difference < 0) return contains(current.getLeft());
            return contains(current.getRight());
        };

        return contains(this._root);
    }

    treeHeight(node = this._root) {
        if (node === null) return 0;
        let lh = 0;
        let rh = 0;

        if (node.hasLeft()) lh = this.treeHeight(node.getLeft());
        if (node.hasRight()) rh = this.treeHeight(node.getRight());
        return 1 + Math.max(lh, rh);
    }

    max(node = this._root) {
        if (node === null) return null;
        if (node.hasRight()) return this.max(node.getRight());
        return node;
    }

    findKey(value) {
        const get = (node) => {
            if (node === null) return null;

            const difference = this._comparator(value, node.getValue());
            if (difference === 0) return node;
            if (difference < 0) return get(node.getLeft());
            return get(node.getRight());
        };

        return get(this._root);
    }

    min(node = this._root) {
        if (node === null) return null;
        if (node.hasLeft()) return this.min(node.getLeft());
        return node;
    }

    sum(node = this._root) {
        if (node === null) return 0;
        return (
            node.getValue() +
            this.sum(node.getLeft()) +
            this.sum(node.getRight())
        );
    }

    root() {
        return this._root;
    }

    removeKey(value) {
        const removeNode = (val, temp) => {
            if (temp === null) return false;

            const difference = this._comparator(val, temp.getValue());
            if (difference < 0) return removeNode(val, temp.getLeft());
            if (difference > 0) return removeNode(val, temp.getRight());

            if (temp.isLeaf()) {
                if (temp.isRoot()) {
                    this._root = null;
                } else if (
                    this._comparator(val, temp.getParent().getValue()) < 0
                ) {
                    temp.getParent().setLeft(null);
                } else {
                    temp.getParent().setRight(null);
                }
                this._count -= 1;
                return true;
            }

            if (!temp.hasRight()) {
                if (temp.isRoot()) {
                    this._root = temp.getLeft();
                } else if (
                    this._comparator(val, temp.getParent().getValue()) < 0
                ) {
                    temp.getParent().setLeft(temp.getLeft());
                } else {
                    temp.getParent().setRight(temp.getLeft());
                }
                temp.getLeft().setParent(temp.getParent());
                this._count -= 1;
                return true;
            }

            if (!temp.hasLeft()) {
                if (temp.isRoot()) {
                    this._root = temp.getRight();
                } else if (
                    this._comparator(val, temp.getParent().getValue()) < 0
                ) {
                    temp.getParent().setLeft(temp.getRight());
                } else {
                    temp.getParent().setRight(temp.getRight());
                }
                temp.getRight().setParent(temp.getParent());
                this._count -= 1;
                return true;
            }

            const minRight = this.min(temp.getRight());
            temp.setValue(minRight.getValue());
            return removeNode(minRight.getValue(), minRight);
        };

        return removeNode(value, this._root);
    }

    inOrder(cb) {
        const recurse = (temp) => {
            if (temp === null) return;
            recurse(temp.getLeft());
            cb(temp);
            recurse(temp.getRight());
        };
        recurse(this._root);
    }

    preOrder(cb) {
        const recurse = (temp) => {
            if (temp === null) return;
            cb(temp);
            recurse(temp.getLeft());
            recurse(temp.getRight());
        };
        recurse(this._root);
    }

    postOrder(cb) {
        const recurse = (temp) => {
            if (temp === null) return;
            recurse(temp.getLeft());
            recurse(temp.getRight());
            cb(temp);
        };
        recurse(this._root);
    }
}

const comparator = (a, b) => {
    if (a === b) return 0;
    return a > b ? 1 : -1;
};

exports.BinarySearchTree = BinarySearchTree;

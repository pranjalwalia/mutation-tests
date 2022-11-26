const { BinarySearchTreeNode } = require('./binarySearchTreeNode');

const defaultCompare = (a, b) => {
    if (a === b) return 0;
    return a > b ? 1 : -1;
};

/**
 * @class BinarySearchTree
 */
class BinarySearchTree {
    constructor(compare) {
        this._compare = compare || defaultCompare;
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

    /**
     * Inserts a node with a key/value into the tree
     * @public
     * @param {number|string|object} value
     * @return {BinarySearchTree}
     */
    insert(value) {
        const newNode = new BinarySearchTreeNode(value);
        const insertRecursive = (node) => {
            const compare = this._compare(newNode.getValue(), node.getValue());
            if (compare < 0) {
                if (node.hasLeft()) {
                    insertRecursive(node.getLeft());
                } else {
                    node.setLeft(newNode.setParent(node));
                    this._count += 1;
                }
            } else if (compare > 0) {
                if (node.hasRight()) {
                    insertRecursive(node.getRight());
                } else {
                    node.setRight(newNode.setParent(node));
                    this._count += 1;
                }
            } else {
                node.setValue(value);
            }
        };

        if (this._root === null) {
            this._root = newNode;
            this._count += 1;
        } else {
            insertRecursive(this._root);
        }

        return this;
    }

    /**
     * Checks if a value exists in the tree by its key
     * @public
     * @param {number|string} key
     * @return {boolean}
     */
    has(value) {
        const hasRecursive = (current) => {
            if (current === null) return false;

            const compare = this._compare(value, current.getValue());
            if (compare === 0) return true;
            if (compare < 0) return hasRecursive(current.getLeft());
            return hasRecursive(current.getRight());
        };

        return hasRecursive(this._root);
    }

    /**
     * Finds a node by its key
     * @public
     * @param {BinarySearchTreeNode} [node]
     * @return {number}
     */
    treeHeight(node = this._root) {
        if (node === null) return 0;
        let lh = 0;
        let rh = 0;

        if (node.hasLeft()) lh = this.treeHeight(node.getLeft());
        if (node.hasRight()) rh = this.treeHeight(node.getRight());
        return 1 + Math.max(lh, rh);
    }
    /**
     * Finds the node with max key (most right) in the tree
     * @public
     * @param {BinarySearchTreeNode} [current]
     * @return {BinarySearchTreeNode}
     */
    max(node = this._root) {
        if (node === null) return null;
        if (node.hasRight()) return this.max(node.getRight());
        return node;
    }

    /**
     * Finds a node by its key
     * @public
     * @param {number|string} key
     * @return {BinarySearchTreeNode}
     */
    find(value) {
        const findRecursive = (node) => {
            if (node === null) return null;

            const compare = this._compare(value, node.getValue());
            if (compare === 0) return node;
            if (compare < 0) return findRecursive(node.getLeft());
            return findRecursive(node.getRight());
        };

        return findRecursive(this._root);
    }

    /**
     * Finds the node with min key (most left) in the tree
     * @public
     * @param {BinarySearchTreeNode} [current]
     * @return {BinarySearchTreeNode}
     */
    min(node = this._root) {
        if (node === null) return null;
        if (node.hasLeft()) return this.min(node.getLeft());
        return node;
    }

    /**
     * Returns the root node
     * @public
     * @return {BinarySearchTreeNode}
     */
    root() {
        return this._root;
    }

    /**
     * Returns the nodes count
     * @public
     * @return {number}
     */
    count() {
        return this._count;
    }

    /**
     * Removes a node by its key
     * @public
     * @param {number|string|object} value
     * @return {boolean}
     */
    remove(value) {
        const removeRecursively = (val, node) => {
            if (node === null) return false;

            const compare = this._compare(val, node.getValue());
            if (compare < 0) return removeRecursively(val, node.getLeft());
            if (compare > 0) return removeRecursively(val, node.getRight());

            // node node is the node to remove
            // case 1: node has no children
            if (node.isLeaf()) {
                if (node.isRoot()) {
                    this._root = null;
                } else if (
                    this._compare(val, node.getParent().getValue()) < 0
                ) {
                    node.getParent().setLeft(null);
                } else {
                    node.getParent().setRight(null);
                }
                this._count -= 1;
                return true;
            }

            // case 2: node has a left child and no right child
            if (!node.hasRight()) {
                if (node.isRoot()) {
                    this._root = node.getLeft();
                } else if (
                    this._compare(val, node.getParent().getValue()) < 0
                ) {
                    node.getParent().setLeft(node.getLeft());
                } else {
                    node.getParent().setRight(node.getLeft());
                }
                node.getLeft().setParent(node.getParent());
                this._count -= 1;
                return true;
            }

            // case 3: node has a right child and no left child
            if (!node.hasLeft()) {
                if (node.isRoot()) {
                    this._root = node.getRight();
                } else if (
                    this._compare(val, node.getParent().getValue()) < 0
                ) {
                    node.getParent().setLeft(node.getRight());
                } else {
                    node.getParent().setRight(node.getRight());
                }
                node.getRight().setParent(node.getParent());
                this._count -= 1;
                return true;
            }

            // case 4: node has left and right children
            const minRight = this.min(node.getRight());
            node.setValue(minRight.getValue());
            return removeRecursively(minRight.getValue(), minRight);
        };

        return removeRecursively(value, this._root);
    }

    /**
     * Traverses the tree in-order (left-node-right)
     * @public
     * @param {function} cb
     */
    traverseInOrder(cb) {
        if (typeof cb !== 'function') {
            throw new Error('.traverseInOrder expects a callback function');
        }

        const traverseRecursive = (node) => {
            if (node === null) return;
            traverseRecursive(node.getLeft());
            cb(node);
            traverseRecursive(node.getRight());
        };

        traverseRecursive(this._root);
    }

    /**
     * Traverses the tree pre-order (node-left-right)
     * @public
     * @param {function} cb
     */
    traversePreOrder(cb) {
        if (typeof cb !== 'function') {
            throw new Error('.traversePreOrder expects a callback function');
        }

        const traverseRecursive = (node) => {
            if (node === null) return;
            cb(node);
            traverseRecursive(node.getLeft());
            traverseRecursive(node.getRight());
        };

        traverseRecursive(this._root);
    }

    /**
     * Traverses the tree post-order (left-right-node)
     * @public
     * @param {function} cb
     */
    traversePostOrder(cb) {
        if (typeof cb !== 'function') {
            throw new Error('.traversePostOrder expects a callback function');
        }

        const traverseRecursive = (node) => {
            if (node === null) return;
            traverseRecursive(node.getLeft());
            traverseRecursive(node.getRight());
            cb(node);
        };

        traverseRecursive(this._root);
    }

    /**
     * Clears the tree
     * @public
     */
    clear() {
        this._root = null;
        this._count = 0;
    }
}

exports.BinarySearchTree = BinarySearchTree;

const { expect } = require('chai');
const {
    BinarySearchTree,
    BinarySearchTreeNode
} = require('../src/binarySearchTree');

describe('BinarySearchTree tests', () => {
    const bst = new BinarySearchTree();
    const preOrderBST = new BinarySearchTree();

    describe('.constructPreOrder(pre, size)', () => {
        it('should construct a tree', () => {
            //      10
            //     /   \
            //    5     40
            //   /  \      \
            //  1    7      50
            const pre = [10, 5, 1, 7, 40, 50];
            const size = pre.length;
            preOrderBST.constructPreOrder(pre, size);

            expect(preOrderBST.root().getValue()).to.equal(10);
            expect(preOrderBST.root().getLeft().getValue()).to.equal(5);
            expect(preOrderBST.root().getRight().getValue()).to.equal(40);
            expect(
                preOrderBST.root().getRight().getRight().getValue()
            ).to.equal(50);
            expect(preOrderBST.root().getLeft().getRight().getValue()).to.equal(
                7
            );
        });
        it('should check if all nodes are valid BST nodes', () => {
            expect(preOrderBST.root()).to.be.instanceOf(BinarySearchTreeNode);
            expect(preOrderBST.root().getLeft()).to.be.instanceOf(
                BinarySearchTreeNode
            );
            expect(preOrderBST.root().getRight()).to.be.instanceOf(
                BinarySearchTreeNode
            );
            expect(preOrderBST.root().getLeft().getLeft()).to.be.instanceOf(
                BinarySearchTreeNode
            );
            expect(preOrderBST.root().getLeft().getRight()).to.be.instanceOf(
                BinarySearchTreeNode
            );
        });
    });

    describe('.insertKey(value)', () => {
        it('should insert nodes to the tree', () => {
            expect(bst.insertKey(5)).to.be.instanceof(BinarySearchTree);
            expect(bst.insertKey(8)).to.be.instanceof(BinarySearchTree);
            expect(bst.insertKey(3)).to.be.instanceof(BinarySearchTree);
            expect(bst.insertKey(9)).to.be.instanceof(BinarySearchTree);
            expect(bst.insertKey(6)).to.be.instanceof(BinarySearchTree);
            expect(bst.insertKey(4)).to.be.instanceof(BinarySearchTree);
            expect(bst.insertKey(2)).to.be.instanceof(BinarySearchTree);

            // updates value of existing node
            expect(bst.insertKey(2)).to.be.instanceof(BinarySearchTree);
            expect(bst.findKey(2).getValue()).to.equal(2);
        });
    });

    describe('.root()', () => {
        it('should get the root node', () => {
            expect(bst.root().getValue()).to.equal(5);
            expect(bst.root().getRight().getValue()).to.equal(8);
            expect(bst.root().getLeft().getValue()).to.equal(3);
        });
    });

    describe('.containsKey(value)', () => {
        it('checks if a node exists by key', () => {
            expect(bst.containsKey(5)).to.equal(true);
            expect(bst.containsKey(8)).to.equal(true);
            expect(bst.containsKey(3)).to.equal(true);
            expect(bst.containsKey(9)).to.equal(true);
            expect(bst.containsKey(5)).to.equal(true);
            expect(bst.containsKey(4)).to.equal(true);
            expect(bst.containsKey(2)).to.equal(true);
            expect(bst.containsKey(10)).to.equal(false);
        });
    });

    describe('.height(root)', () => {
        it('should get the height of tree', () => {
            expect(bst.treeHeight()).to.equal(3);
        });
    });

    describe('.sum()', () => {
        it('should sum the nodes in BST correctly', () => {
            expect(bst.sum()).to.be.equal(37);
            expect(preOrderBST.sum()).to.be.equal(113);
        });
    });

    describe('.findKey(value)', () => {
        it('should search a node by its key in the tree', () => {
            expect(bst.findKey(5)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.findKey(8)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.findKey(3)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.findKey(9)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.findKey(5)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.findKey(4)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.findKey(2)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.findKey(10)).to.equal(null);
        });
    });

    describe('.max()', () => {
        it('get the node with max key', () => {
            const max = bst.max();
            expect(max.getValue()).to.equal(9);
        });
    });

    describe('.min()', () => {
        it('get the node with min key', () => {
            const min = bst.min();
            expect(min.getValue()).to.equal(2);
        });
    });

    describe('.inOrder(cb)', () => {
        it('traverse the tree in-order', () => {
            const keys = [];
            bst.inOrder((node) => keys.push(node.getValue()));
            expect(keys).to.deep.equal([2, 3, 4, 5, 6, 8, 9]);
        });
    });

    describe('.preOrder(cb)', () => {
        it('traverse the tree pre-order', () => {
            const keys = [];
            bst.preOrder((node) => keys.push(node.getValue()));
            expect(keys).to.deep.equal([5, 3, 2, 4, 8, 6, 9]);
        });
    });

    describe('.postOrder(cb)', () => {
        it('traverse the tree post-order', () => {
            const keys = [];
            bst.postOrder((node) => keys.push(node.getValue()));
            expect(keys).to.deep.equal([2, 4, 3, 6, 9, 8, 5]);
        });
    });

    describe('.removeKey(value)', () => {
        it('should removeKey a leaf node', () => {
            bst.removeKey(2);
            expect(bst.containsKey(2)).to.equal(false);
            expect(bst.findKey(3).getLeft()).to.equal(null);
        });

        it('should removeKey a node with a right child only', () => {
            bst.removeKey(3);
            expect(bst.containsKey(3)).to.equal(false);
            expect(bst.root().getLeft().getValue()).to.equal(4);
        });

        it('should removeKey a node with a left child only', () => {
            bst.insertKey(3);
            bst.removeKey(4);
            expect(bst.containsKey(4)).to.equal(false);
            expect(bst.root().getLeft().getValue()).to.equal(3);
        });

        it('should removeKey a node with two children', () => {
            bst.removeKey(8);
            expect(bst.containsKey(8)).to.equal(false);
            expect(bst.root().getRight().getValue()).to.equal(9);
            expect(bst.findKey(9).getRight()).to.equal(null);
            expect(bst.findKey(9).getLeft().getValue()).to.equal(6);
        });

        it('should removeKey root node with right child', () => {
            bst.insertKey(10);
            bst.removeKey(6);
            bst.removeKey(9);
            bst.removeKey(3);
            bst.removeKey(5);
            expect(bst.root().getValue()).to.equal(10);
        });

        it('should removeKey root node with left child', () => {
            bst.insertKey(2);
            bst.insertKey(3);
            bst.insertKey(25);
            bst.removeKey(3);
            bst.removeKey(25);
            bst.removeKey(10);
            expect(bst.root().getValue()).to.equal(2);
        });

        it('should removeKey root node', () => {
            bst.removeKey(2);
            expect(bst.root()).to.equal(null);
        });
    });
});

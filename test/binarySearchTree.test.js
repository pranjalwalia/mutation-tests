const { expect } = require('chai');
const { BinarySearchTreeNode } = require('../src/binarySearchTreeNode');
const { BinarySearchTree } = require('../src/binarySearchTree');

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
            expect(bst.insertKey(50)).to.be.instanceof(BinarySearchTree);
            expect(bst.insertKey(80)).to.be.instanceof(BinarySearchTree);
            expect(bst.insertKey(30)).to.be.instanceof(BinarySearchTree);
            expect(bst.insertKey(90)).to.be.instanceof(BinarySearchTree);
            expect(bst.insertKey(60)).to.be.instanceof(BinarySearchTree);
            expect(bst.insertKey(40)).to.be.instanceof(BinarySearchTree);
            expect(bst.insertKey(20)).to.be.instanceof(BinarySearchTree);

            // updates value of existing node
            expect(bst.insertKey(20)).to.be.instanceof(BinarySearchTree);
            expect(bst.findKey(20).getValue()).to.equal(20);
        });
    });

    describe('.root()', () => {
        it('should get the root node', () => {
            expect(bst.root().getValue()).to.equal(50);
            expect(bst.root().getRight().getValue()).to.equal(80);
            expect(bst.root().getLeft().getValue()).to.equal(30);
        });
    });

    describe('.containsKey(value)', () => {
        it('checks if a node exists by key', () => {
            expect(bst.containsKey(50)).to.equal(true);
            expect(bst.containsKey(80)).to.equal(true);
            expect(bst.containsKey(30)).to.equal(true);
            expect(bst.containsKey(90)).to.equal(true);
            expect(bst.containsKey(50)).to.equal(true);
            expect(bst.containsKey(40)).to.equal(true);
            expect(bst.containsKey(20)).to.equal(true);
            expect(bst.containsKey(100)).to.equal(false);
        });
    });

    describe('.height(root)', () => {
        it('should get the height of tree', () => {
            expect(bst.treeHeight()).to.equal(3);
        });
    });

    describe('.sum()', () => {
        it('should sum the nodes in BST correctly', () => {
            console.log(preOrderBST.sum());
            expect(bst.sum()).to.be.equal(370);
            expect(preOrderBST.sum()).to.be.equal(113);
        });
    });

    describe('.findKey(value)', () => {
        it('should search a node by its key in the tree', () => {
            expect(bst.findKey(50)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.findKey(80)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.findKey(30)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.findKey(90)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.findKey(50)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.findKey(40)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.findKey(20)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.findKey(100)).to.equal(null);
        });
    });

    describe('.max()', () => {
        it('get the node with max key', () => {
            const max = bst.max();
            expect(max.getValue()).to.equal(90);
        });
    });

    describe('.min()', () => {
        it('get the node with min key', () => {
            const min = bst.min();
            expect(min.getValue()).to.equal(20);
        });
    });

    describe('.inOrder(cb)', () => {
        it('traverse the tree in-order', () => {
            const keys = [];
            bst.inOrder((node) => keys.push(node.getValue()));
            expect(keys).to.deep.equal([20, 30, 40, 50, 60, 80, 90]);
        });
    });

    describe('.preOrder(cb)', () => {
        it('traverse the tree pre-order', () => {
            const keys = [];
            bst.preOrder((node) => keys.push(node.getValue()));
            expect(keys).to.deep.equal([50, 30, 20, 40, 80, 60, 90]);
        });
    });

    describe('.postOrder(cb)', () => {
        it('traverse the tree post-order', () => {
            const keys = [];
            bst.postOrder((node) => keys.push(node.getValue()));
            expect(keys).to.deep.equal([20, 40, 30, 60, 90, 80, 50]);
        });
    });

    describe('.removeKey(value)', () => {
        it('should removeKey a leaf node', () => {
            bst.removeKey(20);
            expect(bst.containsKey(20)).to.equal(false);
            expect(bst.findKey(30).getLeft()).to.equal(null);
        });

        it('should removeKey a node with a right child only', () => {
            bst.removeKey(30);
            expect(bst.containsKey(30)).to.equal(false);
            expect(bst.root().getLeft().getValue()).to.equal(40);
        });

        it('should removeKey a node with a left child only', () => {
            bst.insertKey(30);
            bst.removeKey(40);
            expect(bst.containsKey(40)).to.equal(false);
            expect(bst.root().getLeft().getValue()).to.equal(30);
        });

        it('should removeKey a node with two children', () => {
            bst.removeKey(80);
            expect(bst.containsKey(80)).to.equal(false);
            expect(bst.root().getRight().getValue()).to.equal(90);
            expect(bst.findKey(90).getRight()).to.equal(null);
            expect(bst.findKey(90).getLeft().getValue()).to.equal(60);
        });

        it('should removeKey root node with right child', () => {
            bst.insertKey(100);
            bst.removeKey(60);
            bst.removeKey(90);
            bst.removeKey(30);
            bst.removeKey(50);
            expect(bst.root().getValue()).to.equal(100);
        });

        it('should removeKey root node with left child', () => {
            bst.insertKey(20);
            bst.insertKey(30);
            bst.insertKey(25);
            bst.removeKey(30);
            bst.removeKey(25);
            bst.removeKey(100);
            expect(bst.root().getValue()).to.equal(20);
        });

        it('should removeKey root node', () => {
            bst.removeKey(20);
            expect(bst.root()).to.equal(null);
        });
    });
});

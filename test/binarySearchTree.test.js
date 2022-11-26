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

    describe('.insert(value)', () => {
        it('should insert nodes to the tree', () => {
            expect(bst.insert(50)).to.be.instanceof(BinarySearchTree);
            expect(bst.insert(80)).to.be.instanceof(BinarySearchTree);
            expect(bst.insert(30)).to.be.instanceof(BinarySearchTree);
            expect(bst.insert(90)).to.be.instanceof(BinarySearchTree);
            expect(bst.insert(60)).to.be.instanceof(BinarySearchTree);
            expect(bst.insert(40)).to.be.instanceof(BinarySearchTree);
            expect(bst.insert(20)).to.be.instanceof(BinarySearchTree);

            // updates value of existing node
            expect(bst.insert(20)).to.be.instanceof(BinarySearchTree);
            expect(bst.find(20).getValue()).to.equal(20);
        });
    });

    describe('.root()', () => {
        it('should get the root node', () => {
            expect(bst.root().getValue()).to.equal(50);
            expect(bst.root().getRight().getValue()).to.equal(80);
            expect(bst.root().getLeft().getValue()).to.equal(30);
        });
    });

    describe('.count()', () => {
        it('get the count of nodes in the tree', () => {
            expect(bst.count()).to.be.equal(7);
        });
    });

    describe('.has(value)', () => {
        it('checks if a node exists by key', () => {
            expect(bst.has(50)).to.equal(true);
            expect(bst.has(80)).to.equal(true);
            expect(bst.has(30)).to.equal(true);
            expect(bst.has(90)).to.equal(true);
            expect(bst.has(50)).to.equal(true);
            expect(bst.has(40)).to.equal(true);
            expect(bst.has(20)).to.equal(true);
            expect(bst.has(100)).to.equal(false);
        });
    });

    describe('.height(root)', () => {
        it('should get the height of tree', () => {
            expect(bst.treeHeight()).to.equal(3);
        });
    });

    describe('.find(value)', () => {
        it('should search a node by its key in the tree', () => {
            expect(bst.find(50)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.find(80)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.find(30)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.find(90)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.find(50)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.find(40)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.find(20)).to.be.instanceof(BinarySearchTreeNode);
            expect(bst.find(100)).to.equal(null);
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

    describe('.traverseInOrder(cb)', () => {
        it('traverse the tree in-order', () => {
            const keys = [];
            bst.traverseInOrder((node) => keys.push(node.getValue()));
            expect(keys).to.deep.equal([20, 30, 40, 50, 60, 80, 90]);
        });
    });

    describe('.traversePreOrder(cb)', () => {
        it('traverse the tree pre-order', () => {
            const keys = [];
            bst.traversePreOrder((node) => keys.push(node.getValue()));
            expect(keys).to.deep.equal([50, 30, 20, 40, 80, 60, 90]);
        });
    });

    describe('.traversePostOrder(cb)', () => {
        it('traverse the tree post-order', () => {
            const keys = [];
            bst.traversePostOrder((node) => keys.push(node.getValue()));
            expect(keys).to.deep.equal([20, 40, 30, 60, 90, 80, 50]);
        });
    });

    describe('.remove(value)', () => {
        it('should remove a leaf node', () => {
            bst.remove(20);
            expect(bst.has(20)).to.equal(false);
            expect(bst.find(30).getLeft()).to.equal(null);
            expect(bst.count()).to.equal(6);
        });

        it('should remove a node with a right child only', () => {
            bst.remove(30);
            expect(bst.has(30)).to.equal(false);
            expect(bst.root().getLeft().getValue()).to.equal(40);
            expect(bst.count()).to.equal(5);
        });

        it('should remove a node with a left child only', () => {
            bst.insert(30);
            bst.remove(40);
            expect(bst.has(40)).to.equal(false);
            expect(bst.root().getLeft().getValue()).to.equal(30);
            expect(bst.count()).to.equal(5);
        });

        it('should remove a node with two children', () => {
            bst.remove(80);
            expect(bst.has(80)).to.equal(false);
            expect(bst.root().getRight().getValue()).to.equal(90);
            expect(bst.find(90).getRight()).to.equal(null);
            expect(bst.find(90).getLeft().getValue()).to.equal(60);
            expect(bst.count()).to.equal(4);
        });

        it('should remove root node with right child', () => {
            bst.insert(100);
            bst.remove(60);
            bst.remove(90);
            bst.remove(30);
            bst.remove(50);
            expect(bst.root().getValue()).to.equal(100);
        });

        it('should remove root node with left child', () => {
            bst.insert(20);
            bst.insert(30);
            bst.insert(25);
            bst.remove(30);
            bst.remove(25);
            bst.remove(100);
            expect(bst.root().getValue()).to.equal(20);
        });

        it('should remove root node', () => {
            bst.remove(20);
            expect(bst.root()).to.equal(null);
        });
    });

    describe('.clear()', () => {
        bst.clear();
        expect(bst.count()).to.equal(0);
        expect(bst.root()).to.equal(null);
        expect(bst.remove(10)).to.equal(false);
    });
});

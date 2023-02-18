import { Node } from "./Node.js";

export class Tree {
    constructor(list) {
        this.numList = list;
        list = this.cleanData(list);
        list.sort(function(a, b){return a - b});
        this.root = this.buildTree(list);
    }

    buildTree(list) {
        let start = 0;
        let end = list.length - 1;
        if (start > end) {
            return null;
        }

        let mid = Math.floor((start + end) / 2);
        let root = new Node(list[mid]);

        let rightHalf = list.slice(mid + 1, list.length);
        let leftHalf = list.slice(0, mid);
        
        root.setLeft(this.buildTree(leftHalf));
        root.setRight(this.buildTree(rightHalf));

        return root;
        
    }

    insert(value) {
        if (this.numList.includes(value)) {
            return;
        }
        this.numList.push(value);
        let newNode = new Node(value);
        let currentNode = this.root;
        let inserted = false;
        while (!inserted) {
            if (newNode.data < currentNode.data) {
                if (currentNode.left) {
                    currentNode = currentNode.left;
                } else {
                    currentNode.setLeft(newNode);
                    inserted = true;
                }
            } else {
                if (currentNode.right) {
                    currentNode = currentNode.right;
                } else {
                    currentNode.setRight(newNode);
                    inserted = true;
                }
            }
        }

    }

    minValueNode(node) {
        let currentNode = node;

        while (currentNode.left) {
            currentNode = currentNode.left;
        }

        return currentNode;
    }

    delete(root, value) {
        let idx = this.numList.indexOf(value);
        if (idx !== -1) {
            this.numList.splice(idx, 1);
        }

        if (!root) {
            return root;
        }

        if (value < root.data) {
            root.left = this.delete(root.left, value);
        } else if (value > root.data) {
            root.right = this.delete(root.right, value);
        } else {
            if (!root.left) {
                return root.right;
            } else if (!root.right) {
                return root.left;
            }

            root.data = this.minValueNode(root.right).data;
            root.right = this.delete(root.right, root.data);
        }

        return root;
    }

    find(root, value) {
        if (root.data == value) {
            return root;
        }

        if (value < root.data) {
            return this.find(root.left, value);
        }

        if (value > root.data) {
            return this.find(root.right, value);
        }
    }

    levelOrder(root, func) {
        if (!root) {
            return null;
        }
        let currentNode = root;
        let funcResults = [];
        let q = [];
        q.push(currentNode);
        funcResults.push(func(currentNode.data));
        while (q.length > 0) {
            let currentNode = q[0];
            
            if (currentNode.left) {
                q.push(currentNode.left);
                funcResults.push(func(currentNode.left.data));
            };
            if (currentNode.right) {
                q.push(currentNode.right);
                funcResults.push(func(currentNode.right.data));
            };
            q.splice(0, 1);
        }

        return funcResults;

    }

    height(root) {
        if (!root) {
            return -1;
        }

        let leftHeight = this.height(root.left);
        let rightHeight = this.height(root.right);

        if (leftHeight > rightHeight) {
            return leftHeight + 1;
        } else {
            return rightHeight + 1;
        }
    }

    depth(node) {
        let root = this.root;
        let value = node;
        let depth = 0;
        
        while (root.data != value) {
            if (value < root.data) {
                depth++;
                root = root.left;
            } else if (value > root.data) {
                depth++;
                root = root.right;
            } 
        }
        return depth;
    }

    isBalanced(root) {
        if (!root){
            return true;
        }

        let leftHeight = 1 + this.height(root.left);
        let rightHeight = 1 + this.height(root.right);

        let diff = Math.abs(leftHeight - rightHeight);

        if (diff <= 1 && this.isBalanced(root.left) && this.isBalanced(root.right)) {
            return true;
        }

        return false;
    }

    rebalance() {
        let numList = this.inorder(this.root);/* 
        let newRoot = this.buildTree(numList); */
        return new Tree(numList);
    }

    inorder(root, travList = []) {
        if (root) {
            this.inorder(root.left, travList);
            travList.push(root.data);
            this.inorder(root.right, travList);
        }
        return travList;
    }

    preorder(root, travList = []) {
        if (root) {
            travList.push(root.data);
            this.preorder(root.left, travList);
            this.preorder(root.right, travList);
        }

        return travList;
    }

    postorder(root, travList = []) {
        if (root) {
            this.postorder(root.left, travList);
            this.postorder(root.right, travList);
            travList.push(root.data);
        }

        return travList;
    }

    cleanData(list) {
        let newList = [];
        list.forEach(item => {
            if (!newList.includes(item)) {
                newList.push(item);
            }
        });
        return newList;
    }

    prettyPrint(node, prefix = '', isLeft = true) {
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }

    }
    
}
import { Node } from "./Node.js";

export class Tree {
    constructor(list) {
        this.numList = list;
        list = this.cleanData(list);
        list.sort(function(a, b){return a - b});
        console.log('Building tree from ' + list.length + ' item array: ' + list);
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
            console.log('dupe - ' + value + ' already in list');
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

    inorder(root) {
        if (root) {
            this.inorder(root.left);
            console.log(root.data);
            this.inorder(root.right);
        }
    }

    preorder(root) {
        if (root) {
            console.log(root.data);
            this.preorder(root.left);
            this.preorder(root.right);
        }
    }

    postorder(root) {
        if (root) {
            this.postorder(root.left);
            this.postorder(root.right);
            console.log(root.data);
        }
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
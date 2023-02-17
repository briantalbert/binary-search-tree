import { Tree } from "./Tree.js";


let myList = [];

myList = [2, 4, 6, 7, 1, 3, 5, 9, 8]

let myTree = new Tree(myList);

myTree.prettyPrint(myTree.root);

console.log('inorder traversal, root is: ' + myTree.root);
console.log(myTree.inorder(myTree.root));
console.log('preorder:');
console.log(myTree.preorder(myTree.root));
console.log('postorder:');
console.log(myTree.postorder(myTree.root));

let randInt = Math.floor(Math.random() * (10 - 1) + 1)
console.log('Removing ' + randInt + ' from tree.')
myTree.delete(myTree.root, randInt);
myTree.prettyPrint(myTree.root);

import { Tree } from "./Tree.js";

function squared(num) {
    return num * num;
}

let myList = [];

myList = [2, 4, 6, 7, 1, 3, 5, 9, 8]

let myTree = new Tree(myList);
let root = myTree.root;

myTree.prettyPrint(root);

console.log('inorder traversal:');
console.log(myTree.inorder(root));
console.log('preorder:');
console.log(myTree.preorder(root));
console.log('postorder:');
console.log(myTree.postorder(root));

let randInt = Math.floor(Math.random() * (10 - 1) + 1);
console.log('Removing ' + randInt + ' from tree.');
myTree.delete(root, randInt);
myTree.prettyPrint(root);
console.log('(putting it back)');
myTree.insert(randInt);
myTree.prettyPrint(root);

randInt = Math.floor(Math.random() * (10 - 1) + 1);
console.log('Attempting to find ' + randInt);
console.log(myTree.find(root, randInt)+"");
console.log('Level order traversal, running all numbers through squaring function');
console.log(myTree.levelOrder(root, squared));
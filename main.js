import { Tree } from "./Tree.js";

function squared(num) {
    return num * num;
}

function randomList(n, max) {
    let randList = [];
    for (let i = 0; i < n; i++) {
        let num = Math.floor(Math.random() * max);
        if (!randList.includes(num)) {
            randList.push(num);
        }
    }
    return randList;
}

function driver() {
    let myList = randomList(10, 20);
    console.log('Creating BST from array: ' + myList);
    let myTree = new Tree(myList);
    myTree.prettyPrint(myTree.root);
    console.log('Is this tree balanced? Calling isBalanced()');
    console.log(myTree.isBalanced(myTree.root) ? 'Yes it is!' : 'No it isn\'t!');
    console.log('');
    console.log('Various traversals:');
    console.log('Preorder:\t' + myTree.preorder(myTree.root));
    console.log('Postorder:\t' + myTree.postorder(myTree.root));
    console.log('Inorder:\t' + myTree.inorder(myTree.root));
    console.log('');
    console.log('Unbalancing list by adding large numbers.');
    let unbalancer = randomList(10, 200);
    console.log('Adding array: ' + unbalancer);
    
    unbalancer.forEach(number => {
        myTree.insert(number);
    });

    myTree.prettyPrint(myTree.root);
    console.log('Is this tree balanced? Calling isBalanced()');
    console.log(myTree.isBalanced(myTree.root) ? 'Yes it is!' : 'No it isn\'t!');
    console.log('');
    console.log('Rebalancing');
    myTree = myTree.rebalance();
    myTree.prettyPrint(myTree.root);
    console.log('Is this tree balanced now? Calling isBalanced()');
    console.log(myTree.isBalanced(myTree.root) ? 'Yes it is!' : 'No it isn\'t!');
    console.log('');
    console.log('Various traversals:');
    console.log('Preorder:\t' + myTree.preorder(myTree.root));
    console.log('Postorder:\t' + myTree.postorder(myTree.root));
    console.log('Inorder:\t' + myTree.inorder(myTree.root));
}

driver();
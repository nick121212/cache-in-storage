import { LinkedNode } from "./node";
export class LinkedList {
    constructor() {
        this.size = 0;
    }
    findLast() {
        let currNode = this.headNode;
        while (currNode && currNode.next) {
            currNode = currNode.next;
        }
        return currNode;
    }
    findWithElement(element) {
        let currNode = this.headNode;
        while (currNode && currNode.element !== element) {
            currNode = currNode.next;
        }
        return currNode;
    }
    insert(newEle, ele) {
        const newNode = new LinkedNode(newEle);
        if (!this.headNode) {
            this.headNode = newNode;
            this.size++;
            return;
        }
        const currNode = this.findWithElement(ele);
        if (!currNode) {
            throw new Error("can not find element" + ele);
        }
        this.insertNode(newNode, currNode);
    }
    insertToLast(newEle) {
        const lastNode = this.findLast();
        this.insertNode(new LinkedNode(newEle), lastNode);
    }
    moveToLast(ele, nullToInsert = false) {
        const lastNode = this.findLast();
        const currNode = this.findWithElement(ele);
        if (lastNode && currNode === lastNode) {
            return;
        }
        if (!currNode) {
            if (nullToInsert) {
                this.insertToLast(ele);
            }
            return;
        }
        if (currNode === this.headNode) {
            this.headNode = this.headNode.next;
            this.headNode.prev = undefined;
        }
        else {
            currNode.prev.next = currNode.next;
            currNode.next.prev = currNode.prev;
        }
        lastNode.next = currNode;
        currNode.prev = lastNode;
        currNode.next = undefined;
    }
    remove(ele) {
        const currNode = this.findWithElement(ele);
        if (!currNode) {
            return;
        }
        if (currNode === this.headNode) {
            this.headNode = this.headNode.next;
        }
        else {
            currNode.prev.next = currNode.next;
        }
        if (currNode.next) {
            currNode.next.prev = currNode.prev;
        }
        currNode.next = currNode.prev = undefined;
        this.size--;
    }
    removeFirst() {
        const firstNode = this.headNode;
        if (firstNode) {
            this.remove(firstNode.element);
        }
    }
    insertNode(newNode, currNode) {
        if (!currNode) {
            this.headNode = newNode;
            this.size++;
            return;
        }
        newNode.next = currNode.next;
        newNode.prev = currNode;
        currNode.next = newNode;
        this.size++;
    }
}
//# sourceMappingURL=linkedlist.js.map
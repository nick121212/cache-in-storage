import { LinkedNode } from "./node";

export class LinkedList<T> {
    public size: number = 0;
    public headNode?: LinkedNode<T>;

    /**
     * 找到最后一个节点
     * @returns {(LinkedNode<T> | undefined)}
     * @memberof LinkedList
     */
    public findLast(): LinkedNode<T> | undefined {
        let currNode = this.headNode;

        while (currNode && currNode.next) {
            currNode = currNode.next;
        }

        return currNode;
    }

    /**
     * 通过value值找到节点
     * @param {T} element 当前节点的数据
     * @returns {(LinkedNode<T> | undefined)}
     * @memberof LinkedList
     */
    public findWithElement(element: T): LinkedNode<T> | undefined {
        let currNode = this.headNode;

        while (currNode && currNode.element !== element) {
            currNode = currNode.next;
        }

        return currNode;
    }

    /**
     * 插入一个节点的数据
     * @param {T} newEle 需要插入的数据的值
     * @param {T} ele    插入到的数据的值
     * @returns {void}
     * @memberof LinkedList
     */
    public insert(newEle: T, ele: T): void {
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

    /**
     * 在末尾处插入元素
     * @param {T} newEle
     * @memberof LinkedList
     */
    public insertToLast(newEle: T) {
        const lastNode = this.findLast();

        this.insertNode(new LinkedNode(newEle), lastNode);
    }

    /**
     * 元素移动台队尾
     * @param {T} ele
     * @param {boolean} [nullToInsert=false]
     * @returns {void}
     * @memberof LinkedList
     */
    public moveToLast(ele: T, nullToInsert: boolean = false): void {
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

        // 如果是第一个元素，则处理头元素的值
        if (currNode === this.headNode) {
            this.headNode = this.headNode.next;
            this.headNode!.prev = undefined;
        } else {
            currNode.prev!.next = currNode.next;
            currNode.next!.prev = currNode.prev;
        }

        lastNode!.next = currNode;

        currNode.prev = lastNode;
        currNode.next = undefined;
    }

    /**
     * 移除一个节点
     * @param {T} ele
     * @returns {void}
     * @memberof LinkedList
     */
    public remove(ele: T): void {
        const currNode = this.findWithElement(ele);

        if (!currNode) {
            return;
        }

        if (currNode === this.headNode) {
            this.headNode = this.headNode.next;
        } else {
            currNode.prev!.next = currNode.next;
        }

        if (currNode.next) {
            currNode.next.prev = currNode.prev;
        }

        currNode.next = currNode.prev = undefined;

        this.size--;
    }

    /**
     * 移除第一个元素
     * @memberof LinkedList
     */
    public removeFirst(): void {
        const firstNode = this.headNode;

        if (firstNode) {
            this.remove(firstNode.element);
        }
    }

    /**
     * 在当前节点处插入一个节点
     * @private
     * @param {LinkedNode<T>} newNode
     * @param {LinkedNode<T>} [currNode]
     * @returns
     * @memberof LinkedList
     */
    private insertNode(newNode: LinkedNode<T>, currNode?: LinkedNode<T>) {
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

import { LinkedNode } from "./node";
export declare class LinkedList<T> {
    size: number;
    headNode?: LinkedNode<T>;
    findLast(): LinkedNode<T> | undefined;
    findWithElement(element: T): LinkedNode<T> | undefined;
    insert(newEle: T, ele: T): void;
    insertToLast(newEle: T): void;
    moveToLast(ele: T, nullToInsert?: boolean): void;
    remove(ele: T): void;
    removeFirst(): void;
    private insertNode;
}

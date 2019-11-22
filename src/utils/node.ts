/**
 * 双向链表结构
 * @export
 * @class LinkedNode
 * @template T
 */
export class LinkedNode<T> {
    public next?: LinkedNode<T>;
    public prev?: LinkedNode<T>;

    constructor(public element: T) {}
}

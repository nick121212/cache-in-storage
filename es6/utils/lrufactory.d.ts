import { BaseFactory } from "./factory";
export declare class LRUFactory extends BaseFactory {
    limit: number;
    private linkList;
    constructor(limit?: number);
    setItem(key: string, instance: any): void;
    removeItem(key: string): void;
    getItem(key: string): string | null;
}

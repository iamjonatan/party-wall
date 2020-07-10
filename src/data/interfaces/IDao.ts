export default interface Dao<T> {
    get(id:string): Promise<T | null>;
    getAll():Promise<T[]>;
    save(t: T): Promise<T>;
    update(t: T): Promise<T | null>;
    delete(id: string): Promise<void>;
}

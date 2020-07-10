import {Inject, Service} from "typedi";
import ItemDao from "../data/data-access-objects/item-dao";
import {IItem } from "../data/interfaces/IItem";


@Service()
export default class ItemService {
    constructor(
        @Inject('itemDao') private itemDao: ItemDao
    ) {}

    public async createItem(itemInput:IItem):Promise<{ item: IItem }> {
        let itemRecord = await this.itemDao.save(itemInput);
        const item = itemRecord.toObject();
        return { item };
    }

    public async removeItem(id:string): Promise<boolean> {
        await this.itemDao.delete(id);
        return true;
    }

    public async viewAllItems():Promise<IItem[]> {
        let items = await this.itemDao.getAll();
        return items;
    }

}

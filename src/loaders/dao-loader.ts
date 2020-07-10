import UserDao from "../data/data-access-objects/user-dao";
import ItemDao from "../data/data-access-objects/item-dao";

export default (): { name: string; model: any }[] => {
    return [
        {
            name: 'userDao',
            model: new UserDao(require('../data/models/user').default),
        },
        {
            name: 'itemDao',
            model: new ItemDao(require('../data/models/item').default),
        }
    ]
};

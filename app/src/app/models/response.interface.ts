import Pagination from './pagination.interface';
import Item from './item.interface';

export default interface Response {
    data: Item[],
    pagination: Pagination;
}
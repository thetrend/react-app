import { ListProps, ItemProps, Stories, Story } from './App';
import cn from 'classnames';
import { sortBy } from 'lodash';
import styles from './App.module.css';

import { ReactComponent as Check } from './assets/check.svg';
import React from 'react';

const SORTS: any = {
  NONE: (list: any) => list,
  TITLE: (list: any) => sortBy(list, 'title'),
  AUTHOR: (list: any) => sortBy(list, 'author'),
  COMMENT: (list: any) => sortBy(list, 'num_comments').reverse(),
  POINT: (list: any) => sortBy(list, 'points').reverse(),
};

type SortProps = {
  sortKey: string;
  isReverse: boolean;
}

const List = ({ list, onRemoveItem }: ListProps) => {
  const [sort, setSort] = React.useState<SortProps>({
    sortKey: 'NONE',
    isReverse: false,
  });

  const handleSort = (sortKey: string) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;

    setSort({ sortKey: sortKey, isReverse: isReverse });
  };

  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReverse
    ? sortFunction(list).reverse() 
    : sortFunction(list);
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <span style={{ width: '40%' }}>
          <button type="button" onClick={() => handleSort('TITLE')}>
            Title
          </button>
        </span>
        <span style={{ width: '30%' }}>
          <button type="button" onClick={() => handleSort('AUTHOR')}>
            Author
          </button>
        </span>
        <span style={{ width: '10%' }}>
          <button type="button" onClick={() => handleSort('COMMENT')}>
            Comments
          </button>
        </span>
        <span style={{ width: '10%' }}>
          <button type="button" onClick={() => handleSort('POINT')}>
            Points
          </button>
        </span>
        <span style={{ width: '10%' }}>
          Actions
        </span>
      </div>
      {sortedList.map((item: Story) => (
        <Item
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
};

const Item = ({
  item,
  onRemoveItem
}: ItemProps) => {
  const handleRemoveItem = () => onRemoveItem(item);

  return (
    <div className={styles.item} style={{ display: 'flex' }} key={item.objectID}>
      <span style={{ width: '40%' }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: '30%' }}>{item.author}</span>
      <span style={{ width: '10%' }}>{item.num_comments}</span>
      <span style={{ width: '10%' }}>{item.points}</span>
      <span style={{ width: '10%' }}>
        <button
          type="button"
          onClick={handleRemoveItem}
          className={cn(styles.button, styles.buttonSmall)}
        >
          <Check height="18px" width="18px" />
        </button>
      </span>
    </div>
  );
};

export default List;
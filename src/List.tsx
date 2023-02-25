import { ListProps, ItemProps } from './App';
import cn from 'classnames';

import styles from './App.module.css';

import { ReactComponent as Check } from './assets/check.svg';

const List = ({ list, onRemoveItem }: ListProps) =>
  <>
    {list.map(item => (
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </>
  ;

const Item = ({
  item,
  onRemoveItem
}: ItemProps) => {
  const handleRemoveItem = () => onRemoveItem(item);

  return (
    <div className={styles.item} key={item.objectID}>
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
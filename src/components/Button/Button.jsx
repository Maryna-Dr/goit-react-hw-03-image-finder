import css from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <button onClick={onClick} className={css.btn} type="button">
      Load more
    </button>
  );
}

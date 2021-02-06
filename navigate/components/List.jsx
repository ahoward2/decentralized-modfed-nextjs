const List = ({ listItems }) => {
  const items = listItems.map((item) => (
    <a key={item.title} href={item.url}>
      <li key={item.title}>{item.title}</li>
    </a>
  ));

  return <ul>{items}</ul>;
};

export default List;

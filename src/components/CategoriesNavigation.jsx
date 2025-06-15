import { Link } from "react-router-dom";

function CategoriesNavigation({ categories }) {
  function getLink(i) {
    let link = "/products/";

    for (let index = 0; index <= i; index++) {
      link += categories[index].name + "/";
    }

    return link;
  }

  return (
    <div className="my-4">
      <Link to="/">
        <span className="hover:underline">Home</span> /{" "}
      </Link>

      {categories.map((category, i) => {
        return (
          <Link to={getLink(i)} key={category._id}>
            <span className="hover:underline">{category.name}</span>
            {i !== categories.length - 1 && " / "}
          </Link>
        );
      })}
    </div>
  );
}

export default CategoriesNavigation;

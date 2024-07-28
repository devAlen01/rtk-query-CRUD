import { FormEvent, ChangeEvent, useState } from "react";
import { crudApi } from "./redux/api/crudApi";

const App = () => {
  const { data: product } = crudApi.useGetProductQuery();
  const [createProduct] = crudApi.usePostProductMutation();
  const [removeItem] = crudApi.useDelProductMutation();
  const [editProduct] = crudApi.useUpdateProductMutation();

  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");

  // update
  const [update, setUpdate] = useState(false);
  const [newData, setNewData] = useState({
    newImage: "",
    newTitle: "",
    id: +"",
  });

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    const edit = {
      image: newData.newImage,
      title: newData.newTitle,
    };
    await editProduct({ id: newData.id, editProd: edit });
    setUpdate(false);
  };

  // update

  const addProduct = (e: FormEvent) => {
    e.preventDefault();
    const newProd = {
      image,
      title,
    };
    createProduct(newProd);
    setImage("");
    setTitle("");
  };

  return (
    <div>
      <div className="container">
        <div className="content">
          <h1>
            RTK QUERY <b>CRUD</b>
          </h1>
          <div className="form">
            <form>
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  update
                    ? setNewData({ ...newData, newImage: e.target.value })
                    : setImage(e.target.value);
                }}
                value={update ? newData.newImage : image}
                type="text"
                placeholder="imgURL"
              />
              <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  update
                    ? setNewData({ ...newData, newTitle: e.target.value })
                    : setTitle(e.target.value);
                }}
                value={update ? newData.newTitle : title}
                type="text"
                placeholder="Title"
              />
              {update ? (
                <button className="edit" type="submit" onClick={handleEdit}>
                  Save
                </button>
              ) : (
                <button className="create" type="submit" onClick={addProduct}>
                  Create
                </button>
              )}
            </form>
          </div>
          <div className="product">
            {product?.map((el) => (
              <div key={el._id} className="items">
                <img src={el.image} alt="img" />
                <h4>{el.title}</h4>
                <div className="btns">
                  <button
                    className="btn_del"
                    onClick={() => removeItem(el._id!)}
                  >
                    Remove
                  </button>
                  <button
                    className="btn_edit"
                    onClick={() => {
                      setUpdate(true);
                      setNewData({
                        newImage: el.image,
                        newTitle: el.title,
                        id: el._id!,
                      });
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

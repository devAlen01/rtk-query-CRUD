interface IProduct {
  _id?: number;
  title: string;
  image: string;
}

namespace CRUD {
  interface postReq {
    title: string;
    image: string;
  }
  type getReq = void;
  type delReq = number;
}

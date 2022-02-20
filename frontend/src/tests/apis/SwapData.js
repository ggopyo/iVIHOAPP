import React from "react";
import { dataRequest } from "../requestMethod";
const SwapData = () => {
  const getOneData = async (id1, id2) => {
    let res1, res2, mod1, mod2;
    try {
      res1 = await dataRequest.get("/howto/find/" + id1);
      res2 = await dataRequest.get("/howto/find/" + id2);

      var { owner, title, link, desc, cat, poststatus, history } = res1.data;
      history = [...history, owner];
      var swap_owner = res2.data.owner;
      let mod_input1 = {
        owner: swap_owner,
        title,
        link,
        desc,
        cat,
        poststatus,
        history,
      };

      var { owner, title, link, desc, cat, poststatus, history } = res2.data;
      history = [...history, owner];
      var swap_owner = res1.data.owner;
      let mod_input2 = {
        owner: swap_owner,
        title,
        link,
        desc,
        cat,
        poststatus,
        history,
      };

      await dataRequest.delete("/howto/find/" + id1);
      await dataRequest.delete("/howto/find/" + id2);

      mod1 = await dataRequest.post("/howto", mod_input1);
      mod2 = await dataRequest.post("/howto", mod_input2);
    } catch (err) {
      console.log(err);
    }
  };

  getOneData("61ba1c3f77ed9761e6e44446", "61ba1c3f77ed9761e6e44448"); // get one howto

  //create
  const createData = async (howto_data) => {
    try {
      var res = await dataRequest.post("/howto", howto_data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }; //createa
  //createData(howto_data[2]);
  // get one howto

  //get All Data
  const getAllData = async () => {
    try {
      var res = await dataRequest.get("/howto/find/");
    } catch (err) {
      console.log(err);
    }
  }; // getAllData
  //getAllData();

  const ht = {
    //update howto
    _id: "61b9c58bbbcb44c7e9c50bbf",
    owner: "hp.hong@hotmail.com",
    title: "무생채 맛있게 하는법 비법 공개",
    link: "maisondebianco.tistory.com/639",
    desc: "또또 채를 썰어 주는데 채칼을 이용해도 좋고, 먼저 무를 얇게 5mm...",
    cat: "food",
    poststatus: "not for sale",
    history: "",
  };

  const updateOneData = async (id, ht) => {
    try {
      var res = await dataRequest.put("/howto/find/" + id, ht);
      console.log(1, res);
    } catch (err) {
      console.log(err);
    }
  }; //update howto
  //updateOneData("61b9c58bbbcb44c7e9c50bbf", ht);

  const deleteOneData = async (id) => {
    try {
      var res = await dataRequest.delete("/howto/find/" + id);
      console.log(1, res);
    } catch (err) {
      console.log(err);
    }
  }; //update howto

  //deleteOneData("61b9c58bbbcb44c7e9c50bbf");
  return (
    <div>
      {/* <div>{JSON.stringify(image_data)}</div>
      <br />
      <div>{JSON.stringify(location_data)}</div>
      <br />
      <div>{JSON.stringify(howto_data)}</div>
      <br /> */}
    </div>
  );
};

export default SwapData;

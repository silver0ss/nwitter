import React, { useEffect, useState } from "react";
import { dbService, dbAddDoc, dbCollection, dbGetDoc } from "fbase";

const Home = () => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    try {
      const querySnapshot = await dbGetDoc(dbCollection(dbService, "nweets"));
      querySnapshot.forEach((document) => {
        const nweetObject = {
          ...document.data(),
          id: document.id,
        };
        setNweets((prev) => [nweetObject, ...prev]);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNweets();
  }, []);
  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const docRef = await dbAddDoc(dbCollection(dbService, "nweets"), {
        nweet,
        createAt: Date.now(),
      });
      console.log("Document written with ID: ", docRef);
    } catch (error) {
      console.log(error);
    }
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
    console.log(nweets);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.nweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;

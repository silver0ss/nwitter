import React, { useEffect, useState } from "react";
import { dbService, dbAddDoc, dbCollection } from "fbase";
import { onSnapshot, orderBy, query } from "firebase/firestore";

const Home = ({ userId }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  //   const getNweets = async () => {
  //     try {
  //       const querySnapshot = await dbGetDoc(dbCollection(dbService, "nweets"));
  //       querySnapshot.forEach((document) => {
  //         const nweetObject = {
  //           ...document.data(),
  //           id: document.id,
  //         };
  //         setNweets((prev) => [nweetObject, ...prev]);
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  useEffect(() => {
    // getNweets();
    const q = query(
      dbCollection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const docRef = await dbAddDoc(dbCollection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userId,
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
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;

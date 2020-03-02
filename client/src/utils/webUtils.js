import React from "react";
import quote from "../utils/getQuoteEXI";
import { auth, firestore } from "../firebase/firebase.utils";

export const getPortfolio = async currentUser => {
  console.log("getPortfolio currentUser: ", currentUser);
  const portfolioArr = [];
  await firestore
    .collection("users")
    .doc(currentUser.uid)
    .collection("portfolio")
    .get()
    .then(querySnapShot => {
      querySnapShot.forEach(doc => {
        //console.log(doc.id, doc.data());
        portfolioArr.push(doc.data());
      });
    });
  return portfolioArr;
};

export const getTransactions = async currentUser => {
  const transactionArr = [];
  //console.log("getTransactions webUtils currentUser - ", currentUser);

  await firestore
    .collection("users")
    .doc(currentUser.id)
    .collection("transactions")
    .get()
    .then(querySnapShot => {
      querySnapShot.forEach(doc => {
        //console.log(doc.id, doc.data());
        transactionArr.push(doc.data());
      });
    });
  return transactionArr;
};

// export const getTodaysQuote = async portfolio => {
//   let today = {};
//   let colors = {};

//   console.log("getTodaysQuote utils: ", portfolio);

//   await portfolio.map(async ({ ticker, latestPrice }) => {
//     const quoteData = await quote(ticker);
//     console.log("Mapping through portfolio: ", ticker, typeof ticker);

//     today[ticker] = [
//       parseFloat(quoteData.open) || parseFloat(latestPrice),
//       quoteData.latestPrice
//     ];
//     console.log("Today **** ", today[ticker][0]);

//     if (today[ticker][0] > today[ticker][1]) {
//       colors[ticker] = "red";
//     } else if (today[ticker][0] < today[ticker][1]) {
//       colors[ticker] = "green";
//     } else {
//       colors[ticker] = "gray";
//     }
//   });
//   return { colors, today };
// };

export const getTodaysQuote = async portfolio => {
  const promises = portfolio.map(async ({ ticker, latestPrice }) => {
    const quoteData = await quote(ticker);
    let today = [
      parseFloat(quoteData.open) || parseFloat(latestPrice),
      quoteData.latestPrice
    ];

    let color = undefined;
    if (today[0] > today[1]) {
      color = "red";
    } else if (today[0] < today[1]) {
      color = "green";
    } else {
      color = "gray";
    }

    return { ticker: ticker, latest: today, color: color };
  });

  const results = await Promise.all(promises);

  let today = {};
  let colors = {};

  results.map(({ ticker, latest, color }) => {
    today[ticker] = latest;
    colors[ticker] = color;
  });

  return { today, colors };
};

//  export const getCurrentUserData = async (user) => {
//   const userRef = await firestore.doc(`users/${user.uid}`);
//   const userData;

//   await userRef.onSnapshot(snapShot => {
//     userData = snapShot.data()
//   });

//   return userData;
// };

export const handleChange = event => {
  this.setState({
    [event.target.name]: event.target.value
  });
};

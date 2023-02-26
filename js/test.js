const sensors = [
    "Face ID",
    "accelerometer",
    "gyro",
    "proximity",
    "compass",
    "barometer"
  ] ; 
/* 
  for (const item of sensors) {
    // console.log(item);
    let test = item.toString() ;

    console.log(test.split(' ,'));

  } */
const test = sensors.join(' ,') ;
// console.log(test);  
const dreamGirl = [
  {
   sokina: {
    name: "bbu",
    height: "5.4",
    family: [{ father: "rock", mother: "shila", sister: "chinki" }],
    age: undefined,
    contactInfo: [
     {
      facebook: {
       link: "https://www.facebook.com/",
       followers: "12545",
       status: "single",
       friendsList: [{ name: "rofik" }, undefined],
      },
     },
     { instagram: "https://www.instagram.com/" },
    ],
   },
  },
 ];

// const testt = dreamGirl[0].contactInfo[1].instagram  
const instagram = dreamGirl[0].sokina.contactInfo[1].instagram
console.log(instagram);
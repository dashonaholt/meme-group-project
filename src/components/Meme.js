import React, {useEffect, useState} from "react";

const Meme = () => {
  const [randImage, setRandImage] = useState("");

  const [image, setImage] = useState([]);

  let bg = {
    backgroundImage: `url(${randImage.url})`
  }
  useEffect(() => {
    console.log("Effect Ran")
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => {
        setImage(data.data.memes)
      let randNum = Math.floor(Math.random() * data.data.memes.length); //random number gen
      let url = data.data.memes[randNum];
      setRandImage(url);
      console.log("url", randImage)
      bg = {
        backgroundImage: "url("+data.data.memes[randNum].url+")"
      }
      console.log(bg)
      })
    }, []);

  function changeImage() {
    let randNum = Math.floor(Math.random() * image.length);
    let url = image[randNum];
    setRandImage(url);
    bg = {
      backgroundImage: "url("+image[randNum].url+")"
    }
  }
  console.log(randImage, "test randImage")
  
  const [myInput, setMyInput] = React.useState({
    topText: "",
    bottomText: "",
  });

  function eChange(event) {
    setMyInput((prevInput) => {
      return {
        ...prevInput,
        [event.target.name]: event.target.value,
      };
    });
  }
  ///////created a new state to hold the names array 
  // mapped over the namesarray items in the array for them to display

  const [namesArray, setNamesArray] = React.useState([])
  const namesElement = namesArray.map(item => {
    return <div>
      <h3 className="image-toptext">{item.topText}</h3>
      <img src={item.image} className="image-image"></img>
      <h3 className="image-bottomtext">{item.bottomText}</h3>
      </div>
  })

  function handleSubmit(event) {
    event.preventDefault()
    setNamesArray(prev => (
      [
      ...prev, 
      {topText: myInput.topText, 
      bottomText: myInput.bottomText,
      image: randImage.url
      }
    ]
      
    ))
  }

  function deleteBtn(event){
    event.preventDefault()
    setNamesArray(
      [
      {topText: "", 
      bottomText: "",
      image: ""
      }
    ]
      
    )
  }
  function editBtn(event){

  }

  return (
    <div className="meme">
      <div className="meme-input">
        <input
          className="top-input"
          type="text"
          name="topText"
          value={myInput.topText}
          onChange={eChange}
          placeholder="Top Text"
        />
        <input
          className="bottom-input"
          type="text"
          name="bottomText"
          value={myInput.bottomText}
          onChange={eChange}
          placeholder="Bottom Text"
        />
      </div>
      <div className="meme-button">
        <button type="button" onClick={changeImage}>
          New Meme Image
        </button>
      </div>
      <div className="meme-image" style={bg}>
        <p className="top-text">{myInput.topText}</p>
        <p className="bottom-text">{myInput.bottomText}</p>
        {/* created a ol for the names Element to sit in to display on the page */}
        <button className="submitButton" onClick={handleSubmit}>Submit</button>
        <button className="deleteButton" onClick={deleteBtn} >delete</button>
        <button className="editButton"onClick={editBtn} >edit</button>
      </div>
        {namesElement}

    </div>
  );
};

export default Meme;

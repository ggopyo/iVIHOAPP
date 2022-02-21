import { dataRequest, publicRequest } from "./apiCalls/general/requestMethod";
import { afs } from "./apiCalls/general/tryData";

export const getCurrentUser = async (currentUser) => {
  try {
    const returnedHowto = await publicRequest.get(
      "/data/howto/by/" + currentUser._id
    );
    const returnedImage = await publicRequest.get(
      "/data/image/by/" + currentUser._id
    );
    const returnedYoutube = await publicRequest.get(
      "/data/youtube/by/" + currentUser._id
    );

    const tempPosts = {
      youtube: [...returnedYoutube.data],
      image: [...returnedImage.data],
      howto: [...returnedHowto.data],
    };

    const tempArray = [
      ...returnedYoutube.data,
      ...returnedHowto.data,
      ...returnedImage.data,
    ];

    let dataCount = tempArray.length;
    let commentsCount = 0;
    let likesCount = 0;
    let swapsCount = 0;

    tempArray.map((item, index) => {
      commentsCount += item.comments.length;
      likesCount += item.likes.length;
      return null;
    });
    const tempStatistic = {
      dataCount,
      commentsCount,
      likesCount,
      swapsCount,
    };

    let newArray = [];

    for (var i = 0; i < tempArray.length; i++) {
      newArray.push({
        id: i + 1,
        title: tempArray[i].title,
        identifier: tempArray[i].identifier,
        desc: tempArray[i].desc,
        like: tempArray[i].likes.length,
        core:
          tempArray[i].identifier === "image"
            ? tempArray[i].core.eitherType === "link"
              ? tempArray[i].core.data.link.substring(0, 40)
              : "파일"
            : tempArray[i].core.substring(0, 40),
        comments: tempArray[i].comments.length,
        createdAt: new Date(tempArray[i].createdAt).toISOString().split("T")[0],
        updatedAt: tempArray[i].updatedAt
          ? new Date(tempArray[i].updatedAt).toISOString().split("T")[0]
          : "-",
      });
    }
    return [tempPosts, tempStatistic, newArray, tempArray];
  } catch (err) {
    console.log(err);
  }
};

export const searchContents = async (mySearchText, currentUser) => {
  try {
    const res = await dataRequest.post("/data/search/" + mySearchText, {
      userid: currentUser._id,
    });

    const { returnedYoutubeData, returnedHowtoData, returnedImageData } =
      res.data;

    const tempArray = [
      ...returnedYoutubeData,
      ...returnedHowtoData,
      ...returnedImageData,
    ];
    let newArray = [];

    for (var i = 0; i < tempArray.length; i++) {
      newArray.push({
        id: i + 1,
        title: tempArray[i].title,
        identifier: tempArray[i].identifier,
        desc: tempArray[i].desc,
        like: tempArray[i].likes.length,
        core:
          tempArray[i].identifier === "image"
            ? tempArray[i].core.eitherType === "link"
              ? tempArray[i].core.data.link.substring(0, 40)
              : "파일"
            : tempArray[i].core.substring(0, 40),
        comments: tempArray[i].comments.length,
        createdAt: new Date(tempArray[i].createdAt).toISOString().split("T")[0],
        updatedAt: tempArray[i].updatedAt
          ? new Date(tempArray[i].updatedAt).toISOString().split("T")[0]
          : "-",
      });
    }

    return [newArray, tempArray];
  } catch (err) {
    alert("오류");
    console.log(err);
  }
};
export const searchAllContents = async (searchText) => {
  try {
    const res = await dataRequest.get("/data/search/" + searchText);
    const { returnedYoutubeData, returnedHowtoData, returnedImageData } =
      res.data;

    const tempArray = [
      ...returnedYoutubeData,
      ...returnedHowtoData,
      ...returnedImageData,
    ];
    return tempArray;
  } catch (err) {
    alert("오류");
    console.log(err);
  }
};

export const updateArray = (myPosts, post, identifier) => {
  let updatedArray;
  let tempPosts;
  switch (identifier) {
    case "image":
      updatedArray = [...myPosts.image];
      updatedArray.unshift(post);
      let { image, ...otherImage } = myPosts;
      tempPosts = { ...otherImage, image: updatedArray };
      return tempPosts;

    case "youtube":
      updatedArray = [...myPosts.youtube];
      updatedArray.unshift(post);
      let { youtube, ...otherYoutube } = myPosts;
      tempPosts = { ...otherYoutube, youtube: updatedArray };
      return tempPosts;
    case "howto":
      updatedArray = [...myPosts.howto];
      updatedArray.unshift(post);
      let { howto, ...otherHowto } = myPosts;
      tempPosts = { ...otherHowto, howto: updatedArray };
      return tempPosts;
    default:
      break;
  }
};

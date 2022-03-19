import React, { useEffect, useState, useRef } from "react";
import { fetchImageUrls } from "../../api/index";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ImageCarousel = () => {
    const [allImageUrls, setAllImageUrls] = useState([]);
    const [currentImg, setCurrentImg] = useState({"url": "", "number": ""});
    const imgElement = useRef(null);
    const loadingElement = useRef(null);

    useEffect(()=>{
        imgElement.current.style.visibility = "hidden";
        loadingElement.current.style.visibility = "visible"; 
        fetchImageUrls().then((imageUrls)=>{
            setAllImageUrls(imageUrls);
            setCurrentImg({"url": imageUrls[0] , "number" : 0});
        });
    },[])

    const scrollRight = () =>{
        imgElement.current.style.visibility = "hidden";
        loadingElement.current.style.visibility = "visible"; 
        if(currentImg.number + 1 > allImageUrls.length - 1){
            setCurrentImg({
                "url": allImageUrls[(currentImg.number + 1 - allImageUrls.length)],
                "number" : (currentImg.number + 1 - allImageUrls.length)
            });
            return;
        }
        setCurrentImg({
            "url": allImageUrls[currentImg.number + 1],
            "number" : currentImg.number + 1
        });
    }

    const scrollLeft = () =>{
        imgElement.current.style.visibility = "hidden";
        loadingElement.current.style.visibility = "visible"; 
        if(currentImg.number - 1 < 0){
            setCurrentImg({
                "url": allImageUrls[(currentImg.number - 1 + allImageUrls.length)],
                "number" : (currentImg.number - 1 + allImageUrls.length)
            });
            return;
        }
        setCurrentImg({
            "url": allImageUrls[currentImg.number - 1],
            "number" : currentImg.number - 1
        });
    }

    const onImgLoaded = () =>{
        imgElement.current.style.visibility = "visible";
        loadingElement.current.style.visibility = "hidden"; 
    }

    return(
        <div>
            <h1 className="mainHeader">
                Image Gallery
            </h1>
            <div className="container">
                <ChevronLeftIcon onClick={scrollLeft}/>
                <div className="loadingElement" ref={loadingElement}></div> 
                <img ref={imgElement} className="img" onLoad={onImgLoaded} src={currentImg.url}/>
                <ChevronRightIcon onClick={scrollRight} />
            </div>
        </div>
    )
};
export default ImageCarousel;

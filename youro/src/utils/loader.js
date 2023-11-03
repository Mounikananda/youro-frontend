import React from "react";
import "../styles/loader.css";
import { MutatingDots } from "react-loader-spinner";

const Loader = (props) => {
    return (
        <>
            {props.active === true && 
                <div class="overlay">
                <div class="overlay__inner">
                    <div class="overlay__content"><MutatingDots 
                        height="100"
                        width="100"
                        color="#E5FF7E"
                        secondaryColor= '#E5FF7E'
                        radius='12.5'
                        ariaLabel="mutating-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        style={{zIndex: '1000'}}
                        /></div>
                </div>
            </div>
            }
        </>
    )
}

export default Loader;
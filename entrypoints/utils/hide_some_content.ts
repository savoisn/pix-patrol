import { urls } from "../models/blacklist.js";


export const isBlacklisted = (href:string) => {
    for(const url of urls){
        if(href.toLowerCase().indexOf(url) >= 0){
            return true;
        }
    }
    return false

};

export const blurClassContent = (klass:string, document:Document) => {

    let results = document.getElementsByClassName(klass);

    for (const result of results){
        const result_header = result.getElementsByClassName("yuRUbf")[0];
        if(result_header){
            const result_header_anchor = result_header.getElementsByTagName("a")[0].href;
            if(isBlacklisted(result_header_anchor)){
                const div = document.createElement("div");
                //div.setAttribute("style","pointer-events:none; user-select: none;");
                div.style.pointerEvents="none";
                div.style.userSelect="none";
                result.parentNode.insertBefore(div, result);

                div.appendChild(result);
                result.setAttribute("style", "filter: blur(0.5rem);")
            }
        }


    }
}

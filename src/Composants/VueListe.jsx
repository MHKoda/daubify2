import React from "react"

function VueListe({ groupeInfos, idInfo, classImg, imageUrl, altImage, mainInfo }) {
    return (
        <div>
            <li className={groupeInfos} key={idInfo}>
                
                <img className={classImg} style={{ width: '100px', height: '100px' }} src={imageUrl} alt={altImage} />
                <h3 className='mainInfo'>{mainInfo}</h3>
            </li>
        </div>
    )
}

export default VueListe
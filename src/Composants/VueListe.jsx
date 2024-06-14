import React from "react"
import { Link } from "react-router-dom"

function VueListe({ groupeInfos, idInfo, linkToObject, classImg, imageUrl, altImage, mainInfo }) {
    return console.log('rede'), (
        <div>
            <Link to={'http://localhost:5173/'+linkToObject}>
            <li className={groupeInfos} key={idInfo}>
                
                <img className={classImg} style={{ width: '100px', height: '100px' }} src={imageUrl} alt={altImage} />
                <h3 className='mainInfo'>{mainInfo}</h3>
            </li>
            </Link>
        </div>
    )
}

export default VueListe
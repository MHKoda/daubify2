import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function MenuGauche() {
    useEffect(() => {
        function openLeftMenu() {
            const profilpic = document.getElementById('profilpic');
            const leftPannel = document.getElementById('leftPannel');

            profilpic.addEventListener('click', () => {
                if (leftPannel.classList.contains('notHidden')) {
                    leftPannel.classList.remove('notHidden');
                    leftPannel.classList.add('hidden');
                } else {
                    leftPannel.classList.remove('hidden');
                    leftPannel.classList.add('notHidden');
                }
            });
        }

        openLeftMenu();

        // Nettoyage de l'écouteur d'événement lors du démontage du composant
        return () => {
            const profilpic = document.getElementById('profilpic');
            profilpic.removeEventListener('click', openLeftMenu);
        };
    }, []); // [] pour exécuter useEffect une seule fois après le montage

    return (
        <div id="menuGauche">
            <div id="profilpic" style={{ display: 'flex' }}>
                <img style={{ padding: '20px', width: '75px', height: '75px', borderRadius: '50%' }} src="/src/Medias/FEEFAL_KICKSTARTER-PHONE-BACKGROUND_SEA_WITCH.jpg" alt="imageprofil" />
            </div>

            <div id="leftPannel" className="hidden">
                <div id="onglets">
                    <h2><Link to={'/'}>Accueil</Link></h2>
                    <h2><Link to={'/liste-artistes'}>Les Artistes</Link></h2>
                    <h2><Link to={'/liste-albums'}>Les Albums</Link></h2>
                </div>
            </div>
        </div>
    );
}

export default MenuGauche;

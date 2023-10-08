import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ImagePreview({ images }) {


    const deleteImage = async (e,imageId, imagePath) => {
        console.log('event',e)
        e.stopPropagation()
        console.log('pour la suppression d',imageId,imagePath)
        const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cette image ?");
        if (confirmDelete) {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_DOMAIN}deleteimg/${imageId}${imagePath}`);
            if (response.status === 200) {
                // Supprimez l'image du tableau ou rechargez les données ici
                console.log('Image supprimée');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'image:', error);
        }
    }//fin du if du confirmDelete
    };
    
    return (
        <ul className="flex-row">
            {images.map((image, index) => (
                <li  key={index}>
                    {image ? ( 
                        image instanceof File ?
                            <img src={URL.createObjectURL(image)} alt="preview" className="previewIMG"/> :
                            <div className="imgPrev flex-column"><img src={`${process.env.REACT_APP_DOMAIN}${image.path}`} alt="preview" className="previewIMG" /><button onClick={(event) => {
                                console.log('image que je veux supprimer',image.imageId);
                                deleteImage(event,image.imageId, image.path)
                            }}>Supprimer</button></div>
                    ) : (
                        <p>Aucune image disponible</p>
                    )}
                </li>
            ))}
        </ul>
    );
};

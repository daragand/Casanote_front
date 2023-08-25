
import { useCallback } from 'react';
//npm pour drag and drop
import { useDropzone } from 'react-dropzone';

//composant de chargement des images en glisser-déposer. dès qu'une image est chargée, le useCallback entre en action et place les images dans la fonction

export default function ImageUploader  ({ onImagesSelected }) {
    const onDrop = useCallback(acceptedFiles => {
        // je Limite à 5 fichiers, l'ajout.
        if (acceptedFiles.length > 5) {
            alert("Vous ne pouvez télécharger que 5 fichiers à la fois.");
            return;
        }

        // je limite la taille des fichiers à 5mo. a voir si trop lourds. 
        for (let i = 0; i < acceptedFiles.length; i++) {
            if (acceptedFiles[i].size > 5 * 1024 * 1024) { 
                alert("Chaque fichier ne doit pas dépasser 5MB.");
                return;
            }
        }

        onImagesSelected(acceptedFiles);
    }, [onImagesSelected]);


    

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop,
        accept: 'image/jpeg, image/png, image/webp' 
     });

    return (

        // a voir si je place cela dans le css
        <div {...getRootProps()} style={{ border: '1px dashed gray', padding: '20px', textAlign: 'center' }}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Déposez les images ici...</p> :
                    <p>Glissez & déposez des images ici, ou cliquez pour sélectionner des fichiers</p>
            }
        </div>
    );
};



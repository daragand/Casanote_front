import SubMenu from "./SubMenuComp";
import { useItemToEdit } from "../../Partials/EditContext/EditContext";
import { useNavigate } from "react-router-dom";

const SubMenuHouse = ({ selectedLogement }) => {
  const { itemToEdit, setItemToEdit } = useItemToEdit();
  const navigate = useNavigate();

  const editHouse = () => {
    // J'instancie itemToEdit avec le logement sélectionné
    console.log("jai bien instancié itemToEdit", selectedLogement);
    const setItemToEditPromise = new Promise((resolve, reject) => {
      setItemToEdit(selectedLogement);
      resolve(); // Marquer la promesse comme résolue une fois que setItemToEdit est terminé
    });

    // Une fois la promesse résolue, vous pouvez naviguer vers la page suivante.
    setItemToEditPromise.then(() => {
      console.log("item to edit avec logement", itemToEdit);
      navigate(`/house/update/${selectedLogement.logementId}`);
    });
  };

  const houseLinks = [
    {
      label: "Modifier le logement",
      href: `/house/update/${selectedLogement.logementId}`,
      state: selectedLogement,
    },
    {
      label: "Supprimer le logement",
      href: "",
    },
    {
      label: "Céder le logement",
      href: "",
    },
  ];
  //j'envoie les liens, le logement et la fonction d'édition en props
  return (
    <SubMenu
      links={houseLinks}
      selectedLogement={selectedLogement}
      editHouse={editHouse}
    />
  );
};

export default SubMenuHouse;

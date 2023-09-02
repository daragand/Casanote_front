import SubMenu from "./SubMenuComp";

const SubMenuHouse = ({ selectedLogement }) => {
  console.log("Selected Logement in SubMenuHouse:", selectedLogement);
  const houseLinks = [
    {
      label: "Modifier le logement",
      href: `/house/update/${selectedLogement.logementId}`,
      state:  selectedLogement 
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

  return <SubMenu links={houseLinks} selectedLogement={selectedLogement}  />;
};

export default SubMenuHouse;

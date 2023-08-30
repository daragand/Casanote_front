import SubMenu from "./SubMenuComp";

const SubMenuHouse = () => {
  const houseLinks = [
    {
      label: "Modifier le logement",
      href: "#",
    },
    {
      label: "Supprimer le logement",
      href: "#",
    },
    {
      label: "Céder le logement",
      href: "#",
    },
  ];

  return <SubMenu links={houseLinks} />;
};

export default SubMenuHouse;

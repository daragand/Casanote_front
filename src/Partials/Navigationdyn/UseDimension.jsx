import { useEffect, useRef } from "react";

// Implémentation naïve - en réalité, on souhaiterait attacher
// un écouteur pour les événements de redimensionnement de la fenêtre. Utilisez également state/layoutEffect au lieu de ref/effect
// si cette mesure est importante pour le rendu initial côté client.
// Il serait plus sûr de retourner null pour les états non mesurés.

export default function UseDimensions (ref) {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensions.current.width = ref.current.offsetWidth;
    dimensions.current.height = ref.current.offsetHeight;
  }, []);

  return dimensions.current;
};

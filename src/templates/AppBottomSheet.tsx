import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useContext, useMemo } from "react";
import { ThemeContext } from "../context/ThemeContext";

const AppBottomSheet = React.forwardRef<any, any>((props, ref) => {
  const theme = useContext(ThemeContext);

  const { children } = props;

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={useMemo(() => [1, "90%"], [])}
      onAnimate={(_, to) => {}}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
      )}
      enableHandlePanningGesture={false}
      enableContentPanningGesture={false}
      backgroundStyle={{
        borderRadius: 5,
        backgroundColor: theme!.grayPrimary,
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 50,
      }}
    >
      {children}
    </BottomSheet>
  );
});
export default AppBottomSheet;

import React from "react";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { ScrollView, View } from "react-native";
import { ActivityIndicator, List } from "react-native-paper";
import { COLORS, FONTS } from "../../assets/constants";
import FeeDetailTable from "./FeeDetailTable";

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import TuiTionChart from "./TuiTionChart";
const TuitionList = ({ tuition }: { tuition: TuitionModel | undefined }) => {
  const theme = useContext(ThemeContext);
  if (tuition) {
    return (
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <TuiTionChart tuition={tuition} />
        {tuition.receiveAbleNotCompleteDtos
          .slice()
          .reverse()
          .map((e, i) => {
            return <TuiTionFeeItem e={e} isReceived={false} key={i} />;
          })}
        {tuition.receiveAbleDtos
          .slice()
          .reverse()
          .map((e, i) => {
            return <TuiTionFeeItem e={e} isReceived={true} key={i} />;
          })}
        <View
          style={{
            marginTop: 5,
            height: 80,
            width: "100%",
            backgroundColor: theme!.grayPrimary,
          }}
        />
      </ScrollView>
    );
  }

  return (
    <ActivityIndicator
      animating={true}
      color={theme!.secondary}
      style={{
        marginTop: 60,
      }}
    />
  );
};

const TuiTionFeeItem = ({ e, isReceived }: any) => {
  const theme = useContext(ThemeContext);
  let title: any;

  if (e) {
    title = e.name.split("_");
    title = `Học phí kì ${title[0]} năm học ${title[1]} - ${title[2]}`;
  }
  return (
    <List.Accordion
      style={{
        backgroundColor: theme!.primary,
        marginTop: 5,
        marginHorizontal: 10,
        borderRadius: 5,
      }}
      theme={{
        colors: { background: theme!.grayPrimary },
      }}
      titleStyle={{
        ...FONTS.h4,
        color: theme!.secondary,
      }}
      descriptionStyle={{
        ...FONTS.body4,
        color: theme!.graySecondary,
      }}
      title={
        e ? (
          title
        ) : (
          <ContentLoader
            width="180"
            height="15"
            foregroundColor={theme!.graySecondary}
            backgroundColor={theme!.grayPrimary}
          >
            <Rect x="0" y="0" width="100%" height="10" rx="5" />
          </ContentLoader>
        )
      }
      description={
        e ? (
          e.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₫"
        ) : (
          <ContentLoader
            width="100"
            height="8"
            foregroundColor={theme!.graySecondary}
            backgroundColor={theme!.grayPrimary}
          >
            <Rect x="0" y="0" width="100%" height="100%" rx="5" />
          </ContentLoader>
        )
      }
      left={(props) =>
        e ? (
          <List.Icon
            {...props}
            icon={isReceived ? "check" : "close"}
            color={isReceived ? COLORS.green : COLORS.red}
            style={{
              width: 50,
              height: 50,
              shadowColor: "#000",
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
              backgroundColor: theme!.primary,
              borderRadius: 50,
            }}
          />
        ) : (
          <ContentLoader
            width="50"
            height="50"
            foregroundColor={theme!.graySecondary}
            backgroundColor={theme!.grayPrimary}
          >
            <Circle x="25" y="25" r="25" />
          </ContentLoader>
        )
      }
    >
      <FeeDetailTable details={e?.details} />
    </List.Accordion>
  );
};

export default TuitionList;

// else {
//   const dummy = Array.from(new Array(4), (_, i) => i);

//   return (
//     <ScrollView
//       style={{
//         flex: 1,
//         paddingVertical: 10,
//       }}
//     >
//       {dummy.map((e, i) => (
//         <TuiTionFeeItem e={undefined} isReceived={true} key={i} />
//       ))}
//     </ScrollView>
//   );
// }

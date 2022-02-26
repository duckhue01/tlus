import React, { useContext } from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View, Text } from "react-native";
import { List } from "react-native-paper";
import { FONTS } from "../assets/constants";
import MarkIcon from "../assets/svg/MarkIcon";
import { ThemeContext } from "../context/ThemeContext";
import DetailTable from "./ScoreDetailTable";

const MarkItem = ({ type, title, details, percent }: any) => {
  const theme = useContext(ThemeContext);
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
        width: "100%",
      }}
      descriptionStyle={{
        width: "100%",
      }}
      title={<AccTitle title={title} />}
      description={
        <PercentComponent percent={percent} />

      }
      left={(props) => (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            shadowColor: "#000",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3,
            backgroundColor: theme!.primary,
            marginHorizontal: 20,
          }}
        >
          <MarkIcon type={type} />
        </View>
      )}
    >
      <DetailTable details={details} />
    </List.Accordion>
  );
};

const AccTitle = ({ title }: { title: number | undefined }) => {
  const theme = useContext(ThemeContext);
  if (title !== undefined) {
    return (
      <Text
        style={{
          ...FONTS.h4,
          color: theme!.secondary
        }}

      >
        {`Tín chỉ tích lũy : ${title}`}
      </Text>
    );
  } else
    return (
      <ContentLoader
        width={150}
        height={20}
        foregroundColor={theme!.graySecondary}
        backgroundColor={theme!.grayPrimary}
      >
        <Rect x="0" y="10" width="100%" height="10" rx="3" />
      </ContentLoader>
    );
};



const PercentComponent = ({ percent }: { percent: number | undefined }) => {
  const theme = useContext(ThemeContext);
  if (percent !== undefined) {
    return (
      <Text
        style={{
          ...FONTS.body4,
          color: theme!.graySecondary,
        }}
      >
        {`Đạt ${percent.toFixed(2)}% tổng số điểm`}
      </Text>
    );
  } else {
    return (
      <ContentLoader
        width={30}
        height={8}
        foregroundColor={theme!.graySecondary}
        backgroundColor={theme!.grayPrimary}
      >
        <Rect x="0" y="0" width="100%" height="100%" rx="3" />
      </ContentLoader>
    );
  }
  return null;
};

export default MarkItem;
